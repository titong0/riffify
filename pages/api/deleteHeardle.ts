import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { deleteHeardle } from "../../server/createHeardle";
import { ArtistIdSchema } from "../../shared/libSchemas";

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const idParse = ArtistIdSchema.safeParse(req.query.id);
  const isKeyValid = req.query.key === process.env.DELETE_HEARDLE_KEY;
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

export default handleDelete;
