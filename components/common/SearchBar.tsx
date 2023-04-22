import { useRouter } from "next/router";
import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ artistName }: { artistName: string }) => {
  const [showInput, setShowInput] = React.useState(false);
  const Router = useRouter();
  const navigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const artist = new FormData(e.target as HTMLFormElement).get("searchValue");
    console.log(Router.route);
    Router.push(`/search/${artist!}`);
  };
  return (
    <div className="inline font-mono text-center py-7">
      {showInput ? (
        <form className="flex ml-auto itew-64" onSubmit={navigate}>
          <input
            autoFocus
            name="searchValue"
            className="p-1 my-2 mr-2 transition rounded-sm bg-opacity-10 bg-slate-300 dark:bg-slate-900 focus:border dark:text-gray-300 animate-weigthen"
            type="text"
          />
        </form>
      ) : (
        <button
          onClick={() => setShowInput((prevShowInput) => !prevShowInput)}
          className="flex items-center justify-between px-2 mr-2 border-2 py bg-opacity-60 bg-slate-900"
        >
          {artistName}
          <BsSearch className="ml-2" size={15} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
