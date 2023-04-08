import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import { Game_Song } from "../shared/schemas";
import CTA from "./common/CTA";
import SongSnippet from "./modals/SongSnippet";
import AlertDialogWrapper from "./common/AlertDialogWrapper";

type FailScreenProps = {
  artistId: string;
  song: Game_Song;
};
const FailScreen = ({ song }: FailScreenProps) => {
  const [open, setOpen] = useState(true);

  return (
    <AlertDialog.Root open={open} onOpenChange={(e) => setOpen(e)}>
      <AlertDialog.Trigger />
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black bg-opacity-80 animate-[fade-in_300ms] fixed inset-0 z-40" />
        <AlertDialog.Content>
          <AlertDialogWrapper>
            <AlertDialog.Title className="my-2 text-2xl font-bold text-center">
              {" "}
              You won!
            </AlertDialog.Title>
            {/* <ArtistStats artistId={artistId} /> */}
            <SongSnippet song={song} title={"You failed miserably"} />

            <AlertDialog.Cancel asChild className="w-full">
              <CTA className="w-full">Cool</CTA>
            </AlertDialog.Cancel>
          </AlertDialogWrapper>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default FailScreen;
