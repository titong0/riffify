import React, { useState } from "react";
import { saveFails } from "../utils";
import Combobox from "./Combobox";
import FailsDisplay from "./FailsDisplay";

type FormProps = {
  artistId: string;
  allSongs: string[];
  correctSong: string;
  fails: string[];
  setFails: React.Dispatch<React.SetStateAction<string[]>>;
};

const GameForm = ({
  artistId,
  allSongs,
  correctSong,
  fails,
  setFails,
}: FormProps) => {
  const [validInput, setValidInput] = useState(false);

  const pushFail = (fail: string) => {
    const failsCopy = [...fails, fail];
    setFails(failsCopy);
    saveFails(artistId, failsCopy);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    const name = form.song.value;

    if (!allSongs.includes(name)) return;
    if (name === correctSong) {
      return pushFail(name + "RESERVED-KEYWORD-FOR-CORRECTS");
    }
    pushFail(name);
  };
  return (
    <form onSubmit={submit}>
      <Combobox allSongs={allSongs} setValidInput={setValidInput} />
      <div className="flex w-full justify-between p-2">
        <button
          className="border border-black p-2 rounded-sm enabled:hover:bg-gray-300"
          disabled={fails.length >= 3}
          type={"reset"}
          onClick={() => pushFail("RESERVED-KEYWORD-FOR-SKIPS")}
        >
          {fails.length >= 3
            ? "No more skips"
            : `Skip (+${Math.pow(2, fails.length + 1)}s)`}
        </button>
        <span> {validInput}</span>
        <button
          className="p-2 px-4 bg-emerald-400 hover:outline outline-offset-2 active:bg-emerald-600 rounded-md transition"
          disabled={fails.length === 5}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default GameForm;
