import React from "react";

function addToFavorites(): void {
  throw new Error("Function not implemented.");
}
const StartButton = ({ artistId }: { artistId: string }) => {
  return <button onClick={() => addToFavorites()}>StartButton</button>;
};

export default StartButton;
