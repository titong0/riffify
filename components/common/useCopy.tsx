import React from "react";

const useCopy = () => {
  const [copyingState, setCopyingState] = React.useState("");

  return { Wrapper };
};

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const Wrapper = ({ children, ...props }: WrapperProps) => {
  return <div {...props}>{children}</div>;
};

export default useCopy;
