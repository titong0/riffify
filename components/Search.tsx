import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { randomWithMax } from "../utils";
import CTA from "./CTA";

const Search = () => {
  return (
    <Tabs.Root
      defaultValue="Artist"
      className="text-gray-900 bg-gray-900 border border-black dark:text-gray-100 "
    >
      <Tabs.List className="flex justify-around border-blue">
        {["Artist", "Playlist"].map((mode, idx) => (
          <Tabs.Trigger
            key={mode}
            value={mode}
            className="w-full p-2 transition bg-gray-200 border-b border-black dark:bg-slate-700 dark:text-gray-200 rdx-state-active:underline rdx-h rdx-state-active:border-b-2 rdx-state-inactive:text-gray-300 rdx-state-inactive:bg-slate-500"
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
          onSubmit={(e: any) => {
            e.preventDefault();
            const artist = new FormData(e.target).get("artist");
            Router.push(`search/${artist!}`);
          }}
        >
          <div>
            <label className="" htmlFor="artist">
              Type your artist&apos;s name
            </label>
            <input
              placeholder={
                PLACEHOLDER_POSSIBILITIES[
                  randomWithMax(PLACEHOLDER_POSSIBILITIES.length)
                ]
              }
              name="artist"
              className="w-full p-3 my-2 border-black rounded-sm bg-slate-300 dark:bg-gray-600 focus:border dark:text-gray-300"
              minLength={1}
              required
              type="text"
            />
          </div>
          <CTA className="p-2 px-6">Search </CTA>
        </form>
      </Tabs.Content>
      <Tabs.Content
        value="Playlist"
        className="flex flex-col gap-2 m-2 rdx-state-inactive:hidden"
      >
        <label className="" htmlFor="playlist">
          Type your playlist&apos;s url
        </label>
        <input
          name="playlist"
          className="w-full p-1 mb-2 border-black rounded-sm bg-emerald-300"
          type="text"
          placeholder="https://www.youtube.com/watch?v=Rlf8KP4ZikM&list=PLKmth_ELXsKjXeutQqFz7LgWUiVxw_dFy"
        />
        <Link href="/feature-not-done" passHref>
          <CTA>Go to playlist</CTA>
        </Link>
      </Tabs.Content>
    </>
  );
};

export default Search;
