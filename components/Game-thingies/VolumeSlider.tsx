import * as Slider from "@radix-ui/react-slider";
import { StateSetter } from "../../types";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const ActualSlider = ({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: StateSetter<number>;
}) => {
  return (
    <Slider.Root
      className="flex items-center justify-center w-32 h-1 col-start-3 "
      onValueChange={(values) => {
        setVolume(values[0]);
      }}
      min={0}
      max={1}
      step={0.05}
      value={[volume]}
    >
      <Slider.Track className="relative flex items-center w-full h-1 bg-slate-200">
        <Slider.Range className="absolute h-full bg-slate-400" />
        <Slider.Thumb className="block w-3 h-3 rounded-full outline-none bg-slate-800 focus:bg-slate-700" />
      </Slider.Track>
    </Slider.Root>
  );
};

type VolumeSliderProps = {
  volume: number;
  setVolume: StateSetter<number>;
};
export function VolumeSlider({ volume, setVolume }: VolumeSliderProps) {
  return (
    <>
      <HiOutlineSpeakerWave className="col-start-1" size={20} />
      <ActualSlider setVolume={setVolume} volume={volume} />
    </>
  );
}
