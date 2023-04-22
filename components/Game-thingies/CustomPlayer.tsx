import ReactPlayer, { YouTubePlayerProps } from "react-player/youtube";
import { useState, useEffect, useRef } from "react";
import BaseReactPlayer, { BaseReactPlayerProps } from "react-player/base";
import { calculateStart } from "../../server/songChoosingUtils";
import { StateSetter } from "../../types";

type VideoPlayerProps = YouTubePlayerProps & {
  secondsLimit: number;
  song: { id: string; startsAt: number };
  playing: boolean;
  setPlaying: StateSetter<boolean>;
  setReady: StateSetter<boolean>;
};

const VideoPlayer = ({
  setReady,
  secondsLimit,
  song,
  playing,
  setPlaying,
  ...props
}: VideoPlayerProps) => {
  const url = `https://www.youtube.com/watch?v=${song.id}`;
  const playerRef = useRef<BaseReactPlayer<BaseReactPlayerProps>>(null);
  const [correctedStartsAt, setCorrectedStartsAt] = useState(song.startsAt);
  const [startedPlaying, setStartedPlaying] = useState(0);

  useEffect(() => {
    console.log("run effect");
    const checkIfExceededPlaytime = setTimeout(() => {
      playerRef.current?.seekTo(correctedStartsAt);
      setPlaying(false);
    }, secondsLimit * 1000);
    return () => {
      clearTimeout(checkIfExceededPlaytime);
    };
  }, [correctedStartsAt, playing, secondsLimit, setPlaying]);

  const handleReady = () => {
    setReady(true);
    playerRef.current?.seekTo(correctedStartsAt);
  };

  return (
    <div className={"fixed"}>
      <ReactPlayer
        ref={playerRef}
        {...props}
        // width="0"
        // height="0"
        playing={playing}
        controls={false}
        url={url}
        onPlay={() => setStartedPlaying(Date.now())}
        onPause={() => setStartedPlaying(0)}
        onReady={handleReady}
        onDuration={(duration) => {
          // This is needed as sometimes, a yt music id may belong to a
          // song with a duration different to the web yt id. Example
          // https://music.youtube.com/playlist?list=OLAK5uy_lUlpor68rM1s9pkNM-8fNJRstJI5AsPWo (see track 9)
          // https://youtube.com/watch?v=Bm5iA4Zupek
          if (duration > song.startsAt) return;
          const newStartsAt = calculateStart(duration);
          setCorrectedStartsAt(newStartsAt);
        }}
      />
    </div>
  );
};
export default VideoPlayer;
