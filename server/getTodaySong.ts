import { createClient } from "@supabase/supabase-js";
import { db } from "../shared/libSchemas";
import { TodaySongResponse } from "../shared/schemas";
import { getDayDifference, throwOnError } from "../utils";
import { createHeardle } from "./heardleCreate";
import { calculateStart } from "./songChoosingUtils";

const SUPABASE_URL = "https://rlylcdzqewutdtnmgmnu.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "";
export const supabase = createClient<db>(SUPABASE_URL, supabaseKey);

export const getToday = async (
  artistId: string,
  noLive: boolean
): Promise<TodaySongResponse> => {
  const dbHeardle = await getHeardleFromDb(artistId);
  if (dbHeardle !== null) {
    console.log(`used existing heardle for artist ${dbHeardle.artist.name}`);
    return dbHeardle;
  }
  await createHeardle(artistId);
  const secondTry = await getHeardleFromDb(artistId);
  if (secondTry === null)
    throw new Error("created heardle but still couldnt use newly created one");
  return secondTry;
};

async function getHeardleFromDb(
  artistId: string
): Promise<TodaySongResponse | null> {
  const res = await supabase
    .from("Heardles")
    .select("*")
    .eq("artist_id", artistId)
    .limit(1)
    .single();
  if (!res.data) return null;
  const heardle = res.data;
  const todayIndex = getDayDifference(heardle.created_at, new Date());
  const todaySongId = heardle.ids_sequence[todayIndex];
  const song = await supabase
    .from("Songs")
    .select("*")
    .eq("song_id", todaySongId)
    .limit(1)
    .single()
    .then((i) => throwOnError(i, "songs"));

  const album = await supabase
    .from("Albums")
    .select("*")
    .eq("album_id", song?.album_id)
    .limit(1)
    .single()
    .then((i) => throwOnError(i, "albums"));
  const artistRes = supabase
    .from("Artists")
    .select("*")
    .eq("id", artistId)
    .limit(1)
    .single()
    .then((i) => throwOnError(i, "artists"));
  const removedRes = supabase
    .from("removed_songs")
    .select("*")
    .eq("removed_from_heardle_id", artistId)
    .then((i) => throwOnError(i, "removed_songs"));

  const [artist, removed] = await Promise.all([artistRes, removedRes]);

  const startTime = calculateStart(song.duration);

  return {
    song: {
      title: song.title,
      id: song.song_id,
      duration: song.duration,
      startAt: startTime,
      album: {
        id: album.album_id,
        name: album.name,
        thumbnail: album.thumb_url,
      },
    },
    validSongs: heardle.valid_song_names,
    artist: {
      id: artistId,
      description: artist.description,
      name: artist.name,
      thumbnail: artist.avatar_url,
    },
    removed: removed.map((removedS) => ({
      id: removedS.song_id,
      reason: removedS.reason,
      title: removedS.title,
    })),
  };
}
