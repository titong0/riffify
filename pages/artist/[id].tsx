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
      <Game song={song} allSongs={allSongs} />
    </>
  );
};

export default Artist;

export const getServerSideProps: GetServerSideProps<TodayRes> = async (ctx) => {
  const id = readFirstInArray(ctx.params?.id);
  const artist = readFirstInArray(ctx.query?.artist);
  const noLive = readFirstInArray(ctx.query?.noLive);

  if (!id) return { notFound: true, props: {} };
  if (!artist) return { notFound: true, props: {} };

  const today = await getTodaySong(id, Boolean(noLive));
  if ("error" in today) {
    return { notFound: true, props: {} };
  }
  return {
    props: { song: today.song, allSongs: today.allSongs, artist: artist },
  };
};
