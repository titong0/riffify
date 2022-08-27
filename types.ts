import { DetailedHTMLProps, FormHTMLAttributes } from "react";

export type ArtistFromSearch = {
  name: string;
  id: string;
  thumbnails: Thumbnail[];
};

export type TodayRes = {
  song: SongDetails;
  allSongs: string[];
};

type SongDetails = {
  title: string;
  id: string;
  duration: string;
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
