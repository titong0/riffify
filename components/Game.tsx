import React, { useState } from "react";
import { SongDetails, Attempt, GameState, StateSetter } from "../types";
import { getGameState } from "../utils";
import FailsDisplay from "./Game-thingies/FailsDisplay";
import GameForm from "./Game-thingies/GameForm";
import Player from "./Game-thingies/Player";

type GameProps = {
  song: SongDetails;
  allSongs: string[];
  artistId: string;
  gameState: GameState;
  attempts: Attempt[];
  setAttempts: StateSetter<Attempt[]>;
};

const Game = ({
  song,
  allSongs,
  artistId,
  gameState,
  attempts,
  setAttempts,
}: GameProps) => {
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
            allSongs={allSongs}
            correctSong={song.title}
            artistId={artistId}
            gameState={gameState}
            attempts={attempts}
            setAttempts={setAttempts}
          />
        </section>
      </div>
    </div>
  );
};

export default Game;
