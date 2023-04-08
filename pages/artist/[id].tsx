import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import GameWrapper from "../../components/Game-thingies/GameWrapper";
import { Page_ArtistGameProps } from "../../shared/schemas";
import { getToday } from "../../server/getTodaySong";
import { ArtistIdSchema } from "../../shared/libSchemas";
import { isToday } from "../../utils";
import HeardleBeingUpdated from "../../components/common/HeardleBeingUpdated";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";

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
        <meta name="description" content={`Play heardle for ${artist.name}`} />
      </Head>

      <Title artistName={artist.name} />
      {/* <BgImage url={artist.avatar[0].url} /> */}
      <GameWrapper validSongs={validSongs} artist={artist} song={song} />
    </>
  );
};

const Title = ({ artistName }: { artistName: string }) => {
  const [showInput, setShowInput] = React.useState(false);
  const Router = useRouter();
  const navigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const artist = new FormData(e.target as HTMLFormElement).get("searchValue");
    console.log(Router.route);
    Router.push(`/search/${artist!}`);
  };
  return (
    <h1 className="text-2xl text-center py-7">
      {showInput ? (
        <form className="inline-flex w-64 ml-auto" onSubmit={navigate}>
          <input
            autoFocus
            name="searchValue"
            className="p-1 my-2 mr-2 transition rounded-sm bg-opacity-10 bg-slate-300 dark:bg-slate-900 focus:border dark:text-gray-300 animate-weigthen"
            type="text"
          />
          {/* <button
            className="mr-2"
            onClick={() => setShowInput((prevShowInput) => !prevShowInput)}
          >
            coso
          </button> */}
        </form>
      ) : (
        <button
          onClick={() => setShowInput((prevShowInput) => !prevShowInput)}
          className="inline-flex items-center justify-between px-2 py-1 mr-2 border-2 bg-opacity-60 bg-slate-900"
        >
          {artistName}
          <BsSearch className="ml-2" size={15} />
        </button>
      )}
      heardle
    </h1>
  );
};

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

export default Artist;
