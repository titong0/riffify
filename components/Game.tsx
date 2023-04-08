import React, { useState } from "react";
import { Attempt, Game_Song, Song } from "../shared/schemas";
import { GameState, StateSetter } from "../types";
import { getGameState } from "../utils";
import Stats, { ArtistStatsDisplay } from "./modals/ArtistStats";
import FailsDisplay from "./Game-thingies/FailsDisplay";
import GameControls from "./Game-thingies/GameControls";
import Player from "./Game-thingies/Player";
import { Instructions } from "./modals/Instructions";

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
        <div className="flex justify-between px-2">
          <Instructions />
          <ArtistStatsDisplay artistId={artistId} />
        </div>
        <FailsDisplay attempts={attempts} />
        <section className="py-2s">
          <Player
            disableLimit={gameState !== "Playing"}
            startsAt={song.startAt}
            secondsLimit={
              gameState === "Playing" ? Math.pow(2, attempts.length + 1) : 16
            }
            id={song.id}
            attemptCount={attempts.length}
          />
          <GameControls
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
