import {
  PostgrestFilterBuilder,
  PostgrestSingleResponse,
} from "@supabase/postgrest-js";
import dayjs from "dayjs";
import { Attempt, GameState } from "./types";

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

export const getGameState = (attempts: Attempt[]): GameState => {
  if (!attempts.length) return "Playing";
  if (attempts[attempts.length - 1].type === "Success") return "Succeded";
  if (attempts.length === 5) return "Failed";
  return "Playing";
};

export const randomWithMax = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getDayDifference = (beforeDate: string, afterDate: Date) => {
  return dayjs(beforeDate).diff(afterDate, "days");
};

export const checkIntegrity = <T extends any>(
  postgreReq: PostgrestSingleResponse<T>,
  name: string
) => {
  if (postgreReq.error) {
    throw new Error(
      `Error happened at ${name}. Status ${postgreReq.status} ${
        postgreReq.statusText
      }: 
      ${JSON.stringify(postgreReq.error, null, 2)}`
    );
  }
  const timestamp = `[${new Date().toLocaleString()}.${new Date().getMilliseconds()}]`;

  console.log(`${timestamp} successfully executed ${name}`);
  return postgreReq;
};
