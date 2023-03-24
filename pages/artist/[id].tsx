import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import GameWrapper from "../../components/Game-thingies/GameWrapper";
import { isToday } from "../../utils";
import { Page_ArtistGameProps } from "../../shared/schemas";
import { getToday } from "../../server/getTodaySong";
import { host } from "../../config";
import { ArtistIdSchema } from "../../shared/libSchemas";

type ArtistProps = InferGetStaticPropsType<typeof getStaticProps>;

const Artist: React.FC<ArtistProps> = ({
  song,
  validSongs,
  artist,
  generatedAt,
}) => {
  return (
    <>
      <Head>
        <title>{`${artist.name} heardle`}</title>
      </Head>

      <h1 className="text-2xl text-center py-7">{artist.name} heardle</h1>
      {/* <BgImage url={artist.avatar[0].url} /> */}
      <GameWrapper validSongs={validSongs} artist={artist} song={song} />
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
        validSongs: today.validSongs,
        artist: today.artist,
        removed: today.removed,
        generatedAt: new Date().toString(),
      },
    };
  } catch (error) {
    if (error instanceof Error && error.cause === "no-grid") {
      return {
        redirect: {
          destination: `/no-grid?from=${id}`,
          statusCode: 301,
        },
      };
    } else {
      console.error(error);
      return { notFound: true };
    }
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
