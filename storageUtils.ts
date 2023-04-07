import { SafeParseReturnType, z } from "zod";
import {
  Attempt,
  LocStorage_ArtistAttemptsSchema,
  LocStorage_ArtistStats,
  LocStorage_ArtistStatsSchema,
} from "./shared/schemas";
import { isToday } from "./utils";

const STORAGE = {
  attempts: {
    key: (id: string) => `attempts-${id}` as const,
    value: LocStorage_ArtistAttemptsSchema,
  },
  stats: {
    key: (id: string) => `stats-${id}` as const,
    value: LocStorage_ArtistStatsSchema,
  },
  favorites: {
    key: () => "favorite-heardles" as const,
    value: z.string().array(),
  },
};
type StorageType = typeof STORAGE;

const localGetItem = <
  TName extends keyof StorageType,
  Schema extends StorageType[TName]["value"]
>(
  storageItem: TName,
  key: ReturnType<StorageType[TName]["key"]>
) => {
  const schema = STORAGE[storageItem].value;
  const result = JSON.parse(localStorage.getItem(key) || "{}");
  const parse = schema.safeParse(result);
  return parse as SafeParseReturnType<any, z.infer<Schema>>;
};

const localSetItem = <TName extends keyof StorageType>(
  storageItem: TName,
  key: ReturnType<StorageType[TName]["key"]>,
  value: z.infer<StorageType[TName]["value"]>
) => {
  try {
    const parse = STORAGE[storageItem].value.safeParse(value);
    if (parse.success) {
      const stringified = JSON.stringify(value);
      localStorage.setItem(key, stringified);
    } else {
      console.error(
        `failed with parsing object to localStorage schema for ${storageItem}`
      );
    }
  } catch (error) {
    throw new Error(`Error parsing the following string to JSON: ${error}`);
  }
};

const readAttempts = (artistId: string) => {
  const storageName = STORAGE.attempts.key(artistId);
  const attempts = localGetItem("attempts", storageName);

  if (attempts.success) {
    return attempts.data;
  }

  return null;
};

const readStats = (artistId: string) => {
  const storageName = STORAGE.stats.key(artistId);
  const storedStats = localGetItem("stats", storageName);
  if (storedStats.success) {
    return storedStats.data;
  }
  return null;
};

export const getAttempts = (artistId: string) => {
  const storedTries = readAttempts(artistId);
  if (storedTries === null || !isToday(storedTries.date)) {
    return [];
  }
  return storedTries.attempts;
};

export const saveAttempts = (artistId: string, newAttemptArr: Attempt[]) => {
  const storedAttempts = readAttempts(artistId);
  const attemptsDate =
    storedAttempts && isToday(storedAttempts.date)
      ? storedAttempts.date
      : new Date().toISOString();

  const storageName = STORAGE.attempts.key(artistId);

  localSetItem("attempts", storageName, {
    date: attemptsDate,
    attempts: newAttemptArr,
  });

  return readAttempts(artistId);
};

export const getArtistStats = (artistId: string) => {
  const storageName = STORAGE.stats.key(artistId);
  const parsed = localGetItem("stats", storageName);
  if (parsed.success) {
    return parsed.data;
  }

  return null;
};

function writeStats(artistId: string, attemptCount: number) {
  type LengthFiveArr = [number, number, number, number, number];
  const hasWon = attemptCount < 5;
  const attemptsNeededArr = [0, 0, 0, 0, 0];
  attemptsNeededArr[attemptCount - 1] = 1;

  const newStatsObj = {
    attemptsNeeded: attemptsNeededArr as LengthFiveArr,
    daysFailed: hasWon ? 0 : 1,
    daysSucceded: hasWon ? 1 : 0,
    lastUpdated: new Date().toISOString(),
  };
  localSetItem("stats", STORAGE.stats.key(artistId), newStatsObj);
  return readStats(artistId)!;
}

/**
 *
 * @param attemptCount number of attempts used.
 * @returns
 */
export function updateStats(
  artistId: string,
  attemptCount: number,
  hasWon: boolean
) {
  const artistStats =
    getArtistStats(artistId) || writeStats(artistId, attemptCount);
  if (isToday(artistStats.lastUpdated))
    return console.error("duplicated call to updateStats");
  artistStats.attemptsNeeded[attemptCount - 1] += 1;
  hasWon ? (artistStats.daysSucceded += 1) : (artistStats.daysFailed += 1);
  localSetItem("stats", STORAGE.stats.key(artistId), artistStats);
  return getArtistStats(artistId);
}
