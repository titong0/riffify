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
  console.log({ hasBeenUpdated });
  try {
    if (hasBeenUpdated.data.length) return res.json("No update needed");

    await res.revalidate(`/artist/${id}`).then((i) => console.log("first"));
    await addToUpdatedToday(id);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}

/**
 *
 * after generating the page for a heardle or revalidating its route
 * it must be added to the DB in order to prevent unnecessary revalidating
 * which could be caused by manual navigations to /api/revalidate
 */
export function addToUpdatedToday(artistId: string) {
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
