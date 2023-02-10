import React from "react";
import { Attempt } from "../../types";
import Fail from "./../Fail";

const FailsDisplay = ({ attempts }: { attempts: Attempt[] }) => {
  const attemptsDivs: Array<Attempt | undefined> = Array.from({
    ...attempts,
    length: 5,
  });

  return (
    <div className="flex flex-col items-center gap-2 p-2 text-gray-200">
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
