import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState, useEffect } from "react";
import { getArtistStats } from "../../storageUtils";
import { BsBarChart } from "react-icons/bs";
import AlertDialogWrapper from "../common/AlertDialogWrapper";
import CTA from "../common/CTA";
import { ArtistStats } from "../../shared/schemas";

export const ArtistStatsDisplay = ({ artistId }: { artistId: string }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="text-red-700">
        <BsBarChart className="" size={20} />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black bg-opacity-80 animate-[fade-in_300ms] fixed inset-0 z-40" />
        <AlertDialog.Content>
          <AlertDialogWrapper>
            <AlertDialog.Title className="text-2xl font-bold text-center">
              Stats for this artist
            </AlertDialog.Title>
            <Stats artistId={artistId} />
            <AlertDialog.Cancel />
            {/* invisible thing because there seems to be a bug where
                <AlertDialog.Action> isn't possitioned statically
                anyway, too lazy to find out */}
            <div className="h-6"></div>
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
  const [stats, setStats] = useState<ArtistStats | null>(null);

  useEffect(() => {
    const stats = getArtistStats(artistId);
    stats && setStats(stats);
  }, [artistId]);

  if (stats === null)
    return (
      <div className="flex items-center h-full">
        There are no stats for this Artist, Finish a game first!
      </div>
    );

  const totalAttempts = stats.attemptsNeeded.reduce((a, b) => a + b);
  return (
    <>
      <div className="w-full h-full grid-cols-2 gap-8 sm:px-8 sm:grid min-h-96">
        <div className="h-60 sm:h-full">
          <h4 className="w-full text-center">Attempts you needed</h4>
          <div className="grid items-end w-full h-full grid-cols-5 gap-1 py-3">
            {stats.attemptsNeeded.map((attempts, idx) => {
              const height = (100 * attempts) / totalAttempts + 10;
              return (
                <div
                  className="flex flex-col items-center justify-end h-full"
                  key={height + idx}
                >
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-8 min-h-[1.5rem] h-full text-center bg-emerald-600 mb-1`}
                  >
                    {attempts}
                  </div>
                  <div className="w-full text-center border-t">{idx + 1}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-around w-full pt-2 mt-4 border-t-4 sm:justify-start sm:flex-col">
          <div className="flex flex-col sm:flex-row">
            Days won: <span> {stats.daysSucceded}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            Days lost: <span> {stats.daysFailed}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            Win-rate:{" "}
            <span>
              {(stats.daysSucceded * 100) /
                (stats.daysSucceded + stats.daysFailed)}
              %
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistStatsDisplay;
