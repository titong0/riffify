import { z } from "zod";

export const ArtistSearchSchema = z.string().min(1);

const ThumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

export const idSchema = z.string().length(24);

export const ArtistSearchResultSchema = z.object({
  name: z.string(),
  id: idSchema,
  thumbnails: ThumbnailSchema.array(),
});
