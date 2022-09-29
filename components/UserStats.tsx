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
  }, []);

  if (stats === undefined || stats === null) return null;

  return (
    <div className="flex flex-col w-full my-4 z-20">
      <div className="flex flex-col gap-3 w-full">
        {stats.attemptsNeeded.map((attempts, idx) => {
          const width = (attempts * 100) / totalAttempts!;

          return (
            <div className="flex items-center w-full px-2">
              {idx === 5 ? (
                <span className="w-1/12 text-red-400">Fails</span>
              ) : (
                <span className="w-1/12">{idx + 1}</span>
              )}
              <div className="w-10/12">
                <div
                  style={{ width: `${width}%` }}
                  className="mx-4 h-5 bg-green-300"
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
  );
};

export default ArtistStats;
