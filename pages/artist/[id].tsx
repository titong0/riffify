import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import GameWrapper from "../../components/Game-thingies/GameWrapper";
import { isToday } from "../../utils";
import { ArtistIdSchema, Page_ArtistGameProps } from "../../shared/schemas";
import { getToday } from "../../server/getTodaySong";
import { host } from "../../config";

type ArtistProps = InferGetStaticPropsType<typeof getStaticProps>;

const Artist: React.FC<ArtistProps> = ({
  song,
  allSongs,
  artist,
  generatedAt,
}) => {
  useEffect(() => {
    const serializedArtist = JSON.stringify(artist);
    fetch(`${host}/api/trackArtist`, {
      method: "POST",
      body: serializedArtist,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [artist]);

  return (
    <>
      <Head>
        <title>{`${artist.name} heardle`}</title>
      </Head>

      <h1 className="text-2xl text-center py-7">{artist.name} heardle</h1>
      {/* <BgImage url={artist.avatar[0].url} /> */}
      <GameWrapper allSongs={allSongs} artist={artist} song={song} />
      {/* Might use this in the future */}
      {/* <section className="flex justify-center bg-zinc-100 dark:bg-gray-900">
        <pre className="p-2 whitespace-pre-wrap max-w-prose">
          {artist.description || null}
        </pre>
      </section> */}
    </>
  );
};

export default Artist;

export const getStaticProps: GetStaticProps<Page_ArtistGameProps> = async (
  ctx
) => {
  const parsed = ArtistIdSchema.safeParse(ctx.params!.id);
  if (!parsed.success) return { notFound: true };
  const id = parsed.data;

  try {
    const now = new Date();
    console.log(`---------------------------
    FETCHING ARTIST:....`);
    const today = await getToday(id, true);

    console.log(
      `FINISHED FETCHING FETCHING ARTIST:.... ${
        new Date().getMilliseconds() - now.getMilliseconds()
      }ms`
    );

    return {
      props: {
        song: today.song,
        allSongs: today.allSongs,
        artist: today.artist,
        removed: today.removed,
        generatedAt: new Date().toString(),
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: `/no-grid?from=${id}`,
        statusCode: 301,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
