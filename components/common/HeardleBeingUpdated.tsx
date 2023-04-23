import React from "react";
import { host } from "../../config";

type ReqStates = "None" | "Loading" | "Finished";
const HeardleBeingUpdated = ({ artistId }: { artistId: string }) => {
  const [reqState, setReqState] = React.useState<ReqStates>("None");

  React.useEffect(() => {
    // const abortController = new AbortController();
    const url = new URL(` ${host}/api/revalidate`);
    url.searchParams.append("id", artistId);

    setReqState("Loading");
    console.log(url.href);
    // fetch(url, { signal: abortController.signal }).then(() =>
    //   setReqState("Finished")
    // );
    fetch(url.href).then(() => setReqState("Finished"));

    // return abortController.abort;
  }, [artistId]);

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
