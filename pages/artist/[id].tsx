import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import GameWrapper from "../../components/Game-thingies/GameWrapper";
import { getTodaySong } from "../../service";
import { TodayProps } from "../../types";
import { isToday, readFirstInArray } from "../../utils";
import { host } from "../../config";
import BgImage from "../../components/BgImage";

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
    if (isUpdated) return;
    fetch(`${host}/api/revalidate?id=${id}`).then((i) => {
      if (i.ok) {
        setTimeout(() => {
          Router.reload();
        }, 3000);
      }
    });
  }, []);

  return (
    <>
      <Head>
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
      />
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
  const id = readFirstInArray(ctx.params?.id);

  if (!id) return { notFound: true, props: {} };

  const today = await getTodaySong(id);
  if ("error" in today) {
    return { notFound: true, props: {} };
  }

  console.log("GENERATED PAGE FOR: ", today.artist.name);
  return {
    props: {
      song: today.song,
      allSongs: today.allSongs,
      artist: today.artist,
      id: id,
      generatedAt: new Date().toString(),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: ["/artist/UCRY5dYsbIN5TylSbd7gVnZg"], fallback: "blocking" };
};
