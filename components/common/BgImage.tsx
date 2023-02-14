import Image from "next/image";
import React from "react";

const BgImage = ({ url }: { url: string }) => {
  return (
    <div className="fixed top-0 w-full h-screen -z-50 opacity-20">
      <Image
        className="w-full max-h-full bg-repeat bg-contain max-h bg-opacity-40"
        src={url}
        referrerPolicy={"no-referrer"}
        alt=""
      />
      <Image
        alt=""
        className="w-full max-h-full bg-repeat bg-contain max-h bg-opacity-40"
        src={url}
        referrerPolicy={"no-referrer"}
      />
      <Image
        alt=""
        className="w-full max-h-full bg-repeat bg-contain max-h bg-opacity-40"
        src={url}
        referrerPolicy={"no-referrer"}
      />
    </div>
  );
};

export default BgImage;
