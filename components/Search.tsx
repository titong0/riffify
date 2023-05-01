import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { NextRouter, Router, useRouter } from "next/router";
import { randomWithMax } from "../utils";
import CTA from "./common/CTA";
import * as React from "react";
import { useState, useEffect } from "react";
import { Artist } from "../shared/schemas";
import { getRecentlyPlayed } from "../storageUtils";
import ChannelItem from "./ChannelItem";
import Image from "next/image";

const Search = () => {
  return (
    <Tabs.Root
      defaultValue="Artist"
      className="text-gray-900 bg-gray-900 border-black shadow-sm dark:text-gray-100 "
    >
      <Tabs.List className="flex justify-around border-blue">
        {["Artist", "Playlist", "Recent"].map((mode, idx) => (
          <Tabs.Trigger
            key={mode}
            value={mode}
            className={`w-full p-2 transition bg-gray-200 border-b 
            border-black dark:bg-slate-700 dark:text-gray-200 
            border-l-2 first:border-l-0
            rdx-state-active:underline rdx-h rdx-state-active:border-b-2 
            dark:rdx-state-inactive:opacity-80
            dark:rdx-state-inactive:hover:bg-slate-600 rdx-state-active:cursor-default`}
          >
            {mode}
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
        value="Artist"
        className="p-1 m-2 rdx-state-inactive:hidden"
      >
        <ArtistForm Router={Router} />
      </Tabs.Content>
      <Tabs.Content
        value="Playlist"
        className="p-1 m-2 rdx-state-inactive:hidden"
      >
        <PlaylistForm />
      </Tabs.Content>
      <Tabs.Content value="Recent">
        <RecentForm recentlyPlayed={recentlyPlayed} />
      </Tabs.Content>
    </>
  );
};

function ArtistForm({ Router }: { Router: NextRouter }) {
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

function PlaylistForm() {
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

function RecentForm({ recentlyPlayed }: { recentlyPlayed: Artist[] }) {
  if (!recentlyPlayed.length)
    return (
      <div className="flex items-center justify-center h-40">
        You haven&apos;t played any heardles recently.
      </div>
    );
  return (
    <div className="flex flex-col pt-2 overflow-y-scroll min-h-40 max-h-64">
      {recentlyPlayed.map((artist) => {
        return (
          <Link
            key={artist.id}
            href={`/artist/${encodeURIComponent(artist.id)}`}
            passHref
          >
            {" "}
            <div className="flex items-center p-2 border-b border-current hover:bg-gray-200 dark:hover:bg-gray-800">
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
