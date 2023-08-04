import React, { useState } from "react";
import { LocStorage_Favorite } from "../../shared/schemas";
import HeardleBubble from "./HeardleBubble";
import { getFavorites } from "../../storageUtils";

const MOCK_FAVORITES: LocStorage_Favorite[] = [
  {
    id: "UCZ8jDJbq6U5EWShHSDhmKvQ",
    name: "Acru",
    thumbnail:
      "https://lh3.googleusercontent.com/IWZv3Ue57AGhsKae-UmTQjTmlrFzlfRXgC4wR2-k5q5Zqziwd69Nant8_wbkWZCP4BviSGs4SzDCdXoy=w2880-h1200-p-l90-rj",
  },
  {
    id: "UCRY5dYsbIN5TylSbd7gVnZg",
    name: "Kanye",
    thumbnail:
      "https://lh3.googleusercontent.com/IFlc3sf6sHV3TAZ_5vhyHQiKb9D4AdSlDkiTSgsRiicnzLASXwVr1n22EEg6Vtd2XBlyJslm8xlYiA=w2880-h1200-p-l90-rj",
  },
  {
    id: "dasdsaasdkldas",
    name: "Tueeo",
    thumbnail:
      "https://lh3.googleusercontent.com/IFlc3sf6sHV3TAZ_5vhyHQiKb9D4AdSlDkiTSgsRiicnzLASXwVr1n22EEg6Vtd2XBlyJslm8xlYiA=w2880-h1200-p-l90-rj",
  },
];

const FavoritesSlider = () => {
  const [favorites, setFavorites] = useState<LocStorage_Favorite[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const parentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const localFavorites = getFavorites();
    setFavorites(localFavorites || []);
  }, []);

  const scrollHorizontal = (direction: "left" | "right") => {
    if (!parentRef.current || !favorites) return;
    const nextIdx = direction === "right" ? currentIndex + 1 : currentIndex - 1;

    const itemWidth = parentRef.current.children[0].scrollWidth;
    const newLeft =
      direction === "right"
        ? parentRef.current.scrollLeft + itemWidth
        : parentRef.current.scrollLeft - itemWidth;

    parentRef.current.scrollTo({
      behavior: "smooth",
      left: newLeft,
    });
    setCurrentIndex(nextIdx);
  };

  if (!favorites.length) return null;
  return (
    <div>
      <h3 className="my-3 text-center text-1xl">Favorite heardles</h3>
      <div className="flex items-center w-full gap-4">
        <button
          className="w-12 p-3 transition bg-black border rounded-lg bg-opacity-30 disabled:bg-opacity-5"
          onClick={() => scrollHorizontal("left")}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <div
          className="flex w-full gap-4 overflow-x-hidden snap-x snap-mandatory"
          ref={parentRef}
        >
          {favorites.map((fav) => (
            <HeardleBubble data={fav} key={fav.id} />
          ))}
        </div>
        <button
          className="w-12 p-3 transition bg-black border rounded-lg bg-opacity-30 disabled:bg-opacity-5"
          onClick={() => scrollHorizontal("right")}
          disabled={currentIndex >= favorites.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FavoritesSlider;
