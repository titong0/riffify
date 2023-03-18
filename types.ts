export type GameState = "Playing" | "Failed" | "Succeded";

export type StateSetter<Type> = React.Dispatch<React.SetStateAction<Type>>;

export type Attempt = { content: string; type: "Skip" | "Success" | "Fail" };

export type StorageFails = {
  date: Date;
  tries: Attempt[];
};

export type ArtistStats = {
  daysFailed: number;
  daysSucceded: number;
  attemptsNeeded: [number, number, number, number, number];
  lastUpdated: Date;
};
