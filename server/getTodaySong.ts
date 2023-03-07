import { createClient } from "@supabase/supabase-js";
import Grid from "youtubei.js/dist/src/parser/classes/Grid";
import MusicCarouselShelf from "youtubei.js/dist/src/parser/classes/MusicCarouselShelf";
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
import { calculateStart, selectToday } from "./songChoosingUtils";
import { bigFilter } from "./songDuplicationUtils";

const SUPABASE_URL = "https://rlylcdzqewutdtnmgmnu.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient(SUPABASE_URL, supabaseKey);
export const getToday = async (
  artistId: string,
  noLive: boolean
): Promise<z.infer<typeof TodaySongResponseSchema>> => {
  const client = await youtube;
  const artist = await client.music.getArtist(artistId);

  const allSongs = await getAllSongs(artist.sections);
  const { songs, removed } = bigFilter(noLive, allSongs);
  // el punto es q el codigo tiene q hacer lo siguiente para q stremeeo el navegador ahora
  const artistInfo = getArtistInfo(artist);

  const todayIdx = selectToday(songs.length, new Date());
  const todaySong = songs[todayIdx.today];

  const startTime = calculateStart(todaySong.duration);

  return {
    song: { startAt: startTime, ...todaySong },
    removed,
    allSongs: songs.map((i) => i.title),
    artist: { id: artistId, ...artistInfo },
  };
};

const getAllSongs = async (
  sections: (MusicCarouselShelf | MusicShelf)[]
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
    allSongs.push(...albums[0].flat(1));
  }
  if (singles) {
    allSongs.push(...singles[1].flat(1));
  }

  return allSongs;
};

const removeUnnecesarySections = (
  sections: (MusicCarouselShelf | MusicShelf)[]
) => {
  const albumsSection = sections
    .find((section) => {
      if (section.is(MusicCarouselShelf))
        return section.header?.title.text === "Albums";
    })
    ?.as(MusicCarouselShelf);
  const singlesSection = sections
    .find((section) => {
      if (section.is(MusicCarouselShelf))
        return section.header?.title.text === "Singles";
    })
    ?.as(MusicCarouselShelf);

  return { albumsSection, singlesSection };
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
  const id = sectionItem.endpoint.payload.browseId;
  const client = await youtube;
  const albumRes = await client.music.getAlbum(id);
  return albumRes.contents.map((albumSong) => {
    const song = YT_SongSchema.parse(albumSong);
    const album = YT_AlbumSchema.parse(albumRes);
    return {
      title: song.title,
      id: song.id,
      duration: song.duration?.text,
      album: {
        id: id,
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
