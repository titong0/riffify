import React, { useState } from "react";
import Combobox from "./Combobox";
import FailsDisplay from "./FailsDisplay";

type FormProps = {
  allSongs: string[];
  correctSong: string;
  fails: string[];
  setFails: React.Dispatch<React.SetStateAction<string[]>>;
};

const GameForm = ({ allSongs, correctSong, fails, setFails }: FormProps) => {
  const [validInput, setValidInput] = useState(false);

  const pushFail = (fail: string) => {
    const failsCopy = [...fails, fail];
    setFails(failsCopy);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    const name = form.song.value;

    if (!allSongs.includes(name)) return;
    if (name === correctSong) {
      return pushFail(name + "RESERVED-KEYWORD-FOR-CORRECTS");
    }
    if (name === "RESERVED-KEYWORD-FOR-SKIPS") return;
    if (fails.length === 4) {
      alert("perdiste amigo 👎. Era " + correctSong);
    }
    pushFail(name);
  };
  return (
    <form onSubmit={submit}>
      <Combobox allSongs={allSongs} setValidInput={setValidInput} />
      <div className="flex w-full justify-between p-2">
        <button
          className="border border-black p-2 rounded-sm hover:bg-gray-300"
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
