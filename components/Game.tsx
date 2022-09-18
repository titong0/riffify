import React, { Suspense, useRef, useState } from "react";
import { SongDetails } from "../types";
import FailsDisplay from "./FailsDisplay";
import GameForm from "./GameForm";
import Player from "./Player";

const Game = ({
  song,
  allSongs,
}: {
  song: SongDetails;
  allSongs: string[];
}) => {
  const [fails, setFails] = useState<string[]>([]);

  return (
    <div className="flex w-full justify-center p-2">
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
            allSongs={allSongs}
          />
        </section>
      </div>
    </div>
  );
};

export default Game;
