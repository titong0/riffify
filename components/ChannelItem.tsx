import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArtistFromSearch } from "../types";

const ChannelItem: React.FC<ArtistFromSearch> = ({ id, name, thumbnails }) => {
  return (
    <Link href={`/artist/${id}`} passHref>
      <a>
        <div className="flex items-center p-2 border-b dark:hover:bg-gray-800">
          <Image
            src={thumbnails[0].url}
            width={50}
            height={50}
            className="rounded-full"
          />{" "}
          <span className="ml-3"> {name}</span>
        </div>
      </a>
    </Link>
  );
};

export default ChannelItem;
