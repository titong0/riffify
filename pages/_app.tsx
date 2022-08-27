import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
