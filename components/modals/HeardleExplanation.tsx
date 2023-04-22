import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState, useEffect } from "react";
import AlertDialogWrapper from "../common/AlertDialogWrapper";
import CTA from "../common/CTA";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const HeardleExplanationDisplay = ({}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <AiOutlineQuestionCircle
          className="absolute top-0 text-red-300 right-1"
          size={10}
        />
        <AiOutlineQuestionCircle
          className="text-transparent bg-transparent"
          size={10}
        />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black bg-opacity-80 animate-[fade-in_300ms] fixed inset-0 z-40" />
        <AlertDialog.Content>
          <AlertDialogWrapper>
            <AlertDialog.Title className="text-2xl font-bold text-center">
              What is a heardle?
            </AlertDialog.Title>
            <HeardleExplanation />
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

const HeardleExplanation = ({}: {}) => {
  return (
    <>
      <div className="w-full h-full sm:px-8 sm:grid min-h-96">
        <ul className="flex flex-col justify-around my-2 list-disc">
          <li>Everyday, a random song for each artist is selected.</li>
          <li>
            You, your friends, a person on the other side of the planet,{" "}
            <span className="p-1 text-red-400 underline border-white">
              <span className="text-red-600">Everyone</span> gets the same song.
            </span>
          </li>
          <li>
            You try to guess today&apos;s song with as few seconds as possible.
          </li>
          <li>
            You can then compare your score and come back tomorrow for another
            challenge.
          </li>
        </ul>
      </div>
    </>
  );
};
