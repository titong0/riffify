import { z } from "zod";

export const ArtistSearchSchema = z.string().min(1);

const ThumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const id = z.string().length(24);

export const ArtistSearchResultSchema = z.object({
  name: z.string(),
  id: id,
  thumbnails: ThumbnailSchema.array(),
});
