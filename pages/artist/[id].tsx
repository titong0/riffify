import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Combobox from "../../components/Combobox";
import Game from "../../components/Game";
import { getTodaySong } from "../../service";
import { ReqError, TodayRes } from "../../types";
import { readFirstInQuery } from "../../utils";

const Artist = ({
  song,
  allSongs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Game song={song} allSongs={allSongs} />
    </>
  );
};

export default Artist;

export const getServerSideProps: GetServerSideProps<TodayRes> = async (ctx) => {
  const id = readFirstInQuery(ctx.params?.id);
  if (!id) return { notFound: true, props: {} };
  const today = await getTodaySong(id);
  if ("error" in today) {
    return { notFound: true, props: {} };
  }

  return { props: today };
};
