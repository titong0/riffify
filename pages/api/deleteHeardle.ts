import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { deleteHeardle } from "../../server/createHeardle";
import { ArtistIdSchema } from "../../shared/libSchemas";

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const parse = ArtistIdSchema.safeParse(req.query.id);
  if (!parse.success) {
    return res.status(401).json({ message: "Invalid id" });
  }
  const id = parse.data;

  try {
    await deleteHeardle(id);
    return res.json("success I think");
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete", error });
  }
}

export default handleDelete;
