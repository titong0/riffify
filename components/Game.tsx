import React, { useState } from "react";
import { TodayRes } from "../types";
import GameForm from "./GameForm";

const Game = ({ song, allSongs }: TodayRes) => {
  return (
    <div className="flex w-full justify-center mt-12 ">
      <div className="w-full max-w-xl h-auto bg-gray-200 text-black rounded-md">
        <div className="h-64 p-2 bg-teal-700">GAME SOMETHING</div>
        <GameForm allSongs={allSongs} />
      </div>
    </div>
  );
};

export default Game;
