import { StorageFails } from "./types";

/**
 * This function prevents the site from crushing if someone does something like
 * something/something?param=4&param=9, as it would be of type array instead of a string
 */
export const readFirstInArray = (param: string | string[] | undefined) => {
  return Array.isArray(param) ? param[0] : param;
};

export const isToday = (date1: Date) => {
  const today = new Date();
  return (
    date1.getFullYear() === today.getFullYear() &&
    date1.getMonth() === today.getMonth() &&
    date1.getDate() === today.getDate()
  );
};

const readFiles = (artistId: string) => {
  const storageName = `fails-${artistId}`;
  const storedFails: StorageFails | null = JSON.parse(
    localStorage.getItem(storageName) || "null"
  );
  return storedFails;
};

export const getFails = (artistId: string) => {
  const fails = readFiles(artistId);

  // if the "fails" object is not in localStorage OR if the object is old
  if (fails === null || !isToday(new Date(fails.date))) {
    return [];
  }

  return fails.fails;
};

export const saveFails = (artistId: string, newFailArray: string[]) => {
  const fails = readFiles(artistId);

  if (fails === null || !isToday(new Date(fails.date))) {
    localStorage.setItem(
      `fails-${artistId}`,
      JSON.stringify({ date: new Date(), fails: newFailArray })
    );
    return;
  }

  const newFailObj = {
    date: fails.date,
    fails: newFailArray,
  };
  localStorage.setItem(`fails-${artistId}`, JSON.stringify(newFailObj));
};
