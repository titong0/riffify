import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BaseReactPlayer, { BaseReactPlayerProps } from "react-player/base";
import { BsFillPlayFill } from "react-icons/bs";
import { MdPause } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import PlaytimeBar from "./PlaytimeBar";
import { GameState } from "../../types";
import { VolumeSlider } from "./VolumeSlider";

import { calculateStart } from "../../server/songChoosingUtils";

const VideoPlayer = dynamic(() => import("./CustomPlayer"), { ssr: false });

type PlayerProps = {
  id: string;
  startsAt: number;
  secondsLimit: number;
  attemptCount: number;
  disableLimit: boolean;
};

const Player = ({
  id,
  startsAt,
  secondsLimit,
  attemptCount,
  disableLimit,
}: PlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [startedPlaying, setPlaysStart] = useState(0);
  const [ready, setReady] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const url = `https://www.youtube.com/watch?v=${id}`;
  const playerRef = useRef<BaseReactPlayer<BaseReactPlayerProps>>(null);
  const [correctedStartsAt, setCorrectedStartsAt] = useState(startsAt);

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - startedPlaying > secondsLimit * 1000) {
        playerRef.current?.seekTo(correctedStartsAt);
        setPlaying(false);
        setPlaysStart(0);
        clearInterval(id);
      }
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, [startedPlaying, playing, correctedStartsAt, secondsLimit]);

  const handleReady = () => {
    setReady(true);
    playerRef.current?.seekTo(correctedStartsAt);
  };

  return (
    <div className="grid items-center w-full grid-cols-10 grid-rows-2 px-2 justify-items-center sm:flex-row">
      <PlaytimeBar
        disableLimit={disableLimit}
        playing={playing}
        failAmount={attemptCount}
      />
      <VideoPlayer
        volume={volume}
        playerRef={playerRef}
        url={url}
        playing={playing}
        onPlay={() => setPlaysStart(Date.now())}
        onPause={() => setPlaysStart(0)}
        onReady={handleReady}
        onProgress={(e) => console.log(e)}
        onDuration={(duration) => {
          if (duration > startsAt) return;
          console.log(`duration : ${duration}. StartAt: ${startsAt}`);
          const newStartsAt = calculateStart(duration);
          console.log({ newStartsAt });
          setCorrectedStartsAt(newStartsAt);
        }}
      />
      {ready ? (
        <>
          <button className="w-6 h-6" onClick={() => setPlaying(!playing)}>
            {!playing ? <BsFillPlayFill size="25" /> : <MdPause size="30" />}
          </button>
        </>
      ) : (
        <span className="w-12 h-12 p-2 border-2">
          <AiOutlineLoading size="30" className="animate-spin" />
        </span>
      )}
      <VolumeSlider volume={volume} setVolume={setVolume} />
    </div>
  );
};

export default Player;
