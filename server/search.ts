import { Innertube } from "youtubei.js";
import TextRun from "youtubei.js/dist/src/parser/classes/misc/TextRun";
import { YT_ArtistSearchSchema } from "../shared/libSchemas";
export const youtube = Innertube.create();

export const ArtistSearch = async (artistName: string) => {
  const client = await youtube;
  console.log({ artistName });
  const search = await client.music.search(artistName, {
    type: "artist",
  });

  if (!search.artists) return null;

  console.log("before data map");
  const data = search.artists.contents.map((channel) => {
    const parsed = YT_ArtistSearchSchema.parse(channel);
    return {
      name: parsed.name,
      id: parsed.id,
      thumbnail: parsed.thumbnails[0].url,
      suscribers: parsed.subscribers || "",
    };
  });
  return data;
};
