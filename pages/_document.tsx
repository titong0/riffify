import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;700;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="min-h-screen font-libre bg-gradient-to-b dark:from-[#332B47] dark:to-cyan-800 dark:bg-neutral-900 dark:text-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
