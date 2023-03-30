import { host } from "../../config";
async function callDeleteUpdatedPages() {
  const res = await fetch(
    `${host}/api/deleteUpdatedPages?key=${process.env.ADMIN_KEY}`
  );
  return res.json();
}
export default callDeleteUpdatedPages;
