import React from "react";

type ProgressBarProps = {
  fails: number;
};
const ProgressBar = ({ fails }: ProgressBarProps) => {
  return (
    <div className="flex w-full h-8 text-black border border-current">
      {["w-1/12", "w-2/12", "w-4/12", "w-8/12"].map((bar, idx) => (
        <div
          key={bar}
          className={`${bar} h-full bg-green-${200 + 100 * idx} ${
            fails < idx ? "brightness-50" : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
