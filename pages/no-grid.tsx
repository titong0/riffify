import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import BackButton from "../components/common/BackButton";
import CTA from "../components/common/CTA";

const NoGrid = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>No grid error</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen bg-blue-400 dark:bg-slate-900 dark:text-gray-200">
        <div className="flex flex-col items-center h-48 gap-3 p-3 sm:p-10">
          <div>
            <h2 className="mb-1 text-xl font-bold">
              Weird &quot;no grid&quot; error.
            </h2>
            <p>
              I am not sure what causes this, but it is an error I am aware of.
              You can try reloading the page. as this sometimes happens and
              sometimes it doesn&apos;t.
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <BackButton className="p-8 py-4" />
            {router.query.from && (
              <CTA className="p-8 py-4 border border-current rounded-md w-fit bg-slate-700">
                <Link href={`/artist/${router.query.from}`}>Try again</Link>
              </CTA>
            )}
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default NoGrid;
