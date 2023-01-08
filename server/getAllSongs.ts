import Grid from "youtubei.js/dist/src/parser/classes/Grid";
import MusicCarouselShelf from "youtubei.js/dist/src/parser/classes/MusicCarouselShelf";
import MusicShelf from "youtubei.js/dist/src/parser/classes/MusicShelf";
import MusicTwoRowItem from "youtubei.js/dist/src/parser/classes/MusicTwoRowItem";
import SectionList from "youtubei.js/dist/src/parser/classes/SectionList";
import SingleColumnBrowseResults from "youtubei.js/dist/src/parser/classes/SingleColumnBrowseResults";
import Tab from "youtubei.js/dist/src/parser/classes/Tab";
import { ObservedArray } from "youtubei.js/dist/src/parser/helpers";
import { youtube } from "./search";

export const getAllSongs = async (channelId: string) => {
  const client = await youtube;
  const artist = await client.music.getArtist(channelId);
  const AlbumsAndSingles = removeUnnecesarySections(artist.sections);
  try {
    const a = await getFullSection(AlbumsAndSingles[0]);
  } catch (error) {
    console.error(error);
  }
  //   console.log(a);
};

const removeUnnecesarySections = (
  sections: (MusicCarouselShelf | MusicShelf)[]
) => {
  const relevant: Array<MusicCarouselShelf> = [];

  for (const section of sections) {
    if (!section.is(MusicCarouselShelf)) continue;

    const sectionTitle = section.header?.title.text;
    if (sectionTitle === "Albums" || sectionTitle === "Singles") {
      relevant.push(section);
    }
  }
  return relevant;
};

const getFullSection = async (section: MusicCarouselShelf) => {
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

  if (!grid?.items) throw new Error();
  const items = grid?.items.as(MusicTwoRowItem);
  //   return items;
};
