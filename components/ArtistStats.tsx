import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState, useEffect } from "react";
import { getArtistStats } from "../storageUtils";
import { ArtistStats as Stats } from "../types";
import { BsBarChart } from "react-icons/bs";
import AlertDialogWrapper from "./common/AlertDialogWrapper";
import CTA from "./common/CTA";
export const ArtistStats = ({ artistId }: { artistId: string }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <BsBarChart />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black bg-opacity-80 animate-[fade-in_300ms] fixed inset-0 z-40" />
        <AlertDialog.Content>
          <AlertDialogWrapper>
            <AlertDialog.Title className="text-2xl font-bold text-center">
              Stats for this artist
            </AlertDialog.Title>
            <Stats artistId={artistId} /> <AlertDialog.Cancel />
            <AlertDialog.Action asChild>
              <CTA className="w-full p-1">Cool</CTA>
            </AlertDialog.Action>
          </AlertDialogWrapper>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

const Stats = ({ artistId }: { artistId: string }) => {
  const [stats, setStats] = useState<Stats>();

  useEffect(() => {
    setStats(getArtistStats(artistId));
  }, [artistId]);

  if (stats === undefined || stats === null) return null;

  const totalAttempts = stats?.attemptsNeeded.reduce((a, b) => a + b);
  return (
    <>
      <div className="z-20 grid w-full grid-cols-2 gap-8 px-8 h-96">
        <div className="grid w-full grid-cols-5 gap-1">
          {stats.attemptsNeeded.map((attempts, idx) => {
            const height = (100 * attempts) / totalAttempts;
            return (
              <div
                className="flex flex-col items-center justify-end h-full"
                key={height + idx}
              >
                <div
                  style={{ height: `${height}%` }}
                  className={`w-4 min-h-[1.5rem] text-center bg-emerald-600 mb-2`}
                >
                  {attempts}
                </div>
                <div className="w-full text-center border-t">{idx}</div>
              </div>
            );
          })}{" "}
          <span className="col-span-5">Attempts you needed</span>
        </div>
        <div className="flex flex-col w-full mt-4">
          <div className="text-lg">Days won: {stats.daysSucceded}</div>
          <div className="text-lg">Days lost: {stats.daysFailed}</div>
          <div className="text-lg">
            Win-rate:{" "}
            {(stats.daysSucceded * 100) /
              (stats.daysSucceded + stats.daysFailed)}
            %
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;

// const width = (attempts * 100) / totalAttempts!;

// return (
//   <div className="flex items-center w-full px-2" key={width}>
//     {idx === 5 ? (
//       <span className="w-1/12 h-full text-red-400">Fails</span>
//     ) : (
//       <span className="w-1/12 h-full">{idx + 1}</span>
//     )}
//     <div className="w-10/12">
//       <div
//         style={{ width: `${width}%` }}
//         className="h-5 mx-4 bg-green-300"
//         key={width + attempts}
//       ></div>
//       <span> {attempts}</span>
//     </div>
//   </div>
// );
