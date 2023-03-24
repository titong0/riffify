import React from "react";
import { MdBlock, MdCheck, MdClear } from "react-icons/md";
import { Attempt } from "../shared/schemas";

const AttemptBox = ({ attempt }: { attempt: Attempt | undefined }) => {
  if (!attempt)
    return (
      <div className="flex items-center w-full p-2 py-4 border border-current h-11"></div>
    );

  const attemptType = attempt.type;

  if (attemptType === "Skip") {
    return (
      <AttemptLayout
        className="italic"
        icon={<MdBlock size={25} />}
        text="Skipped"
      ></AttemptLayout>
    );
  }
  if (attemptType === "Success") {
    return (
      <AttemptLayout
        className="bg-emerald-400 bg-opacity-80"
        icon={<MdCheck size={30} color="#00000" />}
        text={attempt.songName}
      ></AttemptLayout>
    );
  }
  if (attemptType === "Fail") {
    return (
      <AttemptLayout
        // className="bg-[#861414]"
        className="bg-red-900 bg-opacity-30"
        icon={<MdClear size={30} color="#fff" />}
        text={
          <span className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
            {attempt.songName}
          </span>
        }
      ></AttemptLayout>
      // <div
      //   key={attempt.content}
      //   className="flex items-center w-full border p-2 h-10 border-black
      // dark:bg-red-900 animate-[fade-in_500ms]"
      // >
      //
      //
      // </div>
    );
  }
  return null;
};

type FailLayoutProps = {
  icon: React.ReactNode;
  text: React.ReactNode | string;
  className: string;
};
const AttemptLayout: React.FC<FailLayoutProps> = ({
  icon,
  text,
  className,
}) => {
  return (
    <div
      className={
        "grid grid-cols-8 sm:grid-cols-12 items-center w-full border border-current h-11 px-2 animate-[fade-in_500ms]" +
        " " +
        className
      }
    >
      <div className="col-start-1 col-end-2 w-fit">{icon}</div>
      <div className="flex col-start-2 col-span-full"> {text}</div>
    </div>
  );
};
export default AttemptBox;
