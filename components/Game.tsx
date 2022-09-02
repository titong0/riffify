import dynamic from "next/dynamic";
import React, { Suspense, useRef, useState } from "react";
import { TodayRes } from "../types";
import FailsDisplay from "./FailsDisplay";
import GameForm from "./GameForm";
import Player from "./Player";
import ProgressBar from "./ProgressBar";

const Game = ({ song, allSongs }: TodayRes) => {
  const [fails, setFails] = useState<string[]>([]);
  fails.length === 5 && alert("PERDISTE. PEREJIL");
  return (
    <div className="flex w-full justify-center mt-12 p-2">
      <div className="w-full max-w-lg h-auto bg-gray-200 text-black rounded-md">
        <FailsDisplay fails={fails} />
        <div className="flex w-full items-center p-1">
          <ProgressBar fails={fails.length} />
          <Player
            startsAt={song.startAt}
            name={song.title}
            secondsLimit={Math.pow(2, fails.length + 1)}
            id={song.id}
          />
        </div>
        <GameForm
          fails={fails}
          setFails={setFails}
          correctSong={song.title}
          allSongs={allSongs}
        />
      </div>
    </div>
  );
};

export default Game;
