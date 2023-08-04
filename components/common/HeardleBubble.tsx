import React from "react";
import { LocStorage_Favorite } from "../../shared/schemas";
import Link from "next/link";

// WHO CALLS THIS A BUBBLE?!!?!!?!??!?!?! I am not sure. I do
const HeardleBubble = ({ data }: { data: LocStorage_Favorite }) => {
  return (
    <Link
      className="relative w-3/4 border rounded-2xl shrink-0 snap-center"
      href={`/artist/${data.id}`}
    >
      <h4 className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        {data.name}
      </h4>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="transition-opacity opacity-20 rounded-2xl hover:opacity-40"
        referrerPolicy="no-referrer"
        src={data.thumbnail}
        alt={data.name}
      />
    </Link>
  );
};

export default HeardleBubble;
