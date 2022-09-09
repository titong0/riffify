import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BaseReactPlayer, { BaseReactPlayerProps } from "react-player/base";
import { BsFillPlayFill } from "react-icons/bs";
import { MdPause } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

const VideoPlayer = dynamic(() => import("./CustomPlayer"), { ssr: false });

type PlayerProps = {
  id: string;
  startsAt: number;
  secondsLimit: number;
  name: string;
};

const Player = ({ id, startsAt, secondsLimit }: PlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [startedPlaying, setPlaysStart] = useState(0);
  const [ready, setReady] = useState(false);

  const url = `https://www.youtube.com/watch?v=${id}`;
  const playerRef = useRef<BaseReactPlayer<BaseReactPlayerProps>>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - startedPlaying > secondsLimit * 1000) {
        playerRef.current?.seekTo(startsAt);
        setPlaying(false);
        setPlaysStart(0);
        clearInterval(id);
      }
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, [startedPlaying]);

  const handleReady = () => {
    setReady(true);
    playerRef.current?.seekTo(startsAt);
  };

  return (
    <>
      <div className="fixed top-0 left-0">
        <VideoPlayer
          playerRef={playerRef}
          url={url}
          playing={playing}
          onPlay={() => setPlaysStart(Date.now())}
          onPause={() => setPlaysStart(0)}
          onReady={handleReady}
        />
      </div>
      {ready ? (
        <button
          className="border-2 p-2 w-12 h-12"
          onClick={() => setPlaying(!playing)}
        >
          {!playing ? <BsFillPlayFill size="30" /> : <MdPause size="30" />}
        </button>
      ) : (
        <span className="border-2 p-2 w-12 h-12">
          <AiOutlineLoading size="30" className="animate-spin" />
        </span>
      )}
    </>
  );
};

export default Player;
