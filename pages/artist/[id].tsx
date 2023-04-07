import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import GameWrapper from "../../components/Game-thingies/GameWrapper";
import { Page_ArtistGameProps } from "../../shared/schemas";
import { getToday } from "../../server/getTodaySong";
import { ArtistIdSchema } from "../../shared/libSchemas";
import { isToday } from "../../utils";
import HeardleBeingUpdated from "../../components/common/HeardleBeingUpdated";

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
      console.error(`Error generating page at /artist/${id}:` + error);
      return { notFound: true };
    }
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
