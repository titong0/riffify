import Image from "next/image";
import React from "react";

const BgImage = ({ url }: { url: string }) => {
  return (
    <div
      style={{ backgroundImage: `url('${url}')`, backgroundSize: "100% auto" }}
      className="fixed top-0 w-full h-screen bg-contain -z-50 opacity-10"
    ></div>
  );
};

export default BgImage;
