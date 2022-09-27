import React, { Suspense, useEffect, useRef, useState } from "react";
import { SongDetails, Attempt, GameState } from "../types";
import { getAttempts, getGameState } from "../utils";
import FailsDisplay from "./FailsDisplay";
import GameForm from "./GameForm";
import Player from "./Player";

type GameProps = {
  song: SongDetails;
  allSongs: string[];
  artistId: string;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
};

const Game = ({ song, allSongs, artistId, setGameState }: GameProps) => {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  setGameState(getGameState(attempts));
  useEffect(() => {
    setAttempts(getAttempts(artistId));
  }, []);

  return (
    <div className="flex w-full justify-center p-2 mb-8">
      <div className="w-full max-w-lg bg-gray-200 text-black rounded-md shadow-xl">
        <FailsDisplay attempts={attempts} />
        <section className="py-4">
          <Player
            startsAt={song.startAt}
            name={song.title}
            secondsLimit={Math.pow(2, attempts.length + 1)}
            id={song.id}
            attempts={attempts}
          />
          <GameForm
            attempts={attempts}
            setAttempts={setAttempts}
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
