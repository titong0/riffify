import Image from "next/image";
import React from "react";
import { Artist } from "../shared/schemas";

const TrendingHeardle: React.FC<Artist> = ({
  description,
  id,
  name,
  thumbnail,
}) => {
  return (
    <div className="flex flex-col">
      <Image unoptimized layout="fill" src={thumbnail} alt="" />
      <h4>{name}</h4>
    </div>
  );
};

export default TrendingHeardle;
