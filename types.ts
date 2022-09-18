export type ArtistFromSearch = {
  name: string;
  id: string;
  thumbnails: Thumbnail[];
};

export type TodayRes = {
  song: SongDetails;
  allSongs: string[];
  artist: {
    name: string;
    avatar: Thumbnail[];
    description?: string;
    id: string;
  };
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

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

interface SongNameElements extends HTMLFormControlsCollection {
  yourInputName: HTMLInputElement;
}

export interface SongNameForm extends HTMLFormElement {
  readonly elements: SongNameElements;
}
