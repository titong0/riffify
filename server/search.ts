import { Innertube } from "youtubei.js";
import { ArtistSearchResultSchema } from "../shared/schemas";
export const youtube = Innertube.create();

export const ArtistSearch = async (artistName: string) => {
  const client = await youtube;
  console.time(`artist search: ${artistName}`);
  const search = await client.music.search(artistName, {
    type: "artist",
  });
  console.time(`artist search: ${artistName}`);

  const data = search.results?.map((channel) => ({
    name: channel.name,
    id: channel.id,
    thumbnails: channel.thumbnails,
  }));
  const parse = ArtistSearchResultSchema.array().safeParse(data);
  if (!parse.success) {
    console.error(parse.error);
    return parse.error.message;
  }
  return parse.data;
};
