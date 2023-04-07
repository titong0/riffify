import Head from "next/head";
import React from "react";
import Search from "../components/Search";
import Logo from "../components/common/Logo";

const Index: React.FC = ({}) => {
  return (
    <>
      <Head>
        <title>Auto heardle</title>
      </Head>
      <div>
        <header className="my-8 text-center">
          <h1 className="flex items-center justify-center w-full gap-4 text-2xl font-medium">
            Auto heardle <Logo />{" "}
          </h1>
          <h2>
            Play heardle for <span className="underline">any</span> artist you
            want!
          </h2>
        </header>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl m-2">
            {/* <div className="flex items-center w-full gap-2">
              {artists &&
                artists.map((artist) => (
                  <TrendingHeardle key={artist.id} {...artist} />
                ))}
            </div> */}
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
