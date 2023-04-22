import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import BackButton from "../components/common/BackButton";
import CTA from "../components/common/CTA";

const ServerDown = () => {
  const Router = useRouter();
  const error = Router.query.error;
  const from = Router.query.from;
  console.log(from);
  return (
    <>
      <Head>
        <title>Oops... </title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen bg-red-400 dark:bg-red-900 dark:text-gray-200">
        <div className="p-3 sm:px-5">
          <h2 className="mb-1 text-xl font-bold">
            Seems like the server had an error when executing your request.
          </h2>
          {error ? (
            <pre className="p-4 my-2 overflow-x-scroll bg-gray-800">
              {JSON.stringify(error, null, 2)}
            </pre>
          ) : (
            "No error message available"
          )}
          <p>
            If you are seeing this, please contact me at{" "}
            <span className="underline dark:text-red-300">
              augustoerrecarte@gmail.com
            </span>
          </p>
        </div>
        {typeof from === "string" && (
          <CTA
            onClick={() => Router.replace(from)}
            className="w-1/4 p-2 px-6 mx-auto my-1"
          >
            Try again
          </CTA>
        )}
        <BackButton className="w-1/4" />
      </div>
    </>
  );
};

export default ServerDown;
