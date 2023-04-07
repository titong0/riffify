import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ServerDown = () => {
  const Router = useRouter();
  const error = Router.query.error;
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-400 dark:bg-red-900 dark:text-gray-200">
      <div className="h-48 p-3 sm:p-10">
        <h2 className="mb-1 text-xl font-bold">
          Seems like the server had an error when executing your request.
        </h2>
        <pre className="p-4 bg-gray-800">{JSON.stringify(error, null, 2)}</pre>
        <p>
          If you are seeing this, please contact me at{" "}
          <span className="underline dark:text-red-300">
            augustoerrecarte@gmail.com
          </span>
        </p>
      </div>
      <Link href="/">Go back</Link>
    </div>
  );
};

export default ServerDown;
