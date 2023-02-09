import Head from "next/head";
import React, { useEffect, useState } from "react";
import Search from "../components/Search";

const Index = () => {
  return (
    <>
      <Head>
        <title>Auto heardle</title>
      </Head>
      <div>
        <header className="my-8 text-center">
          <h1 className="text-2xl font-medium">Auto heardle</h1>
          <h2>
            Play heardle for <span className="underline">any</span> artist you
            want!
          </h2>
        </header>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl m-2">
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
