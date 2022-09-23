import React, { Suspense, useEffect, useRef, useState } from "react";
import { SongDetails } from "../types";
import { getFails } from "../utils";
import FailsDisplay from "./FailsDisplay";
import GameForm from "./GameForm";
import Player from "./Player";

type GameProps = {
  song: SongDetails;
  allSongs: string[];
  artistId: string;
};

const Game = ({ song, allSongs, artistId }: GameProps) => {
  const [fails, setFails] = useState<string[]>([]);
  useEffect(() => {
    setFails(getFails(artistId));
  }, []);

  return (
    <div className="flex w-full justify-center p-2 mb-8">
      <div className="w-full max-w-lg bg-gray-200 text-black rounded-md shadow-xl">
        <FailsDisplay fails={fails} />
        <section className="py-4">
          <Player
            startsAt={song.startAt}
            name={song.title}
            secondsLimit={Math.pow(2, fails.length + 1)}
            id={song.id}
            fails={fails}
          />
          <GameForm
            fails={fails}
            setFails={setFails}
            correctSong={song.title}
            artistId={artistId}
            allSongs={allSongs}
          />
        </section>
      </div>
    </div>
  );
};

export default Game;
