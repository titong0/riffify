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
        type="button"
        ref={forwardedRef}
        {...props}
        className={twMerge(
          `ml-auto text-white transition border-2 border-black rounded-xl
         outline-offset-2 outline-black bg-gradient-to-r 
         hover:outline  

         from-indigo-500 via-purple-500 to-pink-500 
         active:from-indigo-700 active:via-purple-700 active:to-pink-700 `,
          props.className
        )}
      >
        {props.children}
      </button>
    );
  }
);
CTA.displayName = "CTA";

export default CTA;
