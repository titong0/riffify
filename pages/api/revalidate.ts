import { NextApiRequest, NextApiResponse } from "next";
import { readFirstInArray } from "../../utils";
const CronJob = require("node-cron").CronJob;

const VALIDATED_TODAY = new Set<string>();

new CronJob("0 0 * * * *", () => {
  VALIDATED_TODAY.clear();
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  const id = readFirstInArray(req.query.id);
  if (!id || id.length !== 11) {
    return res.status(401).json({ message: "Invalid id" });
  }

  try {
    if (VALIDATED_TODAY.has(id) === true) return;
    await res.revalidate(`/artist/${id}`);
    VALIDATED_TODAY.add(id);
    console.log("REVALIDATED: " + id);

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
