import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import ChannelItem from "../../components/ChannelItem";
import { getArtistsQuery } from "../../service";
import { ArtistFromSearch } from "../../types";
import { readFirstInArray } from "../../utils";

type pageProps = InferGetStaticPropsType<typeof getStaticProps>;

const SearchResults = ({ results, artist }: pageProps) => {
  if (results === null) return <div>No results for that artist</div>;

  return (
    <>
      <Head>
        <title>{`Search results for ${artist}`}</title>
      </Head>

      <div className="w-full flex justify-center">
        <div className="max-w-2xl w-full">
          <h2 className="my-8 text-center textl-xl font-bold font-sans">
            Results for: {artist}
          </h2>
          {results.map((channel, idx) => (
            <ChannelItem
              idx={idx}
              key={channel.id}
              name={channel.name}
              id={channel.id}
              thumbnails={channel.thumbnails}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResults;

export const getStaticProps: GetStaticProps<{
  results: ArtistFromSearch[] | null;
  artist: string | null;
}> = async (ctx) => {
  const artist = readFirstInArray(ctx.params?.artist);

  if (!artist) return { props: { results: null, artist: null } };

  try {
    const results = await getArtistsQuery(artist);
    return { props: { results, artist } };
  } catch (error) {
    return {
      redirect: { destination: "/server-down" },
      props: { results: null, artist: null },
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: ["/search/kanye"], fallback: "blocking" };
};
