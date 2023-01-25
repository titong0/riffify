import { Song } from "../shared/schemas";

export const selectToday = (length: number, today: Date) => {
  const startDate = new Date("1/1/2000");

  let todaysIdx = Math.abs(dayDiff(startDate, today));

  // have a different order once you run out of songs
  if (todaysIdx / length > 1) {
    todaysIdx = todaysIdx % length;
    todaysIdx = randomSecuence(length)[todaysIdx];
  }
  const allDays = randomSecuence(length);
  return { today: allDays[todaysIdx], fullSecuence: allDays };
};

const randomSecuence = (length: number) => {
  const nums = Array.from({ length: length }, (_, idx) => idx);
  let seed = length;
  let m = nums.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE
    t = nums[m];
    nums[m] = nums[i];
    nums[i] = t;
    ++seed; // <-- ADDED LINE
  }

  return nums;
};

const random = (seed: number) => {
  const x = Math.sin(seed++) * 100000;
  return x - Math.floor(x);
};
const dayDiff = (startDate: Date, secondDate: Date) => {
  const difference = startDate.getTime() - secondDate.getTime();
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
};
// duration is a string like
// 12:21 4:12 0:17 12:21:56
export const calculateStart = (duration: string) => {
  let secondsLong = 0;
  if (duration.length < 6) {
    const [minutes, seconds] = duration.split(":");
    secondsLong = parseInt(minutes) * 60 + parseInt(seconds);
  } else {
    const [hours, minutes, seconds] = duration.split(":");
    secondsLong = +hours * 60 * 60 + +minutes * 60 + +seconds;
  }
  const allowedRange = secondsLong - 16;
  if (allowedRange < 0) {
    return 0;
  }
  return Math.floor(random(secondsLong) * allowedRange);
};

export const removeKeywords = (songs: string[], noLive: boolean) => {
  if (!noLive) return { songs, removed: [] };
  const removedSongs: string[] = [];
  const REMOVE_KEYWORDS = [
    "live",
    "radio",
    "version",
    "en vivo",
    "vivo",
    "special",
    "instrumental",
  ];

  songs = songs.filter((song) => {
    const shouldRemove = REMOVE_KEYWORDS.find(
      (keyword) => song.toLowerCase().indexOf(keyword) !== -1
    );

    if (shouldRemove) {
      removedSongs.push(song);
      return false;
    }
    return true;
  });

  return { songs, removed: removedSongs };
};

/**
 * Remove songs which have the same text before a parenthesis
 * Example: among the following
 * - Waves (Extended version)
 * - waves
 * - WaVEs (Ft rihanna)
 * it will choose the one with the shortest title
 * */
const removeParenthesis = (songs: string[]) => {
  const uniqueNames: string[] = [];
  const removedSongs: string[] = [];

  for (let i = 0; i < songs.length; i++) {
    const currentSongTitle = songs[i].toLowerCase();
    const match = currentSongTitle.match(/\(([^()]*)\)/);
    if (!match?.[1]) continue;

    const beforeParenthesis = match?.[1];

    // find song with same text before parenthesis
    const matchIdx = uniqueNames.findIndex((song) => {
      return song.toLowerCase().startsWith(beforeParenthesis);
    });

    if (matchIdx === -1) {
      uniqueNames.push(currentSongTitle);
      continue;
    }

    // check if the song found is larger than the existing one
    if (uniqueNames[matchIdx].length > currentSongTitle.length) {
      removedSongs.push(uniqueNames[matchIdx]);
      uniqueNames[matchIdx] = currentSongTitle;
      continue;
    }
    removedSongs.push(currentSongTitle);
  }
  songs = songs.filter((song) => !uniqueNames.includes(song));
  return { songs, removed: removedSongs };
};
/**
 * remove songs with same name
 */
const removeSameName = (songs: string[]) => {
  const namesSet = new Set<string>();
  const removedSongs: string[] = [];

  songs = songs.filter((song) => {
    const name = song;
    if (!namesSet.has(name)) {
      namesSet.add(name);
      return true;
    }
    removedSongs.push(song);
    return false;
  });
  return { songs, removed: removedSongs };
};

export const bigFilter = (noLives: boolean, songs: Song[]) => {
  const names = songs.map((a) => a.title);
  const noDups = removeSameName(names);
  console.log(noDups);
  const noLive = removeKeywords(noDups.songs, noLives);
  const parenthesis = removeParenthesis(noLive.songs);
  const removed = [
    ...noDups.removed,
    ...noLive.removed,
    ...parenthesis.removed,
  ];

  const validSongs = songs.filter((song) =>
    parenthesis.songs.includes(song.title)
  );
  const removedSongs = songs.filter((song) => removed.includes(song.title));
  return { songs: validSongs, removed: removedSongs };
};
export {};
