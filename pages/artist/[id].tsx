import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import GameWrapper from "../../components/Game-thingies/GameWrapper";
import { Page_ArtistGameProps } from "../../shared/schemas";
import { getToday } from "../../server/getTodaySong";
import { ArtistIdSchema } from "../../shared/libSchemas";
import { isToday } from "../../utils";
import HeardleBeingUpdated from "../../components/common/HeardleBeingUpdated";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import { timeToSeconds } from "youtubei.js/dist/src/utils/Utils";
import SearchBar from "../../components/common/SearchBar";

type ArtistProps = InferGetStaticPropsType<typeof getStaticProps>;

const Artist: React.FC<ArtistProps> = ({
  song,
  validSongs,
  artist,
  generatedAt,
}) => {
  if (!isToday(new Date(generatedAt))) {
    return <HeardleBeingUpdated artistId={artist.id} />;
  }
  return (
    <>
      <Head>
        <title>{`${artist.name} heardle`}</title>
        <meta name="description" content={`Play heardle for ${artist.name}`} />
      </Head>
      <SearchBar artistName={artist.name} /> heardle
      {/* <BgImage url={artist.avatar[0].url} /> */}
      <GameWrapper validSongs={validSongs} artist={artist} song={song} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Page_ArtistGameProps> = async (
  ctx
) => {
  const parsed = ArtistIdSchema.safeParse(ctx.params?.id);
  if (!parsed.success) return { notFound: true };
  const id = parsed.data;

  try {
    const now = new Date();
    console.log("---------------------\nFETCHING ARTIST:....");
    const today = await getToday(id, true);

    const timeItTook = new Date().getMilliseconds() - now.getMilliseconds();
    console.log(`finished FETCHING ARTIST: ${timeItTook}ms `);

    return {
      props: {
        song: today.song,
        validSongs: today.validSongs,
        artist: today.artist,
        removed: today.removed,
        generatedAt: new Date().toString(),
      },
    };
  } catch (error) {
    const comingFrom = encodeURIComponent(`artist/${id}`);

    if (error instanceof Error && error.cause === "no-grid") {
      return {
        redirect: {
          destination: `/no-grid?from=${id}`,
          statusCode: 301,
        },
      };
    }

    console.error(`Error generating page at /artist/${id}:` + error);
    const encoded = JSON.stringify(error);
    const encodedErr = encodeURIComponent(encoded);
    return {
      redirect: {
        destination: `/server-error?error=${encodedErr}&from=${comingFrom}`,
        permanent: false,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default Artist;
