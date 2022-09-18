import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import React from "react";
import Game from "../../components/Game";
import { getTodaySong } from "../../service";
import { TodayProps } from "../../types";
import { readFirstInArray } from "../../utils";
import { useEffect } from "react";
import { host } from "../../config";

const isToday = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const Artist = ({
  song,
  allSongs,
  artist,
  id,
  generatedAt,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const isUpdated = isToday(new Date(), new Date(generatedAt));
  console.log("generated at");
  console.log(generatedAt);
  useEffect(() => {
    if (isUpdated) return;
    fetch(`${host}/api/revalidate?id=${id}`);
  }, []);
  return (
    <>
      <Head>
        <title>{`${artist} heardle`}</title>
      </Head>
      <h1 className="my-4 text-lg text-center">{artist} heardle</h1>
      <Game song={song} allSongs={allSongs} />
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

  console.log("GENERATED PAGE FOR: ", today.artist);

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
