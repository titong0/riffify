import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import CTA from "./CTA";
import ArtistStats from "./UserStats";

const WinningScreen = ({ artistId }: { artistId: string }) => {
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
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <div
            className="absolute top-16 left-1/2 w-[95%] md:w-4/5 max-w-2xl min-h-72 bg-gray-700 rounded-md -translate-x-1/2
          p-2 animate-[fade-in_600ms]"
          >
            <AlertDialog.Title className="text-2xl my-2 font-bold text-center">
              Yay! you won!
            </AlertDialog.Title>

            <h3 className="mb-2">Your stats for this artist</h3>
            <ArtistStats artistId={artistId} />

            <AlertDialog.Cancel asChild className="w-full z-20">
              <CTA>Cool</CTA>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default WinningScreen;
