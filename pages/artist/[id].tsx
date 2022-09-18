import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import Game from "../../components/Game";
import { getTodaySong } from "../../service";
import { TodayProps } from "../../types";
import { readFirstInArray } from "../../utils";
import { useEffect } from "react";
import { host } from "../../config";
import { useRouter } from "next/router";

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
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isUpdated = isToday(new Date(), new Date(generatedAt));
  const Router = useRouter();
  useEffect(() => {
    if (isUpdated) return;
    fetch(`${host}/api/revalidate?id=${id}`).then((i) => {
      i.ok &&
        setTimeout(() => {
          Router.reload();
        }, 3000);
    });
  }, []);
  return (
    <>
      <Head>
        <title>{`${artist.name} heardle`}</title>
      </Head>
      <div className="fixed h-screen w-full -z-50 top-0 opacity-20">
        <img
          className="max-h bg-contain bg-repeat bg-opacity-40 max-h-full w-full"
          src={artist.avatar[0]?.url}
          referrerPolicy={"no-referrer"}
        />
        <img
          className="max-h bg-contain bg-repeat bg-opacity-40 max-h-full w-full"
          src={artist.avatar[0]?.url}
          referrerPolicy={"no-referrer"}
        />
        <img
          className="max-h bg-contain bg-repeat bg-opacity-40 max-h-full w-full"
          src={artist.avatar[0]?.url}
          referrerPolicy={"no-referrer"}
        />
      </div>

      {!isUpdated && (
        <div>
          You are the first person to play this artist today! sorry, we will
          reload the page as soon as it is updated
        </div>
      )}
      <h1 className="my-4 text-lg text-center">{artist.name} heardle</h1>
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
