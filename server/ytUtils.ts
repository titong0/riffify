import { YTNodes } from "youtubei.js/agnostic";
import { ObservedArray } from "youtubei.js/dist/src/parser/helpers";
import {
  YT_SongSchema,
  YT_AlbumSchema,
  YT_ArtistHeaderSchema,
  YTArtist,
} from "../shared/libSchemas";
import { Song, Album, Artist } from "../shared/schemas";
import { youtube } from "./search";

export function exctractUniqueAlbums(songs: Song[]) {
  const albumIdsSet = new Set<string>();
  const albumSet = new Set<Album>();
  songs.forEach((song) => {
    const { album } = song;
    if (albumIdsSet.has(album.id)) return;
    albumIdsSet.add(album.id);
    albumSet.add(album);
  });
  return Array.from(albumSet);
}

export async function getAllSongs(
  sections: (YTNodes.MusicCarouselShelf | YTNodes.MusicShelf)[]
): Promise<Array<Song>> {
  const { albumsSection, singlesSection } = removeUnnecesarySections(sections);
  const albumsFetch = getFullSection(albumsSection).then((albums) => {
    if (!albums) return null;
    return Promise.all(albums.map((album) => getSongsFromAlbum(album)));
  });

  const singlesFetch = getFullSection(singlesSection).then((singles) => {
    if (!singles) return null;
    return Promise.all(singles.map((single) => getSongsFromAlbum(single)));
  });
  console.log("beforeawait");
  const [albums, singles] = await Promise.all([albumsFetch, singlesFetch]);
  const allSongs: Array<Song> = [];
  if (albums) {
    allSongs.push(...albums.flat(1));
  }
  if (singles) {
    allSongs.push(...singles.flat(1));
  }

  return allSongs;
}

function removeUnnecesarySections(
  sections: (YTNodes.MusicCarouselShelf | YTNodes.MusicShelf)[]
) {
  const albumsSection =
    sections
      .find((section) => {
        if (section.is(YTNodes.MusicCarouselShelf))
          return section.header?.title.text === "Albums";
      })
      ?.as(YTNodes.MusicCarouselShelf) || null;
  const singlesSection =
    sections
      .find((section) => {
        if (section.is(YTNodes.MusicCarouselShelf))
          return section.header?.title.text === "Singles";
      })
      ?.as(YTNodes.MusicCarouselShelf) || null;

  return { albumsSection, singlesSection };
}

async function getFullSection(section: YTNodes.MusicCarouselShelf | null) {
  if (!section) return null;

  const client = await youtube;
  const button = section.header?.more_content;
  if (!button) {
    if (section.contents[0].is(YTNodes.MusicTwoRowItem)) {
      return section.contents as ObservedArray<YTNodes.MusicTwoRowItem>;
    }
    throw new Error("no button nor album.contents");
  }

  const page = await button.endpoint.call(client.actions, {
    parse: true,
    client: "YTMUSIC",
  });

  if (!page.contents) throw new Error("No page.contents");
  const single_col = page.contents.item().as(YTNodes.SingleColumnBrowseResults);

  const grid = single_col.tabs
    .firstOfType(YTNodes.Tab)
    ?.content?.as(YTNodes.SectionList)
    .contents.find((a: any) => a.is(YTNodes.Grid)) as YTNodes.Grid;

  if (!grid?.items)
    throw new Error("No grid for this section", { cause: "no-grid" });
  const items = grid?.items.as(YTNodes.MusicTwoRowItem);
  return items;
}

async function getSongsFromAlbum(
  sectionItem: YTNodes.MusicTwoRowItem
): Promise<Array<Song>> {
  const albumId = sectionItem.endpoint.payload.browseId;
  const client = await youtube;
  const albumRes = await client.music.getAlbum(albumId);

  console.log(`beforealbumparse: ${albumId}`);
  const album = YT_AlbumSchema.parse(albumRes);
  return albumRes.contents
    .map((albumSong) => {
      const parsedSong = YT_SongSchema.safeParse(albumSong);
      if (!parsedSong.success) return undefined;
      const song = parsedSong.data;
      return {
        title: song.title,
        id: song.id,
        duration: song.duration?.text,
        album: {
          id: albumId,
          name: album.header.title.text,
          url: album.url,
          thumbnail: album.header.thumbnails[0].url,
        },
      };
    })
    .filter(Boolean) as Array<Song>;
}

export function getArtistInfo(artist: YTArtist) {
  const parsed = YT_ArtistHeaderSchema.parse(artist.header);

  return {
    name: parsed.title.text,
    description: parsed.description.text,
    thumbnail: parsed.thumbnail.contents[0].url,
  };
}
