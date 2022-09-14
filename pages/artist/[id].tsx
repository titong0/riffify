import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import React from "react";
import { BsCheckLg } from "react-icons/bs";
import Game from "../../components/Game";
import { getTodaySong } from "../../service";
import { ReqError, TodayRes } from "../../types";
import { readFirstInArray } from "../../utils";

const Artist = ({
  song,
  allSongs,
  artist,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{`${artist} heardle`}</title>
      </Head>
      <h1 className="my-4 text-lg text-center">{artist} heardle</h1>
      <Game artist={artist} song={song} allSongs={allSongs} />
    </>
  );
};

export default Artist;

export const getStaticProps: GetStaticProps<TodayRes> = async (ctx) => {
  const id = readFirstInArray(ctx.params?.id);

  if (!id) return { notFound: true, props: {} };

  const today = await getTodaySong(id);
  if ("error" in today) {
    return { notFound: true, props: {} };
  }
  console.log("GENERATED PAGE FOR: ", today.artist);

  return {
    props: { song: today.song, allSongs: today.allSongs, artist: today.artist },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: ["/artist/UCRY5dYsbIN5TylSbd7gVnZg"], fallback: "blocking" };
};
