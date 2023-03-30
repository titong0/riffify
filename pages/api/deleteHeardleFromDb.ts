import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../server/getTodaySong";
import { ArtistIdSchema } from "../../shared/libSchemas";
import { checkIntegrity } from "../../utils";

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const idParse = ArtistIdSchema.safeParse(req.query.id);
  const isKeyValid = req.query.key === process.env.ADMIN_KEY;
  if (!idParse.success) {
    return res.status(401).json({ message: "Invalid id" });
  }
  if (!isKeyValid) {
    return res.status(401).json({ message: "Invalid key" });
  }
  const id = idParse.data;

  try {
    await deleteHeardle(id);
    return res.json("success I think");
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete", error });
  }
}

export async function deleteHeardle(artistId: string) {
  const deletions = [
    supabase
      .from("songs")
      .delete()
      .eq("for_heardle", artistId)
      .then((r) => checkIntegrity(r, "Delete songs songs")),
    ,
    supabase
      .from("removed_songs")
      .delete()
      .eq("removed_from_heardle_id", artistId)
      .then((r) => checkIntegrity(r, "Delete removed songs")),
    supabase
      .from("artists")
      .delete()
      .eq("id", artistId)
      .then((r) => checkIntegrity(r, "Delete artists")),
    ,
    supabase
      .from("albums")
      .delete()
      .eq("for_heardle", artistId)
      .then((r) => checkIntegrity(r, "Delete albums")),
    ,
  ];
  await Promise.all(deletions);
  await supabase
    .from("heardles")
    .delete()
    .eq("artist_id", artistId)
    .then((r) => checkIntegrity(r, "Delete heardle"));
}

export default handleDelete;
