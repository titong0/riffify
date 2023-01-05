import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Innertube } from "youtubei.js";
import { ClientType } from "youtubei.js/dist/src/core/Session";
const youtube = Innertube.create();

const search: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const client = await youtube;
  if (!req.query.searchQuery) return;
  const artistName = Array.isArray(req.query.searchQuery)
    ? req.query.searchQuery[0]
    : req.query.searchQuery;

  console.log(`received ${artistName}, fetching... `);
  console.time("search");

  const result = await client.music.search(artistName, {
    type: "artist",
  });
  console.timeEnd("search");

  const data = result.results?.map((i) => i.name);
  console.log(data);
  return res.send(data);
};

export default search;
