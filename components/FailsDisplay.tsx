import React from "react";

const FailsDisplay = ({ fails }: { fails: string[] }) => {
  return (
    <div className="flex flex-col items-center gap-2 min-h-32 p-2 bg-teal-100 dark:bg-gray-800">
      {Array.from({ length: 5 }).map((_, idx) => {
        if (fails[idx] === "RESERVED-KEYWORD-FOR-SKIPS")
          return (
            <div
              key={fails[idx]}
              className="w-full border h-10 p-2 dark:text-gray-200 italic text-center"
            >
              Skipped
            </div>
          );
        return (
          <div
            key={idx}
            className="w-full border p-2 min-h-5 dark:text-blue-100"
          >
            {fails[idx]}
          </div>
        );
      })}
    </div>
  );
};

export default FailsDisplay;
