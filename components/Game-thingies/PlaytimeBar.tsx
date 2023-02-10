import React from "react";

type PlaytimeBarProps = {
  failAmount: number;
  playing: boolean;
};

const BAR_POINTS = ["12%", "25%", "50%", "100%"];
const BAR_WIDTHS = ["w-2/12", "w-2/12", "w-4/12", "w-8/12"];
const BAR_COLORS = [
  "bg-green-600",
  "bg-green-600",
  "bg-green-600",
  "bg-green-600",
  "bg-green-600",
];

const PlaytimeBar = ({ failAmount, playing }: PlaytimeBarProps) => {
  const secondsAvailable = Math.pow(2, failAmount + 1);
  return (
    <div className="relative flex w-full col-span-9 text-black">
      <div
        className="absolute w-1 h-6 bg-stone-900"
        style={{
          left: playing ? BAR_POINTS[failAmount] : "0",
          transitionDuration: playing ? `${secondsAvailable}s` : "0.5s",
          transitionTimingFunction: "linear",
        }}
      ></div>

      {BAR_WIDTHS.map((width, idx) => (
        <Bar
          width={width}
          idx={idx}
          key={BAR_COLORS[idx]}
          failAmount={failAmount}
        />
      ))}
    </div>
  );
};

const Bar = ({
  width,
  idx,
  failAmount,
}: {
  width: string;
  idx: number;
  failAmount: number;
}) => {
  const DISABLED = failAmount < idx;
  const radius = idx === 0 ? "rounded-l-md" : idx === 3 ? "rounded-r-md" : "";
  // const bg = `bg-green-${200 + 100 * idx}`;
  const filter = `${DISABLED ? "saturate-[0.7 ] brightness-[0.4]" : ""}`;

  return (
    <div
      key={width + idx}
      className={`${width} h-12 flex flex-col items-center last:rounded-l-2xl`}
    >
      <div
        className={`h-8 w-full 
        ${BAR_COLORS[idx]} ${filter} ${radius} 
        border border-black`}
      ></div>
      <span className={DISABLED ? "text-gray-500" : ""}>
        {Math.pow(2, idx + 1)}s
      </span>
    </div>
  );
};

export default PlaytimeBar;
