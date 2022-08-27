import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import ChannelItem from "../components/ChannelItem";
import { getArtistsQuery } from "../service";
import { ArtistFromSearch } from "../types";
import { readFirstInQuery } from "../utils";

type pageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const SearchResults = ({ results, artist }: pageProps) => {
  if (results === null) return <div>No results for that artist</div>;
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-2xl w-full">
        <h2 className="my-8 text-center textl-xl font-bold font-sans">
          Results for your search: {artist}
        </h2>
        {results.map((channel) => (
          <ChannelItem
            name={channel.name}
            id={channel.id}
            thumbnails={channel.thumbnails}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

export const getServerSideProps: GetServerSideProps<{
  results: ArtistFromSearch[] | null;
  artist: string | null;
}> = async (ctx) => {
  let artist = ctx.query.artist;
  if (!artist) return { props: { results: null, artist: null } };

  artist = readFirstInQuery(artist);
  try {
    const results = await getArtistsQuery(artist);

    return { props: { results, artist } };
  } catch (error) {
    return {
      redirect: { destination: "/server-down" },
      props: { results: null, artist: "" },
    };
  }
};
