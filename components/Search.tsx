import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import CTA from "./CTA";

const Search = () => {
  return (
    <Tabs.Root
      defaultValue="Artist"
      className="border border-black bg-gray-100 dark:bg-gray-300 text-gray-900"
    >
      <Tabs.List className="flex justify-around border-blue bg-gray-200">
        {["Artist", "Playlist"].map((mode, idx) => (
          <Tabs.Trigger
            key={mode}
            value={mode}
            className="p-1 w-full transition hover:bg-emerald-300 
            rdx-state-active:underline
            rdx-state-active:border-b-2
            border-b
            rdx-state-inactive:text-gray-600
            border-black"
          >
            {mode}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <form action="/results">
        <InputBar />
      </form>
    </Tabs.Root>
  );
};

const InputBar = () => {
  return (
    <>
      <Tabs.Content
        value="Artist"
        className="flex flex-col m-2 gap-2 rdx-state-inactive:hidden"
      >
        <label className="" htmlFor="artist">
          Type your artist's name
        </label>
        <input
          placeholder="Kanye west"
          name="artist"
          className="bg-emerald-300 w-full p-1 mb-2 h-16 rounded-sm border-black focus:border"
          minLength={1}
          required
          type="text"
        />
        <CTA>Search</CTA>
      </Tabs.Content>
      <Tabs.Content
        value="Playlist"
        className="flex flex-col m-2 gap-2 rdx-state-inactive:hidden"
      >
        <label className="" htmlFor="playlist">
          Type your playlist's url
        </label>
        <input
          name="playlist"
          className="bg-emerald-300 p-1 mb-2 rounded-sm border-black w-full"
          type="text"
          placeholder="https://www.youtube.com/watch?v=Rlf8KP4ZikM&list=PLKmth_ELXsKjXeutQqFz7LgWUiVxw_dFy"
        />
        <Link href="/feature-not-done" passHref>
          <a>
            <CTA>Go to playlist</CTA>
          </a>
        </Link>
      </Tabs.Content>
    </>
  );
};

export default Search;
