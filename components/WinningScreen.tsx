import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import { Game_Song } from "../shared/schemas";
import CTA from "./CTA";
import SongSnippet from "./SongSnippet";
import ArtistStats from "./UserStats";

type WinningScreenProps = {
  artistId: string;
  song: Game_Song;
  failAmount: number;
};
const WinningScreen = ({ song, failAmount }: WinningScreenProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="">
      <button
        className={`rounded-lg p-3 ${open ? "bg-red-400" : "bg-emerald-500"}`}
        onClick={() => setOpen(!open)}
      >
        Trigger
      </button>
      <AlertDialog.Root open={open} onOpenChange={(e) => setOpen(e)}>
        <AlertDialog.Trigger />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black bg-opacity-80 animate-[fade-in_300ms] fixed inset-0 z-40" />
          <AlertDialog.Content>
            <div
              className="absolute top-16 left-1/2 w-[95%] md:w-4/5 max-w-2xl min-h-72 bg-gray-900 rounded-md -translate-x-1/2
            p-2 animate-[fade-in_600ms] animate-[] z-50 flex flex-col items-center"
            >
              <AlertDialog.Title className="text-2xl my-2 font-bold text-center">
                {" "}
                You won!
              </AlertDialog.Title>
              {/* <ArtistStats artistId={artistId} /> */}
              <SongSnippet failAmount={failAmount} song={song} />

              <AlertDialog.Cancel asChild className="w-full">
                <CTA className="w-full">Cool</CTA>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default WinningScreen;
