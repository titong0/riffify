import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class Document extends NextDocument {
  render() {
    return (
      <Html className="dark">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"anonymous"}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* generated with https://realfavicongenerator.net  */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta
            name="msapplication-config"
            content="/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body className="min-h-screen font-libre bg-gradient-to-b dark:from-purplish dark:to-cyan-800 dark:bg-neutral-900 dark:text-gray-100 -z-10">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
