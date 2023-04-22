import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { randomWithMax } from "../utils";
import CTA from "./common/CTA";

const Search = () => {
  return (
    <Tabs.Root
      defaultValue="Artist"
      className="text-gray-900 bg-gray-900 border-black shadow-sm dark:text-gray-100 "
    >
      <Tabs.List className="flex justify-around border-blue">
        {["Artist", "Playlist"].map((mode, idx) => (
          <Tabs.Trigger
            key={mode}
            value={mode}
            className={`w-full p-2 transition bg-gray-200 border-b 
            border-black dark:bg-slate-700 dark:text-gray-200 
            rdx-state-active:underline rdx-h rdx-state-active:border-b-2 
            rdx-state-inactive:text-gray-300 rdx-state-inactive:bg-slate-500
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
];
const InputBar = () => {
  const Router = useRouter();

  return (
    <>
      <Tabs.Content
        value="Artist"
        className="p-1 m-2 rdx-state-inactive:hidden"
      >
        <form
          className="flex flex-col gap-2"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const artist = new FormData(e.target as HTMLFormElement).get(
              "artist"
            );
            Router.push(`search/${artist!}`);
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
      </Tabs.Content>
      <Tabs.Content
        value="Playlist"
        className="p-1 m-2 rdx-state-inactive:hidden"
      >
        <form className="flex flex-col gap-2" onSubmit={() => null}>
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
      </Tabs.Content>
    </>
  );
};

export default Search;
