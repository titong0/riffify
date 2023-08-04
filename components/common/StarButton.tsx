import React, { useState } from "react";
import {
  getFavorites,
  removeFromFavorites,
  saveToFavorites,
} from "../../storageUtils";
import { LocStorage_Favorite } from "../../shared/schemas";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

const StarButton = ({ artist }: { artist: LocStorage_Favorite }) => {
  const [isStarred, setIsStarred] = React.useState(false);
  console.log(isStarred);
  const addToFavorites = () => {
    saveToFavorites(artist);
    setIsStarred(true);
  };
  const removeFavorite = () => {
    removeFromFavorites(artist.id);
    setIsStarred(false);
  };

  React.useEffect(() => {
    const favorites = getFavorites() || [];
    const found = favorites.findIndex((fav) => fav.id === artist.id);
    console.log(found);
    setIsStarred(found !== -1);
  }, [artist.id]);

  if (!isStarred) {
    return (
      <button onClick={() => addToFavorites()}>
        <AiOutlineStar size={25} />
      </button>
    );
  }
  return (
    <button onClick={() => removeFavorite()}>
      <AiTwotoneStar size={25} />
    </button>
  );
};

export default StarButton;
