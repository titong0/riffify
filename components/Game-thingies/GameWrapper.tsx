import React, { useState, useEffect } from "react";
import { Artist, Attempt, Game_Song } from "../../shared/schemas";
import { getArtistStats, getAttempts, updateStats } from "../../storageUtils";
import { GameState } from "../../types";
import { getGameState } from "../../utils";
import FailScreen from "../modals/FailScreen";
import Game from "../Game";
import WinningScreen from "../modals/WinningScreen";

type GameWrapProps = {
  artist: Artist;
  song: Game_Song;
  validSongs: string[];
};
const GameWrapper = ({ song, validSongs, artist }: GameWrapProps) => {
  const [gameState, setGameState] = useState<GameState>("Playing");
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    if (gameState !== "Playing") {
      updateStats(artist.id, attempts.length, gameState === "Succeded");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // This is likely a bad solution but I couldn't find a better way
  useEffect(() => {
    setGameState(getGameState(attempts));
  }, [attempts]);

  useEffect(() => {
    setAttempts(getAttempts(artist.id));
  }, [artist.id]);

  const shareableScreen = React.useMemo(() => {
    if (gameState === "Playing") return null;
    if (gameState === "Succeded") {
      return <WinningScreen artist={artist} attempts={attempts} song={song} />;
    }
    return <FailScreen artistId={artist.id} song={song} />;
  }, [artist, attempts, gameState, song]);

  return (
    <>
      <Game
        shareableScreen={shareableScreen}
        song={song}
        validSongs={validSongs}
        artistId={artist.id}
        gameState={gameState}
        attempts={attempts}
        setAttempts={setAttempts}
      />
    </>
  );
};

export default GameWrapper;
