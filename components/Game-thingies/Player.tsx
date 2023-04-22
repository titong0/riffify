import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BaseReactPlayer, { BaseReactPlayerProps } from "react-player/base";
import { BsFillPlayFill } from "react-icons/bs";
import { MdPause } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import PlaytimeBar from "./PlaytimeBar";
import { GameState, StateSetter } from "../../types";
import { VolumeSlider } from "./VolumeSlider";
import { Game_Song } from "../../shared/schemas";

const VideoPlayer = dynamic(() => import("./CustomPlayer"), { ssr: false });

type PlayerProps = {
  song: Game_Song;
  secondsLimit: number;
  attemptCount: number;
  disableLimit: boolean;
};

const Player = ({
  song,
  secondsLimit,
  attemptCount,
  disableLimit,
}: PlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [volume, setVolume] = useState(0.5);

  return (
    <div className="grid items-center w-full grid-cols-10 grid-rows-2 px-2 justify-items-center sm:flex-row">
      <PlaytimeBar
        disableLimit={disableLimit}
        playing={playing}
        failAmount={attemptCount}
      />
      <VideoPlayer
        setPlaying={setPlaying}
        setReady={setReady}
        volume={volume}
        playing={playing}
        secondsLimit={secondsLimit}
        song={song}
      />
      <PauseResumeButton
        playing={playing}
        ready={ready}
        setPlaying={setPlaying}
      />
      <VolumeSlider volume={volume} setVolume={setVolume} />
    </div>
  );
};

function PauseResumeButton({
  playing,
  ready,
  setPlaying,
}: {
  ready: boolean;
  playing: boolean;
  setPlaying: StateSetter<boolean>;
}) {
  if (!ready)
    return (
      <span className="w-12 h-12 p-2 border-2">
        <AiOutlineLoading size="30" className="animate-spin" />
      </span>
    );

  return (
    <button className="w-6 h-6" onClick={() => setPlaying(!playing)}>
      {!playing ? <BsFillPlayFill size="25" /> : <MdPause size="30" />}
    </button>
  );
}

export default Player;
