import { AppProps } from "next/app";
import React from "react";
import Spinner from "../components/common/Spinner";
import "../globals.css";
import Nav from "../components/common/Nav";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Spinner />
    </>
  );
};

export default App;
