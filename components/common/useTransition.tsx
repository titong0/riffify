import { useRouter } from "next/router";
import React from "react";

const useTransition = () => {
  const Router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [navigatingTo, setNavigatingTo] = React.useState("");
  React.useEffect(() => {
    const startLoad = (a: any) => setLoading(true);
    const endLoad = () => setLoading(false);
    Router.events.on("routeChangeStart", startLoad);
    Router.events.on("routeChangeComplete", endLoad);
    return () => {
      Router.events.off("routeChangeStart", startLoad);
      Router.events.off("routeChangeComplete", endLoad);
    };
  }, [Router.events]);
  return { isLoading: loading, navigatingTo };
};

export default useTransition;
