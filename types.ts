export type ArtistFromSearch = {
  name: string;
  id: string;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
};
