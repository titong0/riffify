import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import GameWrapper from "../../components/Game-thingies/GameWrapper";
import { Artist, Page_ArtistGameProps } from "../../shared/schemas";
import { getToday } from "../../server/getTodaySong";
import { ArtistIdSchema } from "../../shared/libSchemas";
import { isToday } from "../../utils";
import HeardleBeingUpdated from "../../components/common/HeardleBeingUpdated";
import SearchBar from "../../components/common/SearchBar";
import { addToUpdatedToday } from "../api/revalidate";
import BgImage from "../../components/common/BgImage";
import { host } from "../../config";
import { validateHeardle } from "../../server/createHeardle";

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
        meta
        <OgThings artist={artist} />
      </Head>
      <div className="flex items-center justify-center w-full text-2xl">
        <SearchBar artistName={artist.name} /> heardle
        {/* <OgThings artist={artist} /> */}
      </div>
      <BgImage url={artist.thumbnail} />
      <GameWrapper validSongs={validSongs} artist={artist} song={song} />
    </>
  );
};

const OgThings = ({ artist }: { artist: Artist }) => {
  const url = new URL(`${host}/api/ogGenerator`);
  url.searchParams.append("name", artist.name);
  url.searchParams.append("thumbnail", artist.thumbnail);
  url.searchParams.append("id", artist.id);
  // console.log(url.href);
  return (
    <>
      <meta property="og:image" content={url.href} />
      <meta
        property="og:title"
        content={`Play heardle for ${artist.name}`}
      ></meta>
      <meta
        property="og:description"
        content={`Link to play a heardle for ${artist.name}`}
      />
      <meta property="og:url" content={`${host}/artist/${artist.id}`} />
      <meta property="twitter:image" content={url.href} />
      <meta property="twitter:card" content={url.href} />
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

    addToUpdatedToday(id);

    return {
      props: {
        song: today.song,
        validSongs: today.validSongs,
        artist: today.artist,
        // removed: today.removed,
        generatedAt: new Date().toString(),
      },
    };
  } catch (error) {
    const isValid = await validateHeardle(id);
    const comingFrom = encodeURIComponent(`/artist/${id}`);

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
