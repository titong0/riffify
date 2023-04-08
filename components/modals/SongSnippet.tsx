import Image from "next/image";
import React from "react";
import { Game_Song } from "../../shared/schemas";
import Player from "../Game-thingies/Player";

export default function SongSnippet({
  song,
  title,
}: {
  song: Game_Song;
  title: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center w-full gap-2 py-4 m-2">
      <h3 className="">{title}</h3>
      <a
        href={`https://www.youtube.com/watch?v=${song.id}`}
        className="w-full p-1 xs:bg-neutral-800"
      >
        <div className="flex w-full  gap-2 min-h-[100px]">
          <div className="relative">
            <Image
              className="rounded-md"
              unoptimized
              width={"150"}
              height={"150"}
              referrerPolicy={"no-referrer"}
              src={song.album.thumbnail}
              alt=""
            />
            <div className="absolute px-1 text-sm rounded-sm bg-neutral-800 bottom-2 right-1">
              {song.duration}
            </div>
          </div>
          <div className="col-start-2 p-2 col-span-full sm:col-end-5">
            <h2 className="text-xl font-bold">{song.title}</h2>
            <p>{song.album.name}</p>
          </div>
        </div>
      </a>
      <Player
        attemptCount={5}
        disableLimit={true}
        id={song.id}
        startsAt={song.startAt}
        secondsLimit={16}
      />
    </div>
  );
}
