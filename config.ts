export const api = process.env.API || "http://localhost:4000";
export const host =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "https://auto-heardle-frontend.vercel.app";
export const password = process.env.PASSWORD || null;
