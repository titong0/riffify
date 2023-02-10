import { string, z } from "zod";

export const ArtistIdSchema = z.string().length(24);
export const SearchQuerySchema = z.string().min(1);
const headerTitle = z.object({ text: z.string() });

const ThumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const AlbumShortSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  thumbnails: ThumbnailSchema.array(),
});

export const ArtistSchema = z.object({
  name: z.string(),
  id: ArtistIdSchema,
  description: z.string(),
  thumbnails: ThumbnailSchema.array(),
});

export const SongSchema = z.object({
  title: z.string(),
  id: z.string(),
  duration: string(),
  album: AlbumShortSchema,
});
const RemovedSongSchema = z.object({
  title: z.string(),
  id: z.string(),
  reason: z.string(),
});
const Game_SongSchema = z.object({ startAt: z.number() }).and(SongSchema);

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

export const TodaySongResponseSchema = z.object({
  artist: ArtistSchema,
  song: Game_SongSchema,
  removed: RemovedSongSchema.array(),
  allSongs: z.string().array(),
});
export const Page_GamePropsSchema = TodaySongResponseSchema.and(
  z.object({
    generatedAt: z.string(),
  })
);

export type RemovedSong = z.infer<typeof RemovedSongSchema>;
export type Page_ArtistGameProps = z.infer<typeof Page_GamePropsSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type Song = z.infer<typeof SongSchema>;
export type Game_Song = z.infer<typeof Game_SongSchema>;
export type SongResult = z.infer<typeof YT_SongSchema>;
export type AlbumResult = z.infer<typeof YT_AlbumSchema>;
