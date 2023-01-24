import Link from "next/link";
import React from "react";

const serverDown = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-400 dark:bg-red-900 dark:text-gray-200">
      <div className="h-48 p-3 sm:p-10">
        <h2 className="mb-1 text-xl font-bold">
          Seems like the server is down, sorry about this...
        </h2>
        <p>
          If you are seeing this, please contact me at{" "}
          <span className="underline dark:text-red-300">
            augustoerrecarte@gmail.com
          </span>
        </p>
      </div>
      <Link href="/">
        <a className="px-6 py-2 border rounded-md">Go back</a>
      </Link>
    </div>
  );
};

export default serverDown;
