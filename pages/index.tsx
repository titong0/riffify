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
        <h1 className="text-2xl my-8 text-center">Auto heardle</h1>
        <div className="flex justify-center">
          <div className="w-full max-w-xl m-2">
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
