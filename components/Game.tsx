import dynamic from "next/dynamic";
import React, { Suspense, useRef, useState } from "react";
import { TodayRes } from "../types";
import FailsDisplay from "./FailsDisplay";
import GameForm from "./GameForm";
import Player from "./Player";

const Game = ({ song, allSongs }: TodayRes) => {
  const [fails, setFails] = useState(0);
  return (
    <div className="flex w-full justify-center mt-12 p-2">
      <div className="w-full max-w-xl h-auto bg-gray-200 text-black rounded-md">
        <FailsDisplay fails={fails} />
        <Player
          startsAt={song.startAt}
          name={song.title}
          secondsLimit={Math.pow(2, fails + 2)}
          id={song.id}
          fails={fails}
        />
        {song.duration}
        <GameForm allSongs={allSongs} />
      </div>
    </div>
  );
};

export default Game;
