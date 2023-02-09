import { Song } from "../shared/schemas";

type ShortSong = { title: string; id: string };
type RemovedSong = ShortSong & {
  reason:
    | "Included keyword"
    | "Duplicated name"
    | "Same text before parenthesis";
};

type RemovableKeyword =
  | "live"
  | "radio"
  | "version"
  | "en vivo"
  | "vivo"
  | "special"
  | "instrumental"
  | "beat"
  | "commentary"
  | "demo"
  | "remix";

/**
 *
 * @param songs all songs to be removed
 * @param noLive boolean that disables the function
 * @param keywordsToRemove array of keywords that will be added to the filter array
 * @returns
 */
const removeKeywords = (
  songs: ShortSong[],
  noLive: boolean,
  keywordsToRemove?: RemovableKeyword[]
) => {
  if (!noLive) return { songs, removed: [] };
  const removedSongs: RemovedSong[] = [];
  const REMOVE_KEYWORDS = keywordsToRemove || [
    "live",
    "radio",
    "version",
    "en vivo",
    "vivo",
    "special",
    "instrumental",
    "beat",
    "commentary",
    "demo",
    "sessions",
    "remix",
  ];

  songs = songs.filter((song) => {
    const shouldRemove = REMOVE_KEYWORDS.find(
      (keyword) => song.title.toLowerCase().indexOf(keyword) !== -1
    );

    if (shouldRemove) {
      removedSongs.push({ ...song, reason: "Included keyword" });
      return false;
    }
    return true;
  });

  return { songs, removed: removedSongs };
};

/**
 * Remove songs which have the same text before a parenthesis
 * Example: among the following
 * - White Ferrari 
 * - White
 * - white (thing)
 * - White (longthing)
 * only 'White Ferrari' and 'White' will stay

 * */
const removeParenthesis = (songs: ShortSong[]) => {
  const shortestSongs: ShortSong[] = [];
  const removedSongs: RemovedSong[] = [];

  let a = 0;
  for (let i = 0; i < songs.length; i++) {
    const currentSong = songs[i];
    const currentSongTitle = currentSong.title.toLowerCase();

    const beforeParenthesis = getBeforeParenthesis(currentSongTitle);
    if (!beforeParenthesis) {
      shortestSongs.push(currentSong);
      continue;
    }

    // find song with same start as 'beforeParenthesis'
    const matchIdx = shortestSongs.findIndex((searchedSong) => {
      const searchedSongTitle = searchedSong.title.toLowerCase();

      // totally different song
      if (!searchedSongTitle.startsWith(beforeParenthesis)) return false;

      // searchedSong is something like 'White' and current is 'White (blablah)'
      if (searchedSongTitle === beforeParenthesis) return false;
      // searchedSong is 'White ferrari' and current is white (blahblah)
      if (
        searchedSongTitle.startsWith(beforeParenthesis) &&
        searchedSongTitle.length > currentSongTitle.length
      ) {
        return false;
      }

      return true;
    });

    // didnt find any
    if (matchIdx === -1) {
      shortestSongs.push(songs[i]);
      continue;
    }
    const existingSong = shortestSongs[matchIdx];

    // check if the song found is shorter than the existing one
    if (existingSong.title.length > currentSongTitle.length) {
      removedSongs.push({
        ...existingSong,
        reason: "Same text before parenthesis",
      });
      shortestSongs[matchIdx] = songs[i];
      console.log(
        `REMOVED: ${existingSong.title} in favor of ${currentSong.title}`
      );
      continue;
    }
    // if the newly found song has a larger title, push to removed
    removedSongs.push({
      ...currentSong,
      reason: "Same text before parenthesis",
    });
  }

  return { songs, removed: removedSongs };
};

/**
 * remove songs with same name
 */
const removeSameName = (songs: ShortSong[]) => {
  const namesSet = new Set<string>();
  const removedSongs: RemovedSong[] = [];

  songs = songs.filter((song) => {
    const name = song.title;
    if (!namesSet.has(name)) {
      namesSet.add(name);
      return true;
    }
    removedSongs.push({ ...song, reason: "Duplicated name" });
    return false;
  });
  return { songs, removed: removedSongs };
};

export const bigFilter = (noLives: boolean, songs: Song[]) => {
  const nameAndIds = songs.map((song) => ({ title: song.title, id: song.id }));
  const noDups = removeSameName(nameAndIds);
  const noLive = removeKeywords(noDups.songs, noLives);
  const parenthesis = removeParenthesis(noLive.songs);
  const removed = [
    ...noDups.removed,
    ...noLive.removed,
    ...parenthesis.removed,
  ];
  console.log(JSON.stringify(removed, null, 2));
  // return { songs: validSongs, removed: removedSongs };
};

const getBeforeParenthesis = (text: string) => {
  const split = text.split("(");
  // if no parenthesis are found
  if (!split[1]) {
    return null;
  }
  const beforeParenthesis = split[0];
  return beforeParenthesis;
};
