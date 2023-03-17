import { Database } from "../supabase";

import { z } from "zod";
import Innertube from "youtubei.js/agnostic";

export const ArtistIdSchema = z.string().length(24);
const headerTitle = z.object({ text: z.string() });

const ThumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});
export const YT_SongSchema = z.object({
  title: z.string(),
  id: z.string(),
  duration: z.object({
    text: z.string(),
    seconds: z.number(),
  }),
});

export const YT_AlbumSchema = z.object({
  header: z.object({ title: headerTitle, thumbnails: ThumbnailSchema.array() }),
  url: z.string().url(),
  contents: YT_SongSchema.array(),
});

export const YT_ArtistSearchSchema = z.object({
  name: z.string(),
  id: ArtistIdSchema,
  thumbnails: ThumbnailSchema.array(),
});

export const YT_ArtistHeaderSchema = z.object({
  title: z.object({ text: z.string() }),
  description: z.object({ text: z.string() }),
  thumbnail: z.object({ contents: ThumbnailSchema.array() }),
});

export type SongResult = z.infer<typeof YT_SongSchema>;
export type AlbumResult = z.infer<typeof YT_AlbumSchema>;
export type YTArtist = Awaited<
  ReturnType<Awaited<ReturnType<typeof Innertube.create>>["music"]["getArtist"]>
>;
export type db = Database;
