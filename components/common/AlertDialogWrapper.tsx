import React from "react";

const AlertDialogWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      className="fixed top-1/2 left-1/2 w-[95%] md:w-4/5 max-w-2xl min-h-72 bg-gray-900 rounded-md -translate-x-1/2 -translate-y-1/2
            p-2 animate-[fade-in_600ms] z-50 flex flex-col items-center"
    >
      {children}
    </div>
  );
};

export default AlertDialogWrapper;
