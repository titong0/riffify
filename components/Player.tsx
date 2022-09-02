import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BaseReactPlayer, { BaseReactPlayerProps } from "react-player/base";
import ProgressBar from "./ProgressBar";
import { BsFillPlayFill } from "react-icons/bs";
import { MdPause } from "react-icons/md";

const VideoPlayer = dynamic(() => import("./CustomPlayer"), { ssr: false });

type PlayerProps = {
  id: string;
  startsAt: number;
  secondsLimit: number;
  name: string;
  fails: number;
};

const Player = ({ id, startsAt, secondsLimit, fails }: PlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [playStart, setPlaysStart] = useState(0);

  const url = `https://www.youtube.com/watch?v=${id}`;
  const playerRef = useRef<BaseReactPlayer<BaseReactPlayerProps>>(null);

  useEffect(() => {
    // if (playStart === 0) return;
    const id = setInterval(() => {
      if (Date.now() - playStart > secondsLimit * 1000) {
        playerRef.current?.seekTo(startsAt);

        setPlaying(false);
        setPlaysStart(0);
        clearInterval(id);
      }
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [playStart]);

  return (
    <div className="">
      <VideoPlayer
        playerRef={playerRef}
        url={url}
        playing={playing}
        onPlay={() => setPlaysStart(Date.now())}
        onReady={() => playerRef.current?.seekTo(startsAt)}
      />

      <div className="p-2 flex justify-around">
        <ProgressBar fails={fails} />
        <button
          className="border-2 p-2 w-12 h-12"
          onClick={() => setPlaying(!playing)}
        >
          {!playing ? <BsFillPlayFill size="30" /> : <MdPause size="30" />}
        </button>
      </div>
    </div>
  );
};

export default Player;
