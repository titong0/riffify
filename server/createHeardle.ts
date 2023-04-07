import { youtube } from "./search";
import { randomIdsSequence } from "./songChoosingUtils";
import { bigFilter } from "./songDuplicationUtils";
import { supabase } from "./getTodaySong";
import { checkIntegrity } from "../utils";
import { exctractUniqueAlbums, getAllSongs, getArtistInfo } from "./ytUtils";

export async function createHeardle(artistId: string) {
  const client = await youtube;
  const artist = await client.music.getArtist(artistId);

  const allSongs = await getAllSongs(artist.sections);
  const { songs, removed } = bigFilter(true, allSongs);
  const artistInfo = getArtistInfo(artist);
  const idSequence = randomIdsSequence(songs.map((s) => s.id));
  await supabase
    .from("heardles")
    .insert({
      artist_id: artistId,
      ids_sequence: idSequence,
      valid_song_names: songs.map((i) => i.title),
    })
    .then((i) => checkIntegrity(i, `insert heardle ${artistId}`));

  const artistIns = supabase
    .from("artists")
    .insert({
      id: artistId,
      avatar_url: artistInfo.thumbnail,
      name: artistInfo.name,
      description: artistInfo.description,
    })
    .then((i) => checkIntegrity(i, `insert artist info ${artistInfo.name}`));

  const albumsIns = supabase
    .from("albums")
    .insert(
      exctractUniqueAlbums(songs).map((album) => {
        return {
          album_id: album.id,
          name: album.name,
          thumb_url: album.thumbnail,
          for_heardle: artistId,
        };
      }),
      { count: "exact" }
    )
    .then((i) => checkIntegrity(i, `insert albums`));

  const removedIns = supabase
    .from("removed_songs")
    .insert(
      removed.map((removedSong) => {
        return {
          reason: removedSong.reason,
          removed_from_heardle_id: artistId,
          song_id: removedSong.id,
          title: removedSong.title,
        };
      }),
      { count: "exact" }
    )
    .then((i) =>
      checkIntegrity(
        i,
        `insert removed_songs , count should be ${removed.length}`
      )
    );

  const songsIns = supabase
    .from("songs")
    .insert(
      songs.map((song) => {
        return {
          album_id: song.album.id,
          duration: song.duration,
          for_heardle: artistId,
          song_id: song.id,
          title: song.title,
        };
      }),
      { count: "exact" }
    )
    .then((i) =>
      checkIntegrity(i, `insert songs, count should be ${songs.length}`)
    );
  await Promise.all([artistIns, albumsIns, removedIns, songsIns]);
  const validation = await validateHeardle(artistId, idSequence);
  if (!validation.isValid) addMissingSongs(artistId, validation.missing);
  return;
}

async function validateHeardle(
  artistId: string,
  idSequence: string[]
): Promise<{ isValid: true } | { isValid: false; missing: string[] }> {
  const allSongs = await supabase
    .from("songs")
    .select("song_id")
    .eq("for_heardle", artistId)
    .then((i) => checkIntegrity(i, "req songs for heardle validation"));

  const missingIds = idSequence.filter(
    (id) => !allSongs.data.find((song) => song.song_id === id)
  );
  if (missingIds.length === 0) {
    console.log(`Successfully validated heardle for artist ${artistId}`);
    return { isValid: true };
  }
  console.error(
    `could not find ${missingIds.length} ids for artist ${artistId}`
  );
  return { isValid: false, missing: missingIds };
}

async function addMissingSongs(artistId: string, missingIds: string[]) {
  const artist = await youtube.then((y) => y.music.getArtist(artistId));
  const allSongs = await getAllSongs(artist.sections);
  const songsToAdd = allSongs.filter((song) =>
    missingIds.find((id) => song.id === id)
  );
  await supabase
    .from("songs")
    .insert(
      songsToAdd.map((song) => {
        return {
          album_id: song.album.id,
          duration: song.duration,
          for_heardle: artistId,
          song_id: song.id,
          title: song.title,
        };
      }),
      { count: "exact" }
    )
    .then((i) =>
      checkIntegrity(i, `insert songs, count should be ${songsToAdd.length}`)
    );
}
