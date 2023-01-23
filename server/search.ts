import { Innertube } from "youtubei.js";
import { YT_ArtistSearchSchema } from "../shared/schemas";
export const youtube = Innertube.create();

export const ArtistSearch = async (artistName: string) => {
  const client = await youtube;
  console.time(`artist search: ${artistName}`);

  const search = await client.music.search(artistName, {
    type: "artist",
  });

  console.time(`artist search: ${artistName}`);
  if (!search.results)
    throw new Error("No results for search of " + artistName);

  const data = search.results.map((channel) => {
    const parsed = YT_ArtistSearchSchema.parse(channel);
    return parsed;
  });
  return data;
};
