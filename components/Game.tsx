import React, { useState } from "react";
import { Artist, Attempt, Game_Song, Song } from "../shared/schemas";
import { GameState, StateSetter } from "../types";
import Stats, { ArtistStatsDisplay } from "./modals/ArtistStats";
import FailsDisplay from "./Game-thingies/FailsDisplay";
import GameControls from "./Game-thingies/GameControls";
import Player from "./Game-thingies/Player";
import { Instructions } from "./modals/Instructions";
import StarButton from "./common/StarButton";

type GameProps = {
  song: Game_Song;
  validSongs: string[];
  artist: Artist;
  gameState: GameState;
  attempts: Attempt[];
  setAttempts: StateSetter<Attempt[]>;
  shareableScreen: React.ReactNode;
};

const Game = ({
  song,
  validSongs,
  artist,
  gameState,
  attempts,
  setAttempts,
  shareableScreen,
}: GameProps) => {
  return (
    <div className="flex justify-center w-full mb-8">
      <div className="w-full max-w-lg text-gray-200 rounded-md shadow-xl">
        {shareableScreen}
        <div className="flex justify-between px-2">
          <Instructions />
          <ArtistStatsDisplay artistId={artist.id} />
          <StarButton artist={artist} />
        </div>
        <FailsDisplay attempts={attempts} />
        <section className="py-2s">
          <Player
            disableLimit={gameState !== "Playing"}
            song={song}
            secondsLimit={
              gameState === "Playing" ? Math.pow(2, attempts.length + 1) : 16
            }
            attemptCount={attempts.length}
          />
          <GameControls
            validSongs={validSongs}
            correctSong={song.title}
            artistId={artist.id}
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
