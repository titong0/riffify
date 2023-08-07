import React, { useCallback } from "react";
import { useRouter } from "next/router";

const HeardleBeingUpdated = ({
  artistId,
  songAmount,
}: {
  artistId: string;
  songAmount: number;
}) => {
  const Router = useRouter();
  setTimeout(() => {
    Router.reload();
  }, 5000);
  return (
    <div className="flex flex-col items-center justify-center gap-12 h-80">
      <div className="w-full max-w-2xl p-3 font-semibold text-gray-900 bg-amber-300 ">
        You are the first person to play this heardle today. Please stand by
        while it is updated. This artist has {songAmount} songs, so
        {songAmount > 100
          ? `it shouldn't take longer than 5 seconds...`
          : "it may take a bit..."}
      </div>
      <div className="animate-bounce">Just wait, please</div>
      <div className="animate-[spin_5s_infinite]">Just wait, please</div>
      <div className="animate-pulse">Just wait, please</div>
    </div>
  );
};

export default HeardleBeingUpdated;
