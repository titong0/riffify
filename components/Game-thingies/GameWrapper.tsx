import React, { useState, useEffect } from "react";
import {
  Artist,
  Game_Song,
  Page_ArtistGameProps,
  Song,
} from "../../shared/schemas";
import { getAttempts, writeStats } from "../../storageUtils";
import { Attempt, GameState } from "../../types";
import { getGameState } from "../../utils";
import FailScreen from "../FailScreen";
import Game from "../Game";
import WinningScreen from "../WinningScreen";

type GameWrapProps = {
  artist: Artist;
  song: Game_Song;
  allSongs: string[];
};
const GameWrapper = ({ song, allSongs, artist }: GameWrapProps) => {
  const [gameState, setGameState] = useState<GameState>("Playing");
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    if (gameState !== "Playing") {
      writeStats(artist.id, gameState === "Succeded", attempts.length - 1);
    }
  }, [gameState]);

  // This is likely a bad solution but I couldn't find a better way
  useEffect(() => {
    setGameState(getGameState(attempts));
  }, [attempts]);

  useEffect(() => {
    setAttempts(getAttempts(artist.id));
  }, []);

  return (
    <>
      <Game
        song={song}
        allSongs={allSongs}
        artistId={artist.id}
        gameState={gameState}
        attempts={attempts}
        setAttempts={setAttempts}
      />
      {gameState === "Succeded" && <WinningScreen artistId={artist.id} />}
      {gameState === "Failed" && <FailScreen />}
    </>
  );
  return null;
};

export default GameWrapper;
