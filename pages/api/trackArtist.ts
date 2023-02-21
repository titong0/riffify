import { NextApiRequest, NextApiResponse } from "next";
import { Artist, ArtistSchema } from "../../shared/schemas";

let trendingHeardles: Array<Artist & { played: number }> = [];
console.log("defined tredning heardles array");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).send("");

  const parsed = ArtistSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).send("Id invalid");

  pushToRecent(parsed.data);
  return res.send("Successfully tracked");
}

const pushToRecent = (artist: Artist) => {
  const heardle = trendingHeardles.find((heardle) => heardle.id === artist.id);
  if (!heardle) trendingHeardles.push({ ...artist, played: 1 });
  else heardle.played++;
  trendingHeardles = trendingHeardles.sort((a, b) => a.played - b.played);
};

export const getTrendingHeardles = () => {
  console.log(trendingHeardles);
  if (trendingHeardles.length === 0) return null;
  return trendingHeardles;
};
