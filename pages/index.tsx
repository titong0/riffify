import Head from "next/head";
import React from "react";
import Search from "../components/Search";
import Logo from "../components/common/Logo";
import { HeardleExplanationDisplay } from "../components/modals/HeardleExplanation";
import FavoritesSlider from "../components/common/FavoritesSlider";

const Index: React.FC = ({}) => {
  return (
    <>
      <Head>
        <title>Riffify</title>
        <meta
          name="description"
          content="Riffify - Play heardle for any artist you want"
        />
        <OgThings />
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
            <h3 className="my-4 text-2xl text-center">
              Your favorite heardles
            </h3>
            <FavoritesSlider />
          </div>
        </div>
      </div>
    </>
  );
};

const OgThings = () => {
  return (
    <>
      <meta
        property="og:title"
        content="Riffify - Play heardle for any artist you want"
      />
      <meta
        property="og:description"
        content={`Play Riffify! Guess the randomly selected song with as few seconds as possible. Choose any artist and start playing today!`}
      />
      <meta property="og:url" content="https://riffify.vercel.app" />

      <meta
        property="og:image"
        content="https://riffify.vercel.app/riffify-cover.png"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="150" />

      <meta property="twitter:title" content="Riffify" />
      <meta
        property="twitter:description"
        content={`Play Riffify, the addictive music challenge game! Guess the randomly selected song with as few seconds as possible and compare your score with other players from around the world. Choose any artist and start playing today!`}
      />
      <meta
        property="twitter:image"
        itemProp="image"
        content="https://riffify.vercel.app/riffify-cover.png"
      />
      <meta
        property="twitter:card"
        content="https://riffify.vercel.app/riffify-cover.png"
      />
    </>
  );
};

export default Index;
