import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../server/getTodaySong";
import { ArtistIdSchema } from "../../shared/libSchemas";
import { checkIntegrity } from "../../utils";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parse = z.string().safeParse(req.query.key);
  if (!parse.success || parse.data !== process.env.ADMIN_KEY) {
    return res.json("Key is not valid");
  }

  try {
    await deleteAllUpdatedToday();
    return res.status(200).json("Successfully deleted from updated_today");
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error deleting updated_today:", error: err });
  }
}

function deleteAllUpdatedToday() {
  return supabase
    .from("updated_today")
    .delete()
    .then((r) => checkIntegrity(r, `delete all from updated_today`));
}
