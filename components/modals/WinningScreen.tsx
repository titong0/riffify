import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import { Artist, Attempt, Game_Song } from "../../shared/schemas";
import CTA from "../common/CTA";
import SongSnippet from "./SongSnippet";
import AlertDialogWrapper from "../common/AlertDialogWrapper";
import { BsCheck, BsClipboard, BsClipboard2, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import { MdContentCopy } from "react-icons/md";
import { host } from "../../config";

type WinningScreenProps = {
  artist: Artist;
  song: Game_Song;
  attempts: Attempt[];
};
const WinningScreen = ({ song, attempts, artist }: WinningScreenProps) => {
  const [open, setOpen] = useState(true);
  const attemptCount = attempts.length;
  return (
    <AlertDialog.Root open={open} onOpenChange={(e) => setOpen(e)}>
      <AlertDialog.Trigger>
        <BsCheck />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black bg-opacity-80 animate-[fade-in_300ms] fixed inset-0 z-40" />
        <AlertDialog.Content>
          <AlertDialogWrapper>
            <AlertDialog.Title className="my-2 text-2xl font-bold text-center">
              {" "}
              You won!
            </AlertDialog.Title>
            {/* <ArtistStats artistId={artistId} /> */}
            <SongSnippet
              title={
                <>
                  You guessed the song in
                  <span className="font-bold"> {attemptCount} </span>
                  {attemptCount === 1 ? "attempt" : "attempts"}
                </>
              }
              song={song}
            />
            <div className="flex items-center w-full py-2 border-t-4 border-white justify-evenly">
              <a
                target="_blank"
                href={twitterIntent(artist.name, artist.id, attemptCount)}
                className="flex items-center justify-around gap-3 p-1 px-2 bg-blue-500 rounded-2xl"
              >
                Tweet your score <BsTwitter size={20} />
              </a>
              <span>{createSquares(attempts)}</span>
              <button
                onClick={() =>
                  copyToClipBoard(artist.name, artist.id, attemptCount)
                }
                className="p-2 bg-black rounded-2xl"
              >
                <MdContentCopy size={20} />
              </button>
            </div>
            <AlertDialog.Cancel asChild className="w-full">
              <CTA className="w-full">Cool</CTA>
            </AlertDialog.Cancel>
          </AlertDialogWrapper>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

function twitterIntent(
  artistName: string,
  artistId: string,
  attemptCount: number
) {
  const attemptsText = attemptCount === 1 ? "attempt" : "attempts";
  const capitalizedName = artistName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const text = `I guessed today's song for ${artistName} in ${attemptCount} ${attemptsText}. Can you do better?`;

  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.append("text", text);
  url.searchParams.append("hashtags", capitalizedName);
  url.searchParams.append("hashtags", "heardle");
  url.searchParams.append("hashtags", "riffify");
  url.searchParams.append("url", `https://${host}/artist/${artistId}`);
  return url.toString();
}

function copyToClipBoard(
  artistName: string,
  artistId: string,
  attemptCount: number
) {
  const attemptsText = attemptCount === 1 ? "attempt" : "attempts";
  const text = `I guessed today's song for ${artistName} in ${attemptCount} ${attemptsText}. Can you do better?.
  Try for yourself at ${host}/artist/${artistId}.`;
  return navigator.clipboard.writeText(text);
}

function createSquares(attempts: Attempt[]) {
  const mapping: Record<Attempt["type"], string> = {
    Skip: "⬛",
    Fail: "🟥",
    Success: "🟩",
  };
  return attempts
    .map((att) => mapping[att.type])
    .join("")
    .padEnd(6, "⬜");
}

export default WinningScreen;
