import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState, useEffect } from "react";
import AlertDialogWrapper from "../common/AlertDialogWrapper";
import CTA from "../common/CTA";
import { AiOutlineQuestion } from "react-icons/ai";
import { BsHeadphones, BsMusicNote, BsMusicNoteBeamed } from "react-icons/bs";
import { GiMusicalNotes } from "react-icons/gi";

const InstructionsWrapper = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <AiOutlineQuestion size={20} />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black bg-opacity-80 animate-[fade-in_300ms] fixed inset-0 z-40" />
        <AlertDialog.Content className="h-72">
          <AlertDialogWrapper>
            <AlertDialog.Title className="my-2 text-2xl font-bold text-center">
              How to play
            </AlertDialog.Title>
            <div className="flex items-center h-full">
              <InstructionsText />
            </div>
            <AlertDialog.Action asChild>
              <CTA className="w-full p-1">Cool</CTA>
            </AlertDialog.Action>
          </AlertDialogWrapper>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

const InstructionsText = () => {
  return (
    <ul className="flex flex-col justify-around my-auto list-disc h-4/6">
      <li className="flex items-center gap-2">
        <BsMusicNote size={40} />A random song is chosen every day, and you have
        to guess it.
      </li>
      <li className="flex items-center gap-2">
        <BsHeadphones size={40} />
        You get to listen to a short 2-second clip to help you guess.
      </li>
      <li className="flex items-center gap-2">
        <GiMusicalNotes size={40} />
        Each fail or Skip unlocks more playing time to guess the song
      </li>
    </ul>
  );
};

export const Instructions = InstructionsWrapper;
