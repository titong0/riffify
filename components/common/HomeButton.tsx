import React from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";
import Link from "next/link";
import useTransition from "./useTransition";

const HomeButton = () => {
  const Router = useRouter();
  if (Router.pathname === "/") return null;
  return (
    <Link href={"/"}>
      <div
        className={`md:fixed w-fit top-0 left-0 bg-slate-100 px-2 rounded-br-lg`}
      >
        <Logo width={60} height={60} />
      </div>
    </Link>
  );
};

export default HomeButton;
