import React, { useState } from "react";
import { saveTries } from "../../storageUtils";
import { Attempt, GameState, StateSetter } from "../../types";
import { analyzeTry } from "../../utils";
import CTA from "../common/CTA";
import Combobox from "./Combobox";
import FailsDisplay from "./FailsDisplay";

type FormProps = {
  artistId: string;
  allSongs: string[];
  correctSong: string;
  gameState: GameState;
  attempts: Attempt[];
  setAttempts: StateSetter<Attempt[]>;
};

const GameForm = ({
  artistId,
  allSongs,
  correctSong,
  gameState,
  attempts,
  setAttempts,
}: FormProps) => {
  const [validInput, setValidInput] = useState(false);

  const pushTry = (fail: Attempt) => {
    const attsCopy = [...attempts, fail];
    setAttempts(attsCopy);
    saveTries(artistId, attsCopy);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    const name = form.song.value;

    const attemptObj = analyzeTry(name, correctSong);
    pushTry(attemptObj);
  };
  return (
    <form onSubmit={submit}>
      <Combobox allSongs={allSongs} setValidInput={setValidInput} />

      <div className="flex justify-between w-full p-2">
        <button
          className="p-2 border border-current rounded-sm enabled:hover:bg-gray-300"
          disabled={attempts.length >= 3 || gameState !== "Playing"}
          type={"reset"}
          onClick={() => pushTry(analyzeTry("RESERVED-SKIP", correctSong))}
        >
          {attempts.length >= 3
            ? "No more skips"
            : `Skip (+${Math.pow(2, attempts.length + 1)}s)`}
        </button>
        <CTA
          className="p-2 px-6 w-fit"
          disabled={
            attempts.length === 5 || !validInput || gameState !== "Playing"
          }
        >
          Submit
        </CTA>
        {/* <button className="p-2 px-4 transition rounded-md bg-emerald-400 hover:outline outline-offset-2 active:bg-emerald-600 disabled:bg-emerald-200 disabled:hover:outline-none"></button> */}
      </div>
    </form>
  );
};

export default GameForm;
