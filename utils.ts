import { Attempt, GameState } from "./types";

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

export const getGameState = (attempts: Attempt[]): GameState => {
  if (!attempts.length) return "Playing";
  if (attempts[attempts.length - 1].type === "Success") return "Succeded";
  if (attempts.length === 5) return "Failed";
  return "Playing";
};
