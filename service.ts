import { api, password } from "./config";
import { ArtistFromSearch, ReqError, TodayRes } from "./types";

export const getArtistsQuery = async (artist: string) => {
  const params = new URLSearchParams({ query: artist });
  password && params.append("key", password);
  const req = await fetch(`${api}/search?${params}`);

  if (req.status === 400) return null;
  const results: ArtistFromSearch[] = await req.json();
  return results;
};

export const getTodaySong = async (artistId: string, noLive: boolean) => {
  const params = new URLSearchParams({ artistId: artistId });
  password && params.append("key", password);
  noLive && params.append("noLive", noLive);

  // params.append("date", `${date.getTime()}`);
  const req = await fetch(`${api}/today?${params}`);
  const data: TodayRes | ReqError = await req.json();
  return data;
};
