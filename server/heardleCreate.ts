import { YTNodes } from "youtubei.js";
import {
  YT_AlbumSchema,
  YT_ArtistHeaderSchema,
  YT_SongSchema,
} from "../shared/libSchemas";
import { Album, Song } from "../shared/schemas";
import { youtube } from "./search";
import { randomIdsSequence } from "./songChoosingUtils";
import { bigFilter } from "./songDuplicationUtils";
import { supabase } from "./getTodaySong";
import { ObservedArray } from "youtubei.js/dist/src/parser/helpers";
import { Artist } from "youtubei.js/dist/src/parser/ytmusic";
import { throwOnError } from "../utils";

export async function createHeardle(artistId: string) {
  const client = await youtube;
  const artist = await client.music.getArtist(artistId);

  const allSongs = await getAllSongs(artist.sections);
  const { songs, removed } = bigFilter(true, allSongs);
  const artistInfo = getArtistInfo(artist);

  await supabase
    .from("Heardles")
    .insert({
      artist_id: artistId,
      ids_sequence: randomIdsSequence(songs.map((s) => s.id)),
      valid_song_names: songs.map((i) => i.title),
    })
    .throwOnError()
    .then((insertPromise) => {
      console.log(`inserted heardle for ${artistInfo.name}`);
      return insertPromise;
    });

  const albumsIns = Promise.all(
    exctractUniqueAlbums(songs).map((album) =>
      supabase
        .from("Albums")
        .insert({
          album_id: album.id,
          name: album.name,
          thumb_url: album.thumbnail,
        })
        .throwOnError()
    )
  ).then((insertPromise) => {
    console.log(`inserted albums for ${artistInfo.name}`);
    return insertPromise;
  });

  const removedIns = Promise.all(
    removed.map((removedSong) =>
      supabase
        .from("removed_songs")
        .insert({
          reason: removedSong.reason,
          removed_from_heardle_id: artistId,
          song_id: removedSong.id,
          title: removedSong.title,
        })
        .throwOnError()
    )
  ).then((insertPromise) => {
    console.log(`inserted removed songs for ${artistInfo.name}`);
    return insertPromise;
  });

  const artistIns = supabase
    .from("Artists")
    .insert({
      id: artistId,
      avatar_url: artistInfo.thumbnail,
      name: artistInfo.name,
      description: artistInfo.description,
    })
    .then((i) => throwOnError(i, `insert song ${artistInfo.name}`))
    .then((insertPromise) => {
      console.log(`inserted artist info for ${artistInfo.name}`);
      return insertPromise;
    });

  const songsIns = Promise.all(
    songs.map((song) =>
      supabase
        .from("Songs")
        .insert({
          album_id: song.album.id,
          duration: song.duration,
          for_heardle: artistId,
          song_id: song.id,
          title: song.title,
        })
        .then((i) => throwOnError(i, `insert song ${song.title}`))
    )
  ).then((insertPromise) => {
    console.log(`inserted songs for ${artistInfo.name}`);
    console.log(insertPromise);
    return insertPromise;
  });

  return Promise.all([artistIns, albumsIns, removedIns, songsIns]);
}

function exctractUniqueAlbums(songs: Song[]) {
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

const getAllSongs = async (
  sections: (YTNodes.MusicCarouselShelf | YTNodes.MusicShelf)[]
): Promise<Array<Song>> => {
  const { albumsSection, singlesSection } = removeUnnecesarySections(sections);

  const albumsFetch = getFullSection(albumsSection).then((albums) => {
    if (!albums) return null;
    return Promise.all(albums.map((album) => getSongsFromAlbum(album)));
  });

  const singlesFetch = getFullSection(singlesSection).then((singles) => {
    if (!singles) return null;
    return Promise.all(singles.map((single) => getSongsFromAlbum(single)));
  });

  const [albums, singles] = await Promise.all([albumsFetch, singlesFetch]);
  const allSongs: Array<Song> = [];
  if (albums) {
    allSongs.push(...albums.flat(1));
  }
  if (singles) {
    allSongs.push(...singles.flat(1));
  }

  return allSongs;
};

const removeUnnecesarySections = (
  sections: (YTNodes.MusicCarouselShelf | YTNodes.MusicShelf)[]
) => {
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
};

const getFullSection = async (section: YTNodes.MusicCarouselShelf | null) => {
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
};

const getSongsFromAlbum = async (
  sectionItem: YTNodes.MusicTwoRowItem
): Promise<Array<Song>> => {
  const albumId = sectionItem.endpoint.payload.browseId;
  const client = await youtube;
  const albumRes = await client.music.getAlbum(albumId);

  return albumRes.contents.map((albumSong) => {
    const song = YT_SongSchema.parse(albumSong);
    const album = YT_AlbumSchema.parse(albumRes);

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
  });
};

const getArtistInfo = (artist: Artist) => {
  const parsed = YT_ArtistHeaderSchema.parse(artist.header);

  return {
    name: parsed.title.text,
    description: parsed.description.text,
    thumbnail: parsed.thumbnail.contents[0].url,
  };
};
