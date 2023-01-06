import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import GameWrapper from "../../components/GameWrapper";
import { getTodaySong } from "../../service";
import { TodayProps } from "../../types";
import { isToday, readFirstInArray } from "../../utils";
import { host } from "../../config";
import BgImage from "../../components/BgImage";
import { getAllSongs } from "../../server/getAllSongs";
import { idSchema } from "../../shared/schemas";

const Artist = ({
  song,
  allSongs,
  artist,
  id,
  generatedAt,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isUpdated = isToday(new Date(generatedAt));
  const Router = useRouter();

  useEffect(() => {
    // if (isUpdated) return;
    // fetch(`${host}/api/revalidate?id=${id}`).then((i) => {
    //   if (i.ok) {
    //     setTimeout(() => {
    //       Router.reload();
    //     }, 3000);
    //   }
    // });
  }, []);

  return (
    <>
      {/* <Head>
        <title>{`${artist.name} heardle`}</title>
      </Head>
      {!isUpdated && (
        <div>
          You are the first person to play this artist today! sorry, we will
          reload the page as soon as it is updated
        </div>
      )}
      <h1 className="py-7 text-2xl text-center">{artist.name} heardle</h1>{" "}
      <BgImage url={artist.avatar[0].url} />
      <GameWrapper
        allSongs={allSongs}
        artist={artist}
        artistId={id}
        song={song}
      /> */}
      {/* Might use this in the future */}
      {/* <section className="flex justify-center bg-zinc-100 dark:bg-gray-900">
        <pre className="p-2 max-w-prose whitespace-pre-wrap">
          {artist.description || null}
        </pre>
      </section> */}
    </>
  );
};

export default Artist;

export const getStaticProps: GetStaticProps<TodayProps> = async (ctx) => {
  const parsed = idSchema.safeParse(ctx.params!.id);
  if (!parsed.success) return { notFound: true };

  const today = await getAllSongs(parsed.data);

  return {
    props: {
      // song: today.song,
      // allSongs: today.allSongs,
      // artist: today.artist,
      // id: idSchema,
      // generatedAt: new Date().toString(),
    },
  } as any;
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
