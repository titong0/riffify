import { StorageFails, Attempt } from "./types";

/**
 * This function prevents the site from crushing if someone does something like
 * something/something?param=4&param=9, as it would be of type array instead of a string
 */
export const readFirstInArray = (param: string | string[] | undefined) => {
  return Array.isArray(param) ? param[0] : param;
};

export const analyzeTry = (attempt: string, correct: string): Attempt => {
  if (attempt === "RESERVED-SKIP") {
    return {
      content: "Skipped",
      type: "Skip",
    };
  }
  if (attempt === correct)
    return {
      content: attempt,
      type: "Success",
    };
  return {
    content: attempt,
    type: "Fail",
  };
};

export const isToday = (date1: Date) => {
  const today = new Date();
  return (
    date1.getFullYear() === today.getFullYear() &&
    date1.getMonth() === today.getMonth() &&
    date1.getDate() === today.getDate()
  );
};

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
