import ReactPlayer, { YouTubePlayerProps } from "react-player/youtube";

type VideoPlayerProps = YouTubePlayerProps & {
  playerRef: any;
};

const VideoPlayer = ({ playerRef, ...props }: VideoPlayerProps) => {
  return <ReactPlayer ref={playerRef} {...props} width="700" height="400" />;
};
export default VideoPlayer;
