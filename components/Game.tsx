import React, { useState } from "react";
import { Game_Song, Song } from "../shared/schemas";
import { Attempt, GameState, StateSetter } from "../types";
import { getGameState } from "../utils";
import FailsDisplay from "./Game-thingies/FailsDisplay";
import GameForm from "./Game-thingies/GameForm";
import Player from "./Game-thingies/Player";

type GameProps = {
  song: Game_Song;
  validSongs: string[];
  artistId: string;
  gameState: GameState;
  attempts: Attempt[];
  setAttempts: StateSetter<Attempt[]>;
};

const Game = ({
  song,
  validSongs,
  artistId,
  gameState,
  attempts,
  setAttempts,
}: GameProps) => {
  return (
    <div className="flex justify-center w-full mb-8">
      <div className="w-full max-w-lg text-gray-200 rounded-md shadow-xl">
        <FailsDisplay attempts={attempts} />
        <section className="py-2s">
          <Player
            gameState={gameState}
            startsAt={song.startAt}
            name={song.title}
            secondsLimit={
              gameState === "Playing" ? Math.pow(2, attempts.length + 1) : 16
            }
            id={song.id}
            attempts={attempts}
          />
          <GameForm
            validSongs={validSongs}
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
