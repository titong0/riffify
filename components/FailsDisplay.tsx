import React from "react";
import Fail from "./Fail";

const FailsDisplay = ({ fails }: { fails: string[] }) => {
  const failDivs = Array.from({ ...fails, length: 5 });

  return (
    <div className="flex flex-col items-center gap-2 min-h-32 p-2 bg-emerald-50 text-neutral-900 dark:bg-gray-800 dark:text-blue-100">
      {failDivs.map((fail, idx) => (
        <Fail content={fail} idx={idx} />
      ))}
    </div>
  );
};

export default FailsDisplay;
