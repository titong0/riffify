import { ArtistStats, Attempt, StorageFails } from "./types";
import { isToday } from "./utils";

const readTries = (artistId: string) => {
  const storageName = `tries-${artistId}`;
  const storedFails: StorageFails | null = JSON.parse(
    localStorage.getItem(storageName) || "null"
  );
  return storedFails;
};

export const getAttempts = (artistId: string) => {
  const tries = readTries(artistId);

  // if the "tries" object is not in localStorage OR if the object is old
  if (tries === null || !isToday(new Date(tries.date))) {
    return [];
  }
  return tries.tries;
};

export const saveTries = (artistId: string, newTryArray: Attempt[]) => {
  const tries = readTries(artistId);

  if (tries === null || !isToday(new Date(tries.date))) {
    localStorage.setItem(
      `tries-${artistId}`,
      JSON.stringify({ date: new Date(), tries: newTryArray })
    );
    return;
  }

  const newTryObj = {
    date: tries.date,
    tries: newTryArray,
  };
  localStorage.setItem(`tries-${artistId}`, JSON.stringify(newTryObj));
};

const readArtistStats = (artistId: string) => {
  const storageName = `stats-${artistId}`;
  const stats: ArtistStats | null = JSON.parse(
    localStorage.getItem(storageName) || "null"
  );
  return stats;
};
export const getArtistStats = (artistId: string) => {
  const storageName = `stats-${artistId}`;
  const stats: ArtistStats = JSON.parse(
    localStorage.getItem(storageName) || "null"
  );
  return stats;
};

export const writeStats = (
  artistId: string,
  hasWon: boolean,
  failCount: number
) => {
  failCount = hasWon ? failCount : 5;
  const artistStats = readArtistStats(artistId);

  if (artistStats === null) {
    const attemptsNeededArr = [0, 0, 0, 0, 0];
    attemptsNeededArr[failCount] = 1;
    const newStatsObj = {
      attemptsNeeded: attemptsNeededArr,
      daysFailed: hasWon ? 0 : 1,
      daysSucceded: hasWon ? 1 : 0,
      lastUpdated: new Date(),
    };
    localStorage.setItem(`stats-${artistId}`, JSON.stringify(newStatsObj));
    console.log("SAVED STATS, CREATED BRAND NEW");
  } else {
    if (isToday(new Date(artistStats.lastUpdated))) return;

    artistStats.attemptsNeeded[failCount] += 1;
    hasWon ? (artistStats.daysSucceded += 1) : (artistStats.daysFailed += 1);
    localStorage.setItem(`stats-${artistId}`, JSON.stringify(artistStats));
    console.log("SAVED STATS, UPDATED PREVIOUS");
  }
};
