import Head from "next/head";
import React from "react";
import Search from "../components/Search";
import Logo from "../components/common/Logo";
import { HeardleExplanationDisplay } from "../components/modals/HeardleExplanation";

const Index: React.FC = ({}) => {
  return (
    <>
      <Head>
        <title>Riffify</title>
        <meta
          name="description"
          content="Riffify - Play heardle for any artist you want"
        />
      </Head>
      <div>
        <header className="my-8 text-center">
          <h1 className="flex items-center justify-center w-full gap-4 text-2xl font-medium">
            Riffify <Logo width={50} height={50} />{" "}
          </h1>
          <h2>
            Play{" "}
            <span className="relative">
              heardle
              <HeardleExplanationDisplay />{" "}
            </span>{" "}
            for <span className="underline">any</span> artist you want!
          </h2>
        </header>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl m-2">
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps<{
//   artists: Artist[] | null;
// }> = async (ctx: GetServerSidePropsContext) => {
//   const trendings = getTrendingHeardles() || null;
//   console.log(trendings);
//   return { props: { artists: trendings } };
// };
export default Index;
