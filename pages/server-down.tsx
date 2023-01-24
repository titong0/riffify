import Link from "next/link";
import React from "react";

const serverDown = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-400 dark:bg-red-900 dark:text-gray-200">
      <div className="p-3 sm:p-10 h-48">
        <h2 className="text-xl font-bold mb-1">
          Seems like the server is down, sorry about this...
        </h2>
        <p>
          If you are seeing this, please contact me at{" "}
          <span className="dark:text-red-300 underline">
            augustoerrecarte@gmail.com
          </span>
        </p>
      </div>
      <Link href="/" className="border px-6 py-2 rounded-md">
        Go back
      </Link>
    </div>
  );
};

export default serverDown;
