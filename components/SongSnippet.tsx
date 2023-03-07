import React from "react";
import { Game_Song } from "../shared/schemas";

export default function SongSnippet({
  song,
  failAmount,
}: {
  song: Game_Song;
  failAmount: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-4 m-2 border w-fit">
      <h3 className="">
        You guessed the song in <span className="font-bold">{failAmount} </span>
        {failAmount === 1 ? "attempt" : "attempts"}
      </h3>
      <p>{song.title}</p>
      <a href={`https://www.youtube.com/watch?v=${song.id}`} className="w-1/3">
        <img referrerPolicy={"no-referrer"} src={song.album.thumbnail} alt="" />
      </a>
    </div>
  );
}
