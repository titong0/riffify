import React, { forwardRef } from "react";

type CTAProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const CTA = ({ ...props }: CTAProps, ref: any) => {
  return (
    <button
      {...props}
      className="p-2 px-8 ml-auto rounded-2xl w-full
     text-white border border-black bg-emerald-500
      hover:outline outline-offset-2 outline-black
      active:bg-emerald-800 transition"
    >
      {props.children}
    </button>
  );
};

export default forwardRef(CTA);
