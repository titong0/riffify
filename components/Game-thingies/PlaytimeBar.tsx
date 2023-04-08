import React from "react";
import { GameState } from "../../types";

type PlaytimeBarProps = {
  failAmount: number;
  playing: boolean;
  disableLimit: boolean;
};

const BAR_POINTS = ["12%", "25%", "50%", "100%"];
const BAR_WIDTHS = ["w-2/12", "w-2/12", "w-4/12", "w-8/12"];
const BAR_SECONDS = [2, 4, 8, 16];

const PlaytimeBar = ({
  failAmount,
  playing,
  disableLimit,
}: PlaytimeBarProps) => {
  const secondsAvailable = disableLimit ? 16 : Math.pow(2, failAmount + 1);
  const barRightTranslate = disableLimit
    ? `translateX(100%)`
    : `translateX(${BAR_POINTS[failAmount]})`;
  return (
    <div className="flex flex-col w-full col-span-9 text-black ">
      <div className="relative flex w-full h-4 overflow-hidden border border-black rounded-l-lg rounded-r-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div
          className="absolute w-full h-full overflow-hidden bg-black opacity-20 -left-full"
          style={{
            transform: playing ? barRightTranslate : "translate(0)",
            transitionDuration: playing ? `${secondsAvailable}s` : "0.5s",
            transitionTimingFunction: "linear",
          }}
        ></div>
        {BAR_SECONDS.map((second, idx) => {
          return (
            <Bar
              disabled={!disableLimit && failAmount < idx}
              width={BAR_WIDTHS[idx]}
              idx={idx}
              key={`${second}-${idx}${BAR_POINTS[idx]}`}
            />
          );
        })}
      </div>
      <div className="flex">
        {BAR_SECONDS.map((i, idx) => {
          const text =
            !disableLimit && failAmount < idx
              ? "text-gray-400"
              : "text-gray-100";
          return (
            <span key={i} className={`${BAR_WIDTHS[idx]} text-center ${text}`}>
              {i}s
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Bar = ({
  width,
  idx,
  disabled,
}: {
  width: string;
  idx: number;
  disabled: boolean;
}) => {
  const bg = disabled ? `bg-gray-800` : "";
  return (
    <div
      key={width + idx}
      className={`${width} h-full flex flex-col items-center border-r last:border-r-0 border-gray-800`}
    >
      <div
        className={`h-full w-full opacity-90  
        ${bg}`}
      ></div>
    </div>
  );
};

export default PlaytimeBar;
