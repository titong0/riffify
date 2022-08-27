import { api, password } from "./config";
import { ArtistFromSearch } from "./types";

export const getArtistsQuery = async (artist: string) => {
  const params = new URLSearchParams({ query: artist });
  password && params.append("key", password);
  console.log("ABOUT TO FETCH TO");
  console.log(`${api}/search?${params}`);
  const data = await fetch(`${api}/search?${params}`);

  if (data.status === 400) return null;
  const results: ArtistFromSearch[] = await data.json();
  return results;
};
