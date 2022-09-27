import React, { useState } from "react";
import { Attempt } from "../types";
import { analyzeTry, saveTries } from "../utils";
import Combobox from "./Combobox";
import FailsDisplay from "./FailsDisplay";

type FormProps = {
  artistId: string;
  allSongs: string[];
  correctSong: string;
  attempts: Attempt[];
  setAttempts: React.Dispatch<React.SetStateAction<Attempt[]>>;
};

const GameForm = ({
  artistId,
  allSongs,
  correctSong,
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
      <div className="flex w-full justify-between p-2">
        <button
          className="border border-black p-2 rounded-sm enabled:hover:bg-gray-300"
          disabled={attempts.length >= 3}
          type={"reset"}
          onClick={() => pushTry(analyzeTry("RESERVED-SKIP", correctSong))}
        >
          {attempts.length >= 3
            ? "No more skips"
            : `Skip (+${Math.pow(2, attempts.length + 1)}s)`}
        </button>
        <span> {validInput}</span>
        <button
          className="p-2 px-4 bg-emerald-400 hover:outline outline-offset-2 active:bg-emerald-600 rounded-md transition"
          disabled={attempts.length === 5}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default GameForm;
