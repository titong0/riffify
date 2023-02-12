import { useCombobox } from "downshift";
import React, { memo, useState } from "react";
import { StateSetter } from "../../types";

type ComboProps = {
  allSongs: string[];
  setValidInput: StateSetter<boolean>;
};
const Combobox: React.FC<ComboProps> = ({ allSongs, setValidInput }) => {
  const [songs, setSongs] = useState(allSongs);

  const getSongsFilter = (inputValue: string | undefined) => {
    return function songsFilter(song: string) {
      return (
        !inputValue || song.toLowerCase().includes(inputValue.toLowerCase())
      );
    };
  };

  const {
    getLabelProps,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
    isOpen,
  } = useCombobox<string>({
    onInputValueChange({ inputValue }) {
      setSongs(allSongs.filter(getSongsFilter(inputValue)));
      setValidInput(false);
    },

    onStateChange(changes) {
      if (changes.selectedItem) {
        setValidInput(true);
      }
    },
    id: "SONG-CHOOSE",
    items: songs,
  });

  return (
    <div className="relative mb-4">
      <div className="flex flex-col gap-1">
        <label className="mb-1 text-center" {...getLabelProps()}>
          This sounds like...
        </label>
        <div
          className="flex shadow-sm bg-transparent opacity-100 border gap-0.5"
          {...getComboboxProps()}
        >
          <input
            name="song"
            placeholder="Song name"
            className="w-full p-1.5 bg-transparent"
            {...getInputProps()}
          />
          <button
            aria-label="toggle menu"
            className="px-2"
            type="button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </div>
      <ul
        {...getMenuProps()}
        className="absolute w-full p-0 overflow-y-auto bg-white shadow-md max-h-80"
      >
        {isOpen &&
          songs.map((item, index) => (
            <li
              className={`
                ${highlightedIndex === index ? "bg-emerald-200" : ""}
                ${selectedItem === item ? "font-bold" : ""}
                py-2 px-3 shadow-sm text-black`}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(Combobox);
