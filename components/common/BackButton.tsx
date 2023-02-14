import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

type BackButtonProps = Omit<LinkProps, "href"> & {
  className?: string;
  children?: React.ReactNode;
};

const BackButton: React.FC<BackButtonProps> = (props) => {
  const router = useRouter();
  return (
    <div
      onClick={router.back}
      className={twMerge(
        `px-6 py-2 border rounded-md border-current w-fit`,
        props.className
      )}
    >
      {props.children || "Go back"}
    </div>
  );
};

export default BackButton;
