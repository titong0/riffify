import Grid from "youtubei.js/dist/src/parser/classes/Grid";
import MusicCarouselShelf from "youtubei.js/dist/src/parser/classes/MusicCarouselShelf";
import MusicImmersiveHeader from "youtubei.js/dist/src/parser/classes/MusicImmersiveHeader";
import MusicShelf from "youtubei.js/dist/src/parser/classes/MusicShelf";
import MusicTwoRowItem from "youtubei.js/dist/src/parser/classes/MusicTwoRowItem";
import SectionList from "youtubei.js/dist/src/parser/classes/SectionList";
import SingleColumnBrowseResults from "youtubei.js/dist/src/parser/classes/SingleColumnBrowseResults";
import Tab from "youtubei.js/dist/src/parser/classes/Tab";
import { ObservedArray } from "youtubei.js/dist/src/parser/helpers";
import Artist from "youtubei.js/dist/src/parser/ytmusic/Artist";
import { z } from "zod";
import {
  YT_SongSchema,
  YT_AlbumSchema,
  Song,
  YT_ArtistHeaderSchema,
  TodaySongResponseSchema,
} from "../shared/schemas";
import { youtube } from "./search";
import { bigFilter, calculateStart, selectToday } from "./songChoosingUtils";

export const getToday = async (
  artistId: string,
  noLive: boolean
): Promise<z.infer<typeof TodaySongResponseSchema>> => {
  const client = await youtube;
  const artist = await client.music.getArtist(artistId);

  const allSongs = await getAllSongs(artist.sections);
  const { songs } = bigFilter(noLive, allSongs);

  const artistInfo = getArtistInfo(artist);

  const todayIdx = selectToday(songs.length, new Date());
  const todaySong = songs[todayIdx.today];

  const startTime = calculateStart(todaySong.duration);

  return {
    song: { startAt: startTime, ...todaySong },
    allSongs: songs.map((i) => i.title),
    artist: { id: artistId, ...artistInfo },
  };
};

const getAllSongs = async (
  sections: (MusicCarouselShelf | MusicShelf)[]
): Promise<Array<Song>> => {
  const { albums, singles } = removeUnnecesarySections(sections);

  const albumsFetch = getFullSection(albums).then((albums) => {
    if (!albums) return null;
    return Promise.all(albums.map((album) => getSongsFromAlbum(album)));
  });
  const singlesFetch = getFullSection(singles).then((singles) => {
    if (!singles) return null;
    return Promise.all(singles.map((single) => getSongsFromAlbum(single)));
  });

  const fullAlbumsAndSingles = await Promise.all([albumsFetch, singlesFetch]);
  const allSongs: Array<Song> = [];

  if (fullAlbumsAndSingles[0]) {
    allSongs.push(...fullAlbumsAndSingles[0].flat(1));
  }
  if (fullAlbumsAndSingles[1]) {
    allSongs.push(...fullAlbumsAndSingles[1].flat(1));
  }

  return allSongs;
};

const removeUnnecesarySections = (
  sections: (MusicCarouselShelf | MusicShelf)[]
) => {
  const albums = sections
    .find((section) => {
      if (section.is(MusicCarouselShelf))
        return section.header?.title.text === "Albums";
    })
    ?.as(MusicCarouselShelf);
  const singles = sections
    .find((section) => {
      if (section.is(MusicCarouselShelf))
        return section.header?.title.text === "Singles";
    })
    ?.as(MusicCarouselShelf);

  return { albums, singles };
};

const getFullSection = async (section: MusicCarouselShelf | undefined) => {
  if (!section) return null;
  const client = await youtube;
  const button = section.header?.more_content;
  if (!button) {
    if (section.contents[0] instanceof MusicTwoRowItem) {
      return section.contents as ObservedArray<MusicTwoRowItem>;
    }
    throw new Error("no button nor album.contents");
  }

  const page = await button.endpoint.call(client.actions, {
    parse: true,
    client: "YTMUSIC",
  });
  if (!page) throw new Error("No page");

  const single_col = page.contents.item().as(SingleColumnBrowseResults);
  const grid = single_col.tabs
    .firstOfType(Tab)
    ?.content?.as(SectionList)
    .contents.find((a) => a.is(Grid)) as Grid;

  if (!grid?.items) throw new Error("No grid for this section");
  const items = grid?.items.as(MusicTwoRowItem);
  return items;
};

const getSongsFromAlbum = async (
  sectionItem: MusicTwoRowItem
): Promise<Array<Song>> => {
  const client = await youtube;
  const albumRes = await client.music.getAlbum(
    sectionItem.endpoint.payload.browseId
  );

  return albumRes.contents.map((albumSong) => {
    const song = YT_SongSchema.parse(albumSong);
    const album = YT_AlbumSchema.parse(albumRes);
    return {
      title: song.title,
      id: song.id,
      duration: song.duration?.text,
      album: {
        name: album.header.title.text,
        url: album.url,
        thumbnails: album.header.thumbnails,
      },
    };
  });
};

const getArtistInfo = (artist: Artist) => {
  // console.log(artist.header?.as(MusicImmersiveHeader).title.);
  const parsed = YT_ArtistHeaderSchema.parse(artist.header);

  return {
    name: parsed.title.text,
    description: parsed.description.text,
    thumbnails: parsed.thumbnail.contents,
  };
};
