import React from "react";

const StartButton = ({ artistId }: { artistId: string }) => {
  return <button onClick={() => addToFavorites()}>StartButton</button>;
};

export default StartButton;
