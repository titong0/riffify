import React from "react";

const BgImage = ({ url }: { url: string }) => {
  return (
    <div className="fixed h-screen w-full -z-50 top-0 opacity-20">
      <img
        className="max-h bg-contain bg-repeat bg-opacity-40 max-h-full w-full"
        src={url}
        referrerPolicy={"no-referrer"}
      />
      <img
        className="max-h bg-contain bg-repeat bg-opacity-40 max-h-full w-full"
        src={url}
        referrerPolicy={"no-referrer"}
      />
      <img
        className="max-h bg-contain bg-repeat bg-opacity-40 max-h-full w-full"
        src={url}
        referrerPolicy={"no-referrer"}
      />
    </div>
  );
};

export default BgImage;
