import React, { useState } from "react";
import { Artist, GameState, SongDetails } from "../types";
import BgImage from "./BgImage";
import FailScreen from "./FailScreen";
import Game from "./Game";
import WinningScreen from "./WinningScreen";

type GameWrapProps = {
  artist: Artist;
  song: SongDetails;
  allSongs: string[];
  id: string;
};
const GameWrapper = ({ artist, song, allSongs, id }: GameWrapProps) => {
  const [gameState, setGameState] = useState<GameState>("Playing");

  if (gameState === "Playing")
    return (
      <Game
        song={song}
        allSongs={allSongs}
        artistId={id}
        setGameState={setGameState}
      />
    );
  if (gameState === "Succeded") return <WinningScreen />;
  if (gameState === "Failed") return <FailScreen />;
  return null;
};

export default GameWrapper;
