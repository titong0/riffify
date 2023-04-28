import React, { useCallback } from "react";
import { host } from "../../config";
import { useRouter } from "next/router";

type ReqState = "None" | "Loading" | "Finished";
const HeardleBeingUpdated = ({ artistId }: { artistId: string }) => {
  const [reqState, setReqState] = React.useState<ReqState>("None");
  const Router = useRouter();

  const fetchAndReload = (controller: AbortController) => {
    setReqState("Loading");
    const url = new URL(` ${host}/api/revalidate`);
    url.searchParams.append("id", artistId);
    console.log(url);
    fetch(url.href, { signal: controller.signal }).then(() => {
      setReqState("Finished");
      Router.reload();
    });
  };
  const memoed = useCallback(fetchAndReload, [artistId, Router]);

  React.useEffect(() => {
    const abortController = new AbortController();
    memoed(abortController);
    return () => abortController.abort();
  }, [memoed]);

  if (reqState === "Loading") {
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
  }
  if (reqState === "Finished") {
    return (
      <div className="flex flex-col items-center justify-center gap-12 h-80">
        <div className="w-full max-w-2xl p-3 font-semibold text-gray-900 bg-amber-300 ">
          Done! reloading page...
        </div>
        <div className="animate-bounce">Keep on waiting, please</div>
        <div className="animate-[spin_5s_infinite]">
          Keep on waiting, please
        </div>
        <div className="animate-pulse">Keep on waiting, please</div>
      </div>
    );
  }
  console.log(`didnt return, ${reqState}`);
  return <>ummm</>;
};

export default HeardleBeingUpdated;
