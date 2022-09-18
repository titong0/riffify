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
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="font-libre bg-zinc-300 dark:bg-gray-900 dark:text-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
