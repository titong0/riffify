import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import { z } from "zod";
import ChannelItem from "../../components/ChannelItem";
import { ArtistSearch } from "../../server/search";
import { SearchQuerySchema } from "../../shared/schemas";

type pageProps = InferGetStaticPropsType<typeof getStaticProps>;

const SearchResults = ({ results, artist }: pageProps) => {
  if (results === null) return <div>No results for that artist</div>;
  if (typeof results === "string") return <pre>{results}</pre>;
  return (
    <>
      <Head>
        <title>{`Search results for ${artist}`}</title>
      </Head>

      <div className="flex justify-center w-full">
        <div className="w-full max-w-2xl">
          <h2 className="my-8 font-sans font-bold text-center textl-xl">
            Results for: {artist}
          </h2>
          <div className="animate-[fade-in_1s_ease-in]">
            {results.map((channel, idx) => (
              <ChannelItem
                shouldPrefetch={idx < 3 ? undefined : false}
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
  const notEmptyQuery = z.string().min(1).safeParse(ctx.params!.artist);

  if (!notEmptyQuery.success) return { notFound: true };
  const artist = notEmptyQuery.data;

  try {
    const results = await ArtistSearch(artist);
    return { props: { results, artist } };
  } catch (error) {
    console.log(error);
    return {
      redirect: { destination: "/server-down", permanent: false },
      // props: {},
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
