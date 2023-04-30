import { createClient } from "@supabase/supabase-js";
import { db } from "../shared/libSchemas";
import { TodaySongResponse } from "../shared/schemas";
import { getDayDifference, checkIntegrity } from "../utils";
import { createHeardle } from "./createHeardle";
import { calculateStart, randomIdsSequence } from "./songChoosingUtils";

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
    .from("heardles")
    .select("*")
    .eq("artist_id", artistId)
    .limit(1)
    .single();
  if (!res.data) return null;

  const heardle = res.data;
  const idSequence = heardle.ids_sequence;
  const daysSinceCreation = getDayDifference(heardle.created_at, new Date());
  let todaySongId = heardle.ids_sequence[daysSinceCreation];
  if (!todaySongId) {
    const iteration = Math.floor(daysSinceCreation / idSequence.length);
    const ids = randomIdsSequence(idSequence, iteration);
    const newIdx = daysSinceCreation % idSequence.length;
    todaySongId = ids[newIdx];
  }
  const song = await supabase
    .from("songs")
    .select("*")
    .eq("song_id", todaySongId)
    .limit(1)
    .single()
    .then((i) => checkIntegrity(i, "songs").data);
  const album = await supabase
    .from("albums")
    .select("*")
    .eq("album_id", song?.album_id)
    .limit(1)
    .single()
    .then((i) => checkIntegrity(i, "albums").data);
  const artistRes = supabase
    .from("artists")
    .select("*")
    .eq("id", artistId)
    .limit(1)
    .single()
    .then((i) => checkIntegrity(i, "artists").data);

  const artist = await artistRes;

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
  };
}
