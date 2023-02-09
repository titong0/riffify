import React, { forwardRef } from "react";

type CTAProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const CTA = ({ ...props }: CTAProps) => {
  return (
    <button
      {...props}
      className="w-full p-2 px-8 ml-auto text-white transition border border-black rounded-xl bg-emerald-500 hover:outline outline-offset-2 outline-black active:bg-emerald-800"
    >
      {props.children}
    </button>
  );
};

export default CTA;
