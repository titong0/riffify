import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import { z } from "zod/lib";
import ChannelItem from "../../components/ChannelItem";
import { getArtistsQuery } from "../../service";
import {
  ArtistSearchResultSchema,
  ArtistSearchSchema,
} from "../../shared/schemas";
import { ArtistSearch } from "../../server/search";

type pageProps = InferGetStaticPropsType<typeof getStaticProps>;

const SearchResults = ({ results, artist }: pageProps) => {
  if (results === null) return <div>No results for that artist</div>;
  if (typeof results === "string") return <pre>{results}</pre>;
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
          <div className="animate-[fade-in_1s_ease-in]">
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
      </div>
    </>
  );
};

export default SearchResults;

export const getStaticProps: GetStaticProps<{
  results: Awaited<ReturnType<typeof ArtistSearch> | string>;
  artist: string;
}> = async (ctx) => {
  const parsed = ArtistSearchSchema.safeParse(ctx.params!.artist);

  if (!parsed.success) return { notFound: true };

  const artist = parsed.data;

  try {
    const results = await ArtistSearch(artist);
    return { props: { results, artist } };
  } catch (error) {
    return {
      redirect: { destination: "/server-down", permanent: false },
      // props: {},
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
