import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BaseReactPlayer, { BaseReactPlayerProps } from "react-player/base";
import { BsFillPlayFill } from "react-icons/bs";
import { MdPause } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import PlaytimeBar from "./PlaytimeBar";
import { Attempt, GameState } from "../../types";

const VideoPlayer = dynamic(() => import("./CustomPlayer"), { ssr: false });

type PlayerProps = {
  id: string;
  startsAt: number;
  secondsLimit: number;
  name: string;
  attempts: Attempt[];
};

const Player = ({ id, startsAt, secondsLimit, attempts }: PlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [startedPlaying, setPlaysStart] = useState(0);
  const [ready, setReady] = useState(false);

  const url = `https://www.youtube.com/watch?v=${id}`;
  const playerRef = useRef<BaseReactPlayer<BaseReactPlayerProps>>(null);

  useEffect(() => {
    console.log({ secondsLimit });
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
  }, [startedPlaying, playing, startsAt, secondsLimit]);

  const handleReady = () => {
    setReady(true);
    playerRef.current?.seekTo(startsAt);
  };

  return (
    <div className="grid w-full grid-cols-10 px-2 justify-items-center sm:flex-row">
      <PlaytimeBar playing={playing} failAmount={attempts.length} />
      <div className="fixed">
        <VideoPlayer
          volume={0.5}
          playerRef={playerRef}
          url={url}
          playing={playing}
          onPlay={() => setPlaysStart(Date.now())}
          onPause={() => setPlaysStart(0)}
          onReady={handleReady}
        />
      </div>
      {ready ? (
        <button className="w-6 h-6" onClick={() => setPlaying(!playing)}>
          {!playing ? <BsFillPlayFill size="25" /> : <MdPause size="30" />}
        </button>
      ) : (
        <span className="w-12 h-12 p-2 border-2">
          <AiOutlineLoading size="30" className="animate-spin" />
        </span>
      )}
    </div>
  );
};

export default Player;
