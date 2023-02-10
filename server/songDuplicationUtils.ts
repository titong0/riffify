import { RemovedSong, Song } from "../shared/schemas";

type RemovableKeyword =
  | "(live"
  | " live"
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
  songs: Song[],
  noLive: boolean,
  keywordsToRemove?: RemovableKeyword[]
) => {
  if (!noLive) return { songs, removed: [] };
  const removedSongs: RemovedSong[] = [];
  const REMOVE_KEYWORDS = keywordsToRemove || [
    "(live",
    " live",
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
    const keywordFound = REMOVE_KEYWORDS.find(
      (keyword) => song.title.toLowerCase().indexOf(keyword) !== -1
    );

    if (keywordFound) {
      removedSongs.push({
        ...song,
        reason: `Included keyword: ${keywordFound} `,
      });
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
const removeParenthesis = (songs: Song[]) => {
  const shortestSongs: Song[] = [];
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
        reason: `Same text as ${currentSongTitle} before parenthesis`,
      });
      shortestSongs[matchIdx] = songs[i];
      continue;
    }
    // if the newly found song has a larger title, push to removed
    removedSongs.push({
      ...currentSong,
      reason: `Same text before parenthesis as ${currentSongTitle}`,
    });
  }

  return { songs, removed: removedSongs };
};

/**
 * remove songs with same name
 */
const removeSameName = (songs: Song[]) => {
  const namesSet = new Set<string>();
  const idsSet = new Set<string>();
  const removedSongs: RemovedSong[] = [];

  songs = songs.filter((song) => {
    const normalizedTitle = song.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (idsSet.has(song.id)) {
      removedSongs.push({
        ...song,
        reason: `Duplicated id with ${song.title}`,
      });
      return false;
    }
    if (namesSet.has(normalizedTitle)) {
      removedSongs.push({
        ...song,
        reason: `Duplicated name`,
      });
      return false;
    }
    console.log(normalizedTitle);
    idsSet.add(song.id);
    namesSet.add(normalizedTitle);
    return true;
  });
  return { songs, removed: removedSongs };
};

export const bigFilter = (noLives: boolean, songs: Song[]) => {
  const noDups = removeSameName(songs);
  const noLive = removeKeywords(noDups.songs, noLives);
  const parenthesis = removeParenthesis(noLive.songs);
  const removed = [
    ...noDups.removed,
    ...noLive.removed,
    ...parenthesis.removed,
  ];
  console.log(JSON.stringify(parenthesis, null, 2));

  return {
    songs: parenthesis.songs,
    removed: removed,
  };
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
