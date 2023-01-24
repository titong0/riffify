import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import CTA from "./CTA";

const Search = () => {
  return (
    <Tabs.Root
      defaultValue="Artist"
      className="text-gray-900 bg-gray-100 border border-black dark:bg-gray-300"
    >
      <Tabs.List className="flex justify-around bg-gray-200 border-blue">
        {["Artist", "Playlist"].map((mode, idx) => (
          <Tabs.Trigger
            key={mode}
            value={mode}
            className="w-full p-1 transition border-b border-black hover:bg-emerald-300 rdx-state-active:underline rdx-state-active:border-b-2 rdx-state-inactive:text-gray-600"
          >
            {mode}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <InputBar />
    </Tabs.Root>
  );
};

const InputBar = () => {
  const Router = useRouter();

  return (
    <>
      <Tabs.Content
        value="Artist"
        className="flex flex-col gap-2 m-2 rdx-state-inactive:hidden"
      >
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            const artist = new FormData(e.target).get("artist");
            Router.push(`search/${artist!}`);
          }}
        >
          <label className="" htmlFor="artist">
            Type your artist&apos;s name
          </label>
          <input
            placeholder="Luis Alberto Spinneta"
            name="artist"
            className="w-full h-16 p-1 mb-2 border-black rounded-sm bg-emerald-300 focus:border"
            minLength={1}
            required
            type="text"
          />
          <CTA>Search</CTA>
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
