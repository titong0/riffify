import Image from "next/image";
import React from "react";
import { Artist } from "../shared/schemas";

const TrendingHeardle: React.FC<Artist> = ({
  description,
  id,
  name,
  thumbnails,
}) => {
  return (
    <div className="flex flex-col">
      <Image unoptimized layout="fill" src={thumbnails[0].url} alt="" />
      <h4>{name}</h4>
    </div>
  );
};

export default TrendingHeardle;
