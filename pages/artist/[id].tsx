import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import Game from "../../components/Game";
import { getTodaySong } from "../../service";
import { TodayProps } from "../../types";
import { isToday, readFirstInArray } from "../../utils";
import { useEffect } from "react";
import { host } from "../../config";
import { useRouter } from "next/router";
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
      <BgImage url={artist.avatar[0].url} />

      {!isUpdated && (
        <div>
          You are the first person to play this artist today! sorry, we will
          reload the page as soon as it is updated
        </div>
      )}
      <h1 className="my-4 text-lg text-center">{artist.name} heardle</h1>
      <Game song={song} allSongs={allSongs} artistId={id} />
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
