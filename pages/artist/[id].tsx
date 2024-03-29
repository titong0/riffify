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
import BgImage from "../../components/common/BgImage";
import { host } from "../../config";

type ArtistProps = InferGetStaticPropsType<typeof getStaticProps>;

const Artist: React.FC<ArtistProps> = ({
  song,
  validSongs,
  artist,
  generatedAt,
}) => {
  if (!isToday(new Date(generatedAt))) {
    return (
      <HeardleBeingUpdated
        artistId={artist.id}
        songAmount={validSongs.length}
      />
    );
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

function getSecondsToTomorrow() {
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const diff = tomorrow.getTime() - now.getTime(); // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}

export const getStaticProps: GetStaticProps<Page_ArtistGameProps> = async (
  ctx
) => {
  const parsed = ArtistIdSchema.safeParse(ctx.params?.id);
  if (!parsed.success) return { notFound: true };
  const id = parsed.data;

  try {
    const now = new Date();
    console.log("---------------------FETCHING ARTIST:....");
    const today = await getToday(id, true);

    const timeItTook = new Date().getMilliseconds() - now.getMilliseconds();
    console.log(`finished FETCHING ARTIST: ${timeItTook}ms `);

    return {
      props: {
        song: today.song,
        validSongs: today.validSongs,
        artist: today.artist,
        generatedAt: new Date().toString(),
      },
      revalidate: getSecondsToTomorrow(),
    };
  } catch (error) {
    const comingFrom = encodeURIComponent(`/artist/${id}`);

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
