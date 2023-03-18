import Image from "next/image";
import React from "react";
import { Game_Song } from "../../shared/schemas";

export default function SongSnippet({
  song,
  failAmount,
}: {
  song: Game_Song;
  failAmount: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-4 m-2 w-fit">
      <h3 className="">
        You guessed the song in <span className="font-bold">{failAmount} </span>
        {failAmount === 1 ? "attempt" : "attempts"}
      </h3>
      <a
        href={`https://www.youtube.com/watch?v=${song.id}`}
        className="w-full sm:bg-blue-500"
      >
        <div className="grid w-full  sm:grid-cols-6 gap-2 min-h-[100px]">
          <div className="w-full min-w-[100px]">
            <Image
              unoptimized
              layout="responsive"
              width={"544"}
              height={"544"}
              referrerPolicy={"no-referrer"}
              src={song.album.thumbnail}
              alt=""
            />
          </div>
          <div className="col-start-2 p-2 col-span-full sm:col-end-5">
            <h2 className="text-xl font-bold">{song.title}</h2>
            <p>{song.album.name}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
