import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
type CTAProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const CTA = React.forwardRef<HTMLButtonElement, CTAProps>(
  (props, forwardedRef) => {
    return (
      <button
        ref={forwardedRef}
        {...props}
        className={twMerge(
          `ml-auto text-white transition border border-black rounded-xl
         hover:outline outline-offset-2 outline-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `,
          props.className
        )}
      >
        {props.children}
      </button>
    );
  }
);

export default CTA;
