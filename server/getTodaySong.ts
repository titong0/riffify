import { createClient } from "@supabase/supabase-js";
import { db } from "../shared/libSchemas";
import { TodaySongResponse } from "../shared/schemas";
import {
  getDayDifference,
  checkIntegrity,
  invariant,
  assertInvariant,
} from "../utils";
import { createHeardle } from "./createHeardle";
import { calculateStart, shuffle } from "./songChoosingUtils";

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
  let daysSinceUpdated = getDayDifference(heardle.last_updated, new Date());
  // all songs from artist have been played.
  if (daysSinceUpdated > heardle.ids_sequence.length) {
    await supabase
      .from("heardles")
      .update({
        ids_sequence: shuffle(heardle.ids_sequence),
        last_updated: new Date().toISOString(),
      })
      .eq("artist_id", artistId)
      .then((i) => checkIntegrity(i, "update ids_sequence").data);
    daysSinceUpdated = 0;
  }

  const todaySongId = heardle.ids_sequence[daysSinceUpdated];
  const song = await supabase
    .from("songs")
    .select("*")
    .eq("song_id", todaySongId)
    .limit(1)
    .single()
    .then((i) => checkIntegrity(i, "select songs").data);
  assertInvariant(song, "no song matching todaySongId");

  const album = await supabase
    .from("albums")
    .select("*")
    .eq("album_id", song.album_id)
    .limit(1)
    .single()
    .then((i) => checkIntegrity(i, "select albums").data);
  assertInvariant(album, "no album matching song.album_id");

  const artist = await supabase
    .from("artists")
    .select("*")
    .eq("id", artistId)
    .limit(1)
    .single()
    .then((i) => checkIntegrity(i, "select artists").data);

  assertInvariant(artist, "no artist matching artistId");

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
