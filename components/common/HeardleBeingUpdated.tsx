import React, { useCallback } from "react";
import { host } from "../../config";
import { useRouter } from "next/router";

const HeardleBeingUpdated = ({ artistId }: { artistId: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 h-80">
      <div className="w-full max-w-2xl p-3 font-semibold text-gray-900 bg-amber-300 ">
        You are the first person to play this heardle today. Please stand by
        while it is updated. This shouldn&apos;t take longer than 5 seconds...
      </div>
      <div className="animate-bounce">Just wait, please</div>
      <div className="animate-[spin_5s_infinite]">Just wait, please</div>
      <div className="animate-pulse">Just wait, please</div>
    </div>
  );
};

export default HeardleBeingUpdated;
