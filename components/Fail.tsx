import React from "react";
import { MdBlock, MdCheck, MdClear } from "react-icons/md";
import { Attempt } from "../types";

const Fail = ({ attempt }: { attempt: Attempt }) => {
  if (typeof attempt === "undefined")
    return (
      <div className="flex items-center w-full border border-current p-2 h-16 sm:h-12"></div>
    );

  if (attempt.type === "Skip")
    return (
      <div
        className="flex items-center w-full border border-current h-16 sm:h-12 p-2 
        italic text-center bg-transparent
        text-black dark:text-gray-400 
        animate-[fade-in_700ms]"
      >
        <MdBlock size={30} className="mr-4" />
        Skipped
      </div>
    );

  if (attempt.type === "Success") {
    return (
      <div
        key={attempt.content}
        className="flex items-center w-full border p-2 h-16 sm:h-12 
        bg-emerald-400 dark:bg-emerald-400 
        text-white dark:text-emerald-900
        bg-opacity-80"
      >
        <MdCheck size={30} color="#00000" className="mr-4" />
        {attempt.content}
      </div>
    );
  }

  // FAIL RECTANGLES
  return (
    <div
      key={attempt.content}
      className="flex items-center w-full border border-current p-2 h-16 sm:h-12 bg-red-300 dark:bg-red-900"
    >
      <MdClear size={30} color="#fff" className="mr-4" /> {attempt.content}
    </div>
  );
};

export default Fail;
