import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import CTA from "../components/CTA";

const NoFeature = () => {
  return (
    <>
      <Head>
        <title>Oops</title>
      </Head>
      <div className="flex flex-col w-full items-center mt-12 p-2">
        <div className="w-full max-w-lg px-1">
          <Image src="/head-scratch.png" width="520" height="220" />
        </div>
        <div className="w-full max-w-lg p-2 bg-gray-200 text-black rounded-md">
          <p>
            This feature is not available yet but it <em>likely</em> will in the
            future. If you enjoy the site, please consider checking out{" "}
            <Link href="/funding" passHref>
              <a className="text-emerald-500 hover:text-emerald-700">
                <span className="underline">donating</span>{" "}
                <AiOutlineHeart className="inline-block" width="20" />
              </a>
            </Link>
            .
          </p>
          Here's a cool pic of my cat.
          <div className="flex justify-center my-3">
            <Image
              className="w-11/12"
              src="/cuco.png"
              width="242"
              height="172"
            />
          </div>
          Here's some of the things that are (likely) coming soon
          <ul className="list-disc list-inside m-2">
            <li>Site redesign</li>
            <li>Better stats tracking</li>
            <li>Playlist mode</li>
            <li>Favorites system</li>
            <li>Most played heardles</li>
            <li>Many more things I can't think of right now</li>
          </ul>
          <Link href="/funding" passHref>
            <CTA>Alright... you convinced me..</CTA>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoFeature;
