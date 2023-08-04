import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { NextRouter, Router, useRouter } from "next/router";
import { randomWithMax } from "../utils";
import CTA from "./common/CTA";
import React from "react";
import { useState, useEffect } from "react";
import { Artist } from "../shared/schemas";
import { getRecentlyPlayed } from "../storageUtils";
import { AiOutlineClockCircle } from "react-icons/ai";

const TABS = [
  { display: "Artist", value: "artist" },
  { display: "Playlist", value: "playlist" },
  {
    display: <AiOutlineClockCircle size={30} className="mx-auto" />,
    value: "recent",
  },
];

const Search = () => {
  return (
    <Tabs.Root
      defaultValue="artist"
      className="text-gray-900 bg-gray-900 border-black shadow-sm dark:text-gray-100 "
    >
      <Tabs.List className="flex justify-around border-blue">
        {TABS.map((tab, idx) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={`w-full p-2 transition bg-gray-200 border-b 
            border-black dark:bg-slate-700 dark:text-gray-200 
            border-l-2 first:border-l-0
            rdx-state-active:underline rdx-h rdx-state-active:border-b-2 
            dark:rdx-state-inactive:opacity-80
            dark:rdx-state-inactive:hover:bg-slate-600 rdx-state-active:cursor-default`}
          >
            {tab.display}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <InputBar />
    </Tabs.Root>
  );
};

const PLACEHOLDER_POSSIBILITIES = [
  "Sui generis",
  "Luis Alberto Spinneta",
  "Pescado Rabioso",
  "Artic Monkeys",
  "Kamada",
  "Frank Ocean",
  "Little Simz",
  "Tyler, The Creator",
  "YSY A",
  "MF DOOM",
  "Ms. Lauryn Hill",
  "Kanye West",
  "C. Tangana",
  "Kendrick Lamar",
  "Virus",
  "Queen",
  "Almendra",
  "Sodastereo",
  "Andre 3000",
  "Invisible",
  "Serú Girán",
];
const InputBar = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<Artist[]>([]);
  useEffect(() => {
    const recentArtists = getRecentlyPlayed();
    setRecentlyPlayed(recentArtists || []);
  }, []);

  const Router = useRouter();

  return (
    <>
      <Tabs.Content
        value="artist"
        className="p-1 m-2 rdx-state-inactive:hidden"
      >
        <ArtistTab Router={Router} />
      </Tabs.Content>

      <Tabs.Content
        value="playlist"
        className="p-1 m-2 rdx-state-inactive:hidden"
      >
        <PlaylistTab />
      </Tabs.Content>

      <Tabs.Content value="recent" className="rdx-state-inactive:hidden">
        <RecentTab recentlyPlayed={recentlyPlayed} />
      </Tabs.Content>
    </>
  );
};

function ArtistTab({ Router }: { Router: NextRouter }) {
  return (
    <form
      className="flex flex-col justify-around h-40"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const artist = new FormData(e.target as HTMLFormElement).get("artist");
        Router.push(`search/${encodeURIComponent(artist as string)}`);
      }}
    >
      <div>
        <label htmlFor="artist">Type your artist&apos;s name</label>
        <input
          placeholder={
            PLACEHOLDER_POSSIBILITIES[
              randomWithMax(PLACEHOLDER_POSSIBILITIES.length)
            ]
          }
          name="artist"
          className="w-full p-3 my-2 border border-transparent rounded-sm bg-slate-300 dark:bg-gray-600 focus:border-black dark:text-gray-300"
          minLength={1}
          required
          type="text"
        />
      </div>
      <CTA type="submit" className="p-2 px-6">
        Search{" "}
      </CTA>
    </form>
  );
}

function PlaylistTab() {
  return (
    <form
      className="flex flex-col justify-around h-40 gap-2"
      onSubmit={() => null}
    >
      <div>
        <label htmlFor="playlist">Type your playlist&apos;s url</label>
        <input
          name="playlist"
          className="w-full p-3 my-2 border-black rounded-sm bg-slate-300 dark:bg-gray-600 focus:border dark:text-gray-300"
          type="text"
          placeholder="https://www.youtube.com/watch?v=BPPQ1dLD1XQ&list=PL2C9E5715E925ADC9"
        />
      </div>
      <Link href="/feature-not-done" className="ml-auto" passHref>
        <CTA className="p-2 px-6">Go to playlist</CTA>
      </Link>
    </form>
  );
}

function RecentTab({
  recentlyPlayed,
}: {
  recentlyPlayed: Omit<Artist, "description">[];
}) {
  if (!recentlyPlayed.length)
    return (
      <div className="flex items-center justify-center h-40">
        You haven&apos;t played any heardles recently.
      </div>
    );
  return (
    <div className="flex flex-col min-h-[10rem] max-h-64 overflow-y-auto">
      {recentlyPlayed.map((artist) => {
        return (
          <Link
            className="border-b border-current last-of-type:border-b-0"
            key={artist.id}
            href={`/artist/${encodeURIComponent(artist.id)}`}
            passHref
          >
            {" "}
            <div className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artist.thumbnail}
                referrerPolicy={"no-referrer"}
                // width={60}
                // height={25}
                className="h-8 rounded-full"
                alt={artist.name}
              />
              <div className="items-center justify-between w-full mx-2 sm:flex">
                <span className="w-fit"> {artist.name}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Search;
