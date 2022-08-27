import React, { useState } from "react";
import Combobox from "./Combobox";

type FormProps = {
  allSongs: string[];
};

const GameForm = ({ allSongs }: FormProps) => {
  const [validInput, setValidInput] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as typeof e.target & {
      song: { value: string };
    };
  };
  return (
    <form onSubmit={submit}>
      <Combobox allSongs={allSongs} setValidInput={setValidInput} />
      <div className="flex w-full justify-between p-2">
        <button className="border border-black p-2 rounded-sm">
          Skip (+1s)
        </button>
        <span> {validInput}</span>
        <button className="p-2 px-4 bg-emerald-400 rounded-md">Submit</button>
      </div>
    </form>
  );
};

export default GameForm;
