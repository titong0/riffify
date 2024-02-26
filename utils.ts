import dayjs from "dayjs";
import { Attempt } from "./shared/schemas";
import { GameState } from "./types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export const analyzeTry = (attempt: string, correct: string): Attempt => {
  if (attempt === "RESERVED-SKIP") {
    return {
      songName: "Skipped",
      type: "Skip",
    };
  }
  if (attempt === correct)
    return {
      songName: attempt,
      type: "Success",
    };
  return {
    songName: attempt,
    type: "Fail",
  };
};

export const isToday = (date1: Date | string) => {
  date1 = date1 instanceof Date ? date1 : new Date(date1);
  const today = new Date();
  return (
    date1.getFullYear() === today.getFullYear() &&
    date1.getMonth() === today.getMonth() &&
    date1.getDate() === today.getDate()
  );
};

export const getGameState = (attempts: Attempt[]): GameState => {
  if (attempts.find((a) => a.type === "Success")) return "Succeded";
  if (attempts.length === 5) return "Failed";
  return "Playing";
};

export const randomWithMax = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getDayDifference = (beforeDate: string, afterDate: Date) => {
  return dayjs(afterDate).diff(beforeDate, "days");
};

export const checkIntegrity = <T extends PostgrestSingleResponse<any>>(
  postgreReq: T,
  name: string
) => {
  if (postgreReq.error) {
    const err = new Error(
      `Error happened at ${name}. Status ${postgreReq.status} ${
        postgreReq.statusText
      }: ${JSON.stringify(postgreReq.error, null, 2)}`
    );
    throw err;
  }
  const timestamp = `[${new Date().toLocaleString()}.${new Date().getMilliseconds()}]`;

  console.log(`${timestamp} successfully executed ${name}`);

  return postgreReq;
};

export const invariant = <T extends unknown>(
  falsyValue: T,
  message: string
): NonNullable<T> => {
  if (!Boolean(falsyValue)) {
    throw new Error(`invariant failed: ${message}`);
  }
  // @ts-expect-error whatever man
  return falsyValue;
};

export function assertInvariant(
  falsyValue: any,
  message: string
): asserts falsyValue {
  if (!Boolean(falsyValue)) {
    throw new Error(`invariant failed: ${message}`);
  }
}
