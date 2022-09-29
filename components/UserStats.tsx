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

  if (stats === undefined) return null;

  return (
    <div className="flex flex-col w-full my-4 z-20">
      <div className="flex flex-col gap-3 w-full">
        {stats.attemptsNeeded.map((attempts, idx) => {
          const width = (attempts * 100) / totalAttempts!;
          console.log(width);
          return (
            <div className="flex items-center w-full mx-2">
              <span className="w-12">{idx === 5 ? "Fails" : idx}</span>
              <div
                style={{ width: `${width}%` }}
                className="h-4 bg-red-400"
                key={width + attempts}
              ></div>
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
