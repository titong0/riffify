import React from "react";
import { Attempt } from "../types";
import Fail from "./Fail";

const FailsDisplay = ({ attempts }: { attempts: Attempt[] }) => {
  const attemptsDivs = Array.from({ ...attempts, length: 5 });

  return (
    <div
      className="flex flex-col items-center gap-2 min-h-32 p-2 
    bg-slate-300 text-neutral-900
    dark:bg-gray-800 dark:text-blue-100"
    >
      {attemptsDivs.map((attempt, idx) => (
        <Fail
          attempt={attempt}
          key={idx.toString() + JSON.stringify(attempt)}
        />
      ))}
    </div>
  );
};

export default FailsDisplay;
