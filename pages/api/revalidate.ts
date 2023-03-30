import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { supabase } from "../../server/getTodaySong";
import { ArtistIdSchema } from "../../shared/libSchemas";
import { checkIntegrity } from "../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  const parse = ArtistIdSchema.safeParse(req.query.id);
  if (!parse.success) {
    return res.status(401).json({ message: "Invalid id" });
  }
  const id = parse.data;
  const hasBeenUpdated = await getUpdatedToday(id);

  try {
    if (hasBeenUpdated.data) return res.json("No update needed");

    await res.revalidate(`/artist/${id}`);
    await addToUpdatedToday(id);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}

function addToUpdatedToday(artistId: string) {
  return supabase
    .from("updated_today")
    .insert({ id: artistId })
    .then((r) => checkIntegrity(r, `insert ${artistId} to updated_today`));
}
function getUpdatedToday(artistId: string) {
  return supabase
    .from("updated_today")
    .select("*")
    .eq("id", artistId)
    .then((r) => checkIntegrity(r, "Check if needs update"));
}
