import React from "react";
import { host } from "../../config";

type ReqStates = "None" | "Loading" | "Finished";
const HeardleBeingUpdated = ({ artistId }: { artistId: string }) => {
  const [reqState, setReqState] = React.useState<ReqStates>("None");

  React.useEffect(() => {
    const abortController = new AbortController();
    const url = new URL(` ${host}/api/revalidate`);
    url.searchParams.append("id", artistId);

    setReqState("Loading");
    fetch(url, { signal: abortController.signal }).then(() =>
      setReqState("Finished")
    );

    return abortController.abort;
  }, [artistId]);

  return (
    <div>
      You are the first person to play this heardle today. Please stand by while
      it is updated. This shouldn&apost take longer than 5 seconds
    </div>
  );
};

export default HeardleBeingUpdated;
