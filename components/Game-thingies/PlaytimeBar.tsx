import React from "react";

type PlaytimeBarProps = {
  failAmount: number;
  playing: boolean;
};

const BAR_POINTS = ["12%", "25%", "50%", "100%"];

const PlaytimeBar = ({ failAmount, playing }: PlaytimeBarProps) => {
  const secondsAvailable = Math.pow(2, failAmount + 1);
  return (
    <div className="relative m-2 flex w-full text-black">
      <div
        className="absolute h-6 w-1 bg-stone-900"
        style={{
          left: playing ? BAR_POINTS[failAmount] : "0",
          transitionDuration: playing ? `${secondsAvailable}s` : "0.5s",
          transitionTimingFunction: "linear",
        }}
      ></div>

      {["w-2/12", "w-2/12", "w-4/12", "w-8/12"].map((width, idx) => {
        const DISABLED = failAmount < idx;
        return (
          <div
            key={width + idx}
            className={`${width} h-12 flex flex-col items-center`}
          >
            <div
              className={`h-8 w-full bg-green-${200 + 100 * idx}
            ${DISABLED ? "saturate-50 brightness-50" : ""} border border-black`}
            ></div>
            <span className={DISABLED ? "text-gray-500" : ""}>
              {Math.pow(2, idx + 1)}s
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PlaytimeBar;
