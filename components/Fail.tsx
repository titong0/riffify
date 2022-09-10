import React from "react";
import { MdBlock, MdCheck, MdClear } from "react-icons/md";

const Fail = ({ content, idx }: { content: string; idx: number }) => {
  if (!content)
    return (
      <div
        key={idx}
        className="flex items-center w-full border border-current p-2 h-16 sm:h-12"
      ></div>
    );
  // SKIP RECTANGLES
  if (content === "RESERVED-KEYWORD-FOR-SKIPS")
    return (
      <div
        key={idx}
        className="flex items-center w-full border border-current h-16 sm:h-12 p-2 dark:text-gray-400 italic text-center"
      >
        <MdBlock size={30} className="mr-4" />
        Skipped
      </div>
    );

  // CORRECT RECTANGLE
  if (content.includes("RESERVED-KEYWORD-FOR-CORRECTS")) {
    return (
      <div
        key={content}
        className="flex items-center w-full border border-current p-2 h-16 sm:h-12 bg-emerald-400 dark:bg-emerald-700 bg-opacity-80 dark:text-white"
      >
        <MdCheck size={30} color="#00000" className="mr-4" />
        {content.replace("RESERVED-KEYWORD-FOR-CORRECTS", "")}
      </div>
    );
  }
  // FAIL RECTANGLES
  return (
    <div
      key={content}
      className="flex items-center w-full border border-current p-2 h-16 sm:h-12"
    >
      <MdClear size={30} color="#ff2222" className="mr-4" /> {content}
    </div>
  );
};

export default Fail;
