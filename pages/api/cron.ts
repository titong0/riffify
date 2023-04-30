import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { host } from "../../config";

async function callDeleteUpdatedPages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetch(
      `${host}/api/deleteUpdatedPages?key=${process.env.ADMIN_KEY}`
    );
    return res.json(await data.json());
  } catch (error) {
    res.status(500).json(error);
  }
}
export default callDeleteUpdatedPages;
