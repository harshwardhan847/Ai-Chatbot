"use client";
import { cn } from "@/lib/utils";
import { Message } from "ai";
import React, { useCallback, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import MarkdownRenderer from "@/noTaillwindComponents/MarkdownRenderer";
import { splitCodeFromText } from "@/utils";
import { Weather } from "../ai/components/Weather";
type Props = {
  messages: Message[];
};

const Messages = ({ messages }: Props) => {
  useEffect(() => {
    if (bottomOfMessagesRef?.current) {
      bottomOfMessagesRef?.current?.scrollIntoView();
    }
  }, [messages]);

  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);
  const lineProps = (lineNumber?: number) => {
    const style: { [any: string]: string } = { display: "block" };
    if (lineNumber && lineNumber % 2 === 0) {
      style.backgroundColor = "#ffdd5740";
      style.borderRadius = "0.25rem";
    }
    return { style };
  };
  const getAiResponse = useCallback((message: Message) => {
    console.log(message);
    if (!message) return null;

    if (message.toolInvocations) {
      return (
        <div>
          {message.toolInvocations?.map((toolInvocation) => {
            const { toolName, toolCallId, state } = toolInvocation;

            if (state === "result") {
              if (toolName === "weatherTool") {
                const { result } = toolInvocation;
                return (
                  <div key={toolCallId}>
                    <Weather {...result} />
                  </div>
                );
              }
            } else {
              return (
                <div key={toolCallId}>
                  {toolName === "weatherTool" ? (
                    <div>Loading weather...</div>
                  ) : null}
                </div>
              );
            }
          })}
        </div>
      );
    }

    const processedChat = splitCodeFromText(message.content);
    console.log(processedChat);

    const result = processedChat.map((value, index) => {
      return value.isCode ? (
        <div key={index + value?.text?.substring(0, 20)}>
          <div className="w-full flex items-center justify-start px-4 p-2">
            <p>{value?.language}</p>
          </div>
          <SyntaxHighlighter
            language="javascript"
            wrapLongLines
            lineProps={lineProps}
            style={solarizedlight}
            showLineNumbers
          >
            {value?.text}
          </SyntaxHighlighter>
        </div>
      ) : (
        <MarkdownRenderer key={index}>{value?.text}</MarkdownRenderer>
      );
    });
    return result;
  }, []);

  return messages.map((message) => (
    <div
      key={message.id}
      className={cn(
        "rounded-2xl p-4 mb-8 text-black dark:text-white min-w-12 ",
        message.role === "user"
          ? "bg-slate-200 self-end shadow-sm"
          : " self-start  w-full text-start text-pretty"
      )}
    >
      {message.role === "user" ? message?.content : getAiResponse(message)}
      <div ref={bottomOfMessagesRef} />
    </div>
  ));
};

export default Messages;
