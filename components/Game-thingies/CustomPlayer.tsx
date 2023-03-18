import ReactPlayer, { YouTubePlayerProps } from "react-player/youtube";

type VideoPlayerProps = YouTubePlayerProps & {
  playerRef: any;
};

const VideoPlayer = ({ playerRef, ...props }: VideoPlayerProps) => {
  return (
    <div className="fixed">
      <ReactPlayer
        ref={playerRef}
        {...props}
        width="0"
        height="0"
        controls={false}
        config={{ embedOptions: { "": "" } }}
      />
    </div>
  );
};
export default VideoPlayer;
