import Head from "next/head";
import Image from "next/image";
import React from "react";
import { MdEmail } from "react-icons/md";

const Funding = () => {
  return (
    <>
      <Head>
        <title>Funding</title>
      </Head>
      <div className="flex justify-center w-full p-2 mt-12">
        <div className="w-full h-auto max-w-lg p-2 text-black bg-gray-200 rounded-md">
          <h2 className="m-1 my-3 text-4xl font-bold text-center text-green-500">
            Give me money.
          </h2>
          <p className="flex items-center gap-2">
            <MdEmail size={20} /> augustoerrecarte@gmail.com
          </p>
          <p>
            I know,
            <span className="text-red-700"> who does he think he is?</span> why
            would I give money to a random web developer who, putting his heart
            and soul, made this amazing website (which I enjoy)?
          </p>
          <h3 className="my-2 text-2xl italic text-center animate-bounce">
            I have no money
          </h3>
          <p>
            I develop this site mainly on weekends so I have to take some time
            off in order to bring new features. If you like the site and would
            like to support me, consider donating via paypal{" "}
            <Image
              width="25"
              height="25"
              src="/pleading-face.png"
              alt="pleading face emoji"
            />
          </p>
          <h3 className="my-2 text-2xl italic text-center text-green-600">
            Ok. give me the link
          </h3>
          <p className="mb-2">Click the image below to go paypal</p>
          <a className="w-1/2" href="https://www.paypal.com/paypalme/titong0">
            <Image
              layout="responsive"
              width={640}
              height={853}
              src="/POROTO.png"
              alt="POROTO"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Funding;
