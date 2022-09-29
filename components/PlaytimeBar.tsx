import React from "react";
import { motion } from "framer-motion";

type PlaytimeBarProps = {
  fails: number;
  playing: boolean;
};

const BAR_POINTS = ["12%", "25%", "50%", "100%"];

const PlaytimeBar = ({ fails, playing }: PlaytimeBarProps) => {
  return (
    <div className="relative m-2 flex w-full text-black">
      {/* TODO: implement manually because framer-motion is heavy */}
      <motion.div
        initial={{ left: "0" }}
        animate={{ left: playing ? BAR_POINTS[fails] : "0" }}
        transition={{
          ease: "linear",
          duration: playing ? Math.pow(2, fails + 1) : 0.5,
        }}
        className="absolute left-0 h-6 w-1 bg-stone-900"
      ></motion.div>

      {["w-2/12", "w-2/12", "w-4/12", "w-8/12"].map((width, idx) => {
        const DISABLED = fails < idx;
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
