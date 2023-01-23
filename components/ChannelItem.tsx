import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArtistResult } from "../shared/schemas";

type ChannelItemProps = ArtistResult & {
  shouldPrefetch: undefined | false;
};

const ChannelItem: React.FC<ChannelItemProps> = ({
  id,
  name,
  thumbnails,
  shouldPrefetch,
}) => {
  return (
    // prefetch only first 3 results to save bandwidth
    // comparison returns undefined instead of true to prevent this behavior
    // https://github.com/vercel/next.js/issues/9522
    <Link href={`/artist/${id}`} passHref prefetch={shouldPrefetch}>
      <a>
        <div className="flex items-center p-2 border-b border-current hover:bg-gray-200 dark:hover:bg-gray-800">
          <Image
            unoptimized
            src={thumbnails[1].url || thumbnails[0].url}
            referrerPolicy={"no-referrer"}
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="ml-3"> {name}</span>
        </div>
      </a>
    </Link>
  );
};

export default ChannelItem;
