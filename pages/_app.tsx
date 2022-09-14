import { AppProps } from "next/app";
import React from "react";
import Spinner from "../components/Spinner";
import "../globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Spinner />
    </>
  );
};

export default App;
