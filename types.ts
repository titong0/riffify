export type ArtistFromSearch = {
  name: string;
  id: string;
  thumbnails: Thumbnail[];
};

export type Artist = {
  name: string;
  avatar: Thumbnail[];
  description?: string;
  id: string;
};
export type TodayProps = {
  id: string;
  generatedAt: string;
} & TodayRes;

export type ReqError = {
  statusCode: number;
  error: string;
  message: string;
};

export type SongDetails = {
  title: string;
  id: string;
  duration: string;
  startAt: number;
  album: {
    name: string;
    url: string;
    thumbnails: Thumbnail[];
  };
};

export type GameState = "Playing" | "Failed" | "Succeded";

export type StateSetter<Type> = React.Dispatch<React.SetStateAction<Type>>;

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};
export type StorageStats = {};

export type Attempt = { content: string; type: "Skip" | "Success" | "Fail" };

export type StorageFails = {
  date: Date;
  tries: Attempt[];
};

export type ArtistStats = {
  daysFailed: number;
  daysSucceded: number;
  attemptsNeeded: number[];
  lastUpdated: Date;
};

export type TodayRes = {
  song: SongDetails;
  allSongs: string[];
  artist: Artist;
};
