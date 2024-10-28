"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import InputForm from "./components/InputForm";
import Messages from "./components/Messages";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      keepLastMessageOnError: true,
      onFinish: (message, { usage, finishReason }) => {
        console.log("Finished streaming message:", message);
        console.log("Token usage:", usage);
        console.log("Finish reason:", finishReason);
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
      onResponse: (response) => {
        console.log("Received HTTP response from server:", response);
      },
    });

  return (
    <div className="flex flex-col flex-1 gap-4 w-full h-full items-center relative justify-center container mx-auto">
      <div className="sticky top-0">
        <h1 className="p-4 px-8 rounded-2xl shadow-md text-2xl font-bold bg-slate-200 mt-2">
          Harsh&apos;s AI
        </h1>
      </div>

      <div className="flex flex-col w-full text-xl flex-1 items-start justify-start mb-20">
        <Messages messages={messages} />

        {isLoading && (
          <div className="flex gap-4 items-center justify-center">
            <div className="animate-pulse  w-5 h-5 rounded-full bg-black/50" />
            <Button
              type="button"
              size={"sm"}
              className="font-semibold text-lg "
              variant={"secondary"}
              onClick={() => stop()}
            >
              Stop
            </Button>
          </div>
        )}
        <InputForm
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          value={input}
        />
      </div>
    </div>
  );
}
