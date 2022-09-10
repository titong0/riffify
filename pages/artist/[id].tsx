import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import Game from "../../components/Game";
import { getTodaySong } from "../../service";
import { ReqError, TodayRes } from "../../types";
import { readFirstInArray } from "../../utils";

const Artist = ({
  song,
  allSongs,
  artist,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

export const getServerSideProps: GetServerSideProps<TodayRes> = async (ctx) => {
  const id = readFirstInArray(ctx.params?.id);
  const noLive = readFirstInArray(ctx.query?.noLive);

  if (!id) return { notFound: true, props: {} };

  const today = await getTodaySong(id, Boolean(noLive));
  if ("error" in today) {
    return { notFound: true, props: {} };
  }

  return {
    props: { song: today.song, allSongs: today.allSongs, artist: today.artist },
  };
};
