import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BaseReactPlayer, { BaseReactPlayerProps } from "react-player/base";
import { BsFillPlayFill } from "react-icons/bs";
import { MdPause } from "react-icons/md";

const VideoPlayer = dynamic(() => import("./CustomPlayer"), { ssr: false });

type PlayerProps = {
  id: string;
  startsAt: number;
  secondsLimit: number;
  name: string;
};

const Player = ({ id, startsAt, secondsLimit }: PlayerProps) => {
  console.log("limit", secondsLimit);
  const [playing, setPlaying] = useState(false);
  const [playStart, setPlaysStart] = useState(0);

  const url = `https://www.youtube.com/watch?v=${id}`;
  const playerRef = useRef<BaseReactPlayer<BaseReactPlayerProps>>(null);

  useEffect(() => {
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
    <>
      <VideoPlayer
        playerRef={playerRef}
        url={url}
        playing={playing}
        onPlay={() => setPlaysStart(Date.now())}
        onReady={() => playerRef.current?.seekTo(startsAt)}
      />
      <button
        className="border-2 p-2 w-12 h-12"
        onClick={() => setPlaying(!playing)}
      >
        {!playing ? <BsFillPlayFill size="30" /> : <MdPause size="30" />}
      </button>
    </>
  );
};

export default Player;
