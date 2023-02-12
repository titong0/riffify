import React, { useState, useEffect } from "react";
import { getArtistStats } from "../storageUtils";
import { ArtistStats } from "../types";

type ArtistStatsProps = {
  artistId: string;
};

const ArtistStats = ({ artistId }: ArtistStatsProps) => {
  const [stats, setStats] = useState<ArtistStats>();
  const totalAttempts = stats?.attemptsNeeded.reduce((a, b) => a + b);

  useEffect(() => {
    setStats(getArtistStats(artistId));
  }, [artistId]);

  if (stats === undefined || stats === null) return null;

  return (
    <>
      <h3 className="mb-2">Your stats for this artist</h3>
      <div className="z-20 flex flex-col w-full my-4">
        <div className="flex flex-col w-full gap-3">
          {stats.attemptsNeeded.map((attempts, idx) => {
            const width = (attempts * 100) / totalAttempts!;

            return (
              <div className="flex items-center w-full px-2" key={width}>
                {idx === 5 ? (
                  <span className="w-1/12 text-red-400">Fails</span>
                ) : (
                  <span className="w-1/12">{idx + 1}</span>
                )}
                <div className="w-10/12">
                  <div
                    style={{ width: `${width}%` }}
                    className="h-5 mx-4 bg-green-300"
                    key={width + attempts}
                  ></div>
                  <span> {attempts}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-around mt-4">
          <div className="text-lg">
            <h3>Days you won</h3>
            <p className="text-center">{stats.daysSucceded}</p>
          </div>
          <div className="text-lg">
            <h3>Days you lost</h3>
            <p className="text-center">{stats.daysFailed}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistStats;
