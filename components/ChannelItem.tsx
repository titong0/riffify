import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SearchResults } from "../shared/schemas";

type ChannelItemProps = SearchResults[number] & {
  shouldPrefetch: undefined | false;
};

const ChannelItem: React.FC<ChannelItemProps> = ({
  id,
  name,
  thumbnail,
  shouldPrefetch,
  suscribers,
}) => {
  return (
    // prefetch only first 3 results to save bandwidth
    // comparison could be undefined instead of true to prevent this behavior
    // https://github.com/vercel/next.js/issues/9522
    <Link href={`/artist/${id}`} passHref prefetch={shouldPrefetch}>
      <div className="flex items-center p-2 border-b border-current hover:bg-gray-200 dark:hover:bg-gray-800">
        <Image
          unoptimized
          src={thumbnail}
          referrerPolicy={"no-referrer"}
          width={50}
          height={50}
          className="rounded-full"
          alt={name}
        />
        <div className="items-center justify-between w-full mx-2 sm:flex">
          <span className="w-fit"> {name}</span>
          <div className="text-xs font-thin text-gray-300">{suscribers}</div>
        </div>
      </div>
    </Link>
  );
};

export default ChannelItem;
