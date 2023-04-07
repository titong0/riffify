import { AppProps } from "next/app";
import React from "react";
import Spinner from "../components/common/Spinner";
import "../globals.css";
import HomeButton from "../components/common/HomeButton";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <HomeButton />
      <Component {...pageProps} />
      <Spinner />
    </>
  );
};

export default App;
