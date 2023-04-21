import { string, z } from "zod";
import { ArtistSearch } from "../server/search";
import { ArtistIdSchema } from "./libSchemas";

const AlbumSchema = z.object({
  name: z.string(),
  id: z.string(),
  thumbnail: z.string(),
});

export const ArtistSchema = z.object({
  name: z.string(),
  id: ArtistIdSchema,
  description: z.string(),
  thumbnail: z.string(),
});

export const SongSchema = z.object({
  title: z.string(),
  id: z.string(),
  duration: string(),
  album: AlbumSchema,
});
const RemovedSongSchema = z.object({
  title: z.string(),
  id: z.string(),
  reason: z.string(),
});
const Game_SongSchema = z.object({ startAt: z.number() }).and(SongSchema);

export const TodaySongResponseSchema = z.object({
  artist: ArtistSchema,
  song: Game_SongSchema,
  removed: RemovedSongSchema.array(),
  validSongs: z.string().array(),
});
export const Page_GamePropsSchema = TodaySongResponseSchema.and(
  z.object({
    generatedAt: z.string(),
  })
);

const AttemptSchema = z.object({
  songName: z.string().min(0),
  type: z.union([z.literal("Success"), z.literal("Fail"), z.literal("Skip")]),
});

const ArtistStatsSchema = z.object({
  daysFailed: z.number(),
  daysSucceded: z.number(),
  attemptsNeeded: z.tuple([
    z.number(),
    z.number(),
    z.number(),
    z.number(),
    z.number(),
  ]),
});

export const LocStorage_ArtistAttemptsSchema = z.object({
  attempts: AttemptSchema.array(),
  date: z.string().datetime(),
});

export const LocStorage_ArtistStatsSchema = ArtistStatsSchema.and(
  z.object({
    lastUpdated: z.string().datetime(),
  })
);

export type LocStorage_ArtistAttempts = z.infer<
  typeof LocStorage_ArtistAttemptsSchema
>;
export type LocStorage_ArtistStats = z.infer<
  typeof LocStorage_ArtistStatsSchema
>;
export type ArtistStats = z.infer<typeof ArtistStatsSchema>;

export type Attempt = z.infer<typeof AttemptSchema>;
export type RemovedSong = z.infer<typeof RemovedSongSchema>;
export type Page_ArtistGameProps = z.infer<typeof Page_GamePropsSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type Song = z.infer<typeof SongSchema>;
export type Album = z.infer<typeof AlbumSchema>;
export type Game_Song = z.infer<typeof Game_SongSchema>;
export type TodaySongResponse = z.infer<typeof TodaySongResponseSchema>;
export type ArtistSearchReturn = Awaited<ReturnType<typeof ArtistSearch>>;
export type SearchResults = NonNullable<ArtistSearchReturn>;
