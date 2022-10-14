import React, { useState, useEffect } from "react";
import { getAttempts, writeStats } from "../../storageUtils";
import { Artist, Attempt, GameState, SongDetails } from "../../types";
import { getGameState } from "../../utils";
import FailScreen from "../FailScreen";
import Game from "../Game";
import WinningScreen from "../WinningScreen";

type GameWrapProps = {
  artist: Artist;
  song: SongDetails;
  allSongs: string[];
  artistId: string;
};
const GameWrapper = ({ song, allSongs, artistId }: GameWrapProps) => {
  const [gameState, setGameState] = useState<GameState>("Playing");
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    if (gameState !== "Playing") {
      writeStats(artistId, gameState === "Succeded", attempts.length - 1);
    }
  }, [gameState]);

  // This is likely a bad solution but I couldn't find a better way
  useEffect(() => {
    setGameState(getGameState(attempts));
  }, [attempts]);

  useEffect(() => {
    setAttempts(getAttempts(artistId));
  }, []);

  return (
    <>
      <Game
        song={song}
        allSongs={allSongs}
        artistId={artistId}
        gameState={gameState}
        attempts={attempts}
        setAttempts={setAttempts}
      />
      {gameState === "Succeded" && <WinningScreen artistId={artistId} />}
      {gameState === "Failed" && <FailScreen />}
    </>
  );
  return null;
};

export default GameWrapper;
