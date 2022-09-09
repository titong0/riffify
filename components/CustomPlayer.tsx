import ReactPlayer, { YouTubePlayerProps } from "react-player/youtube";

type VideoPlayerProps = YouTubePlayerProps & {
  playerRef: any;
};

const VideoPlayer = ({ playerRef, ...props }: VideoPlayerProps) => {
  return <ReactPlayer ref={playerRef} {...props} width="0" height="0" />;
};
export default VideoPlayer;
