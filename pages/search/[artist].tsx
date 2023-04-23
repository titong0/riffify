import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import React from "react";
import { z } from "zod";
import ChannelItem from "../../components/ChannelItem";
import { ArtistSearch } from "../../server/search";
import { ArtistSearchReturn } from "../../shared/schemas";
import BackButton from "../../components/common/BackButton";
import SearchBar from "../../components/common/SearchBar";

type pageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const SearchResults = ({ results, artist }: pageProps) => {
  if (results === null)
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center w-full max-w-2xl">
          <h2 className="my-8 font-sans font-bold text-center textl-xl">
            <span className="text-red-500">No results</span> for {artist}
          </h2>
          <BackButton />
        </div>
      </div>
    );

  if (typeof results === "string") return <pre>{results}</pre>;
  return (
    <>
      <Head>
        <title>{`Search results for ${artist}`}</title>
        <meta name="description" content={`Search results for ${artist}`} />
      </Head>

      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full max-w-2xl">
          <h2 className="flex items-center justify-center gap-2 my-2 font-bold text-center textl-xl">
            Results for: <SearchBar artistName={artist} />
          </h2>
          <div className="animate-[fade-in_1s_ease-in]">
            {results.map((channel, idx) => (
              <ChannelItem
                shouldPrefetch={idx < 3 ? undefined : false}
                key={channel.id}
                name={channel.name}
                id={channel.id}
                thumbnail={channel.thumbnail}
                suscribers={channel.suscribers}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;

export const getServerSideProps: GetServerSideProps<{
  results: ArtistSearchReturn;
  artist: string;
}> = async (ctx) => {
  const parsedQuery = z.string().min(1).safeParse(ctx.params!.artist);
  if (!parsedQuery.success) return { notFound: true };

  const artist = parsedQuery.data;
  try {
    const results = await ArtistSearch(artist);
    return { props: { results, artist } };
  } catch (error: any) {
    console.error(error);
    const encoded = JSON.stringify(error);
    const comingFrom = encodeURIComponent(`/search/${parsedQuery.data}`);
    const encodedErr = encodeURIComponent(encoded);
    return {
      redirect: {
        destination: `/server-error?error=${encodedErr}&from=${comingFrom}`,
        permanent: false,
      },
    };
  }
};

// export const getStaticPaths: GetStaticPaths = () => {
//   return { paths: [], fallback: "blocking" };
// };
