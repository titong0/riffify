export const api = process.env.API || "http://localhost:4000";
export const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://riffify.vercel.app";
export const password = process.env.PASSWORD || null;
