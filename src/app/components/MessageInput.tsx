"use client";
import { useState } from "react";
import Image from "next/image";

const MessageInput = ({}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log("Message Sent"); //Sent message preparation
  };

  const handleBold = () => {
    console.log("Text is bold");
  };

  const handleItalic = () => {
    console.log("Text is italic");
  };

  const handleUnderline = () => {
    console.log("Text is underlined");
  };

  const handleStrikethrough = () => {
    console.log("Text is dashed?");
  };

  const handleInsertEmoji = () => {
    console.log("InsertEmoji");
  };

  const handleOrderedList = () => {
    console.log("New ordered list created");
  };

  const handleUnorderedList = () => {
    console.log("New unordered list created");
  };

  return (
    <div className="p-2 m-auto">
      <div className="bg-indigo-500 ml-1 mr-1 rounded-md content-center">
        <div className="flex gap-2 m-1 ml-2">
          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/491501/text-bold.svg"
            alt="Bold-icon"
            width={15}
            height={15}
            onClick={handleBold}
          />

          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/491503/text-italic.svg"
            alt="Italic-icon"
            width={15}
            height={15}
            onClick={handleItalic}
          />

          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/491504/text-underline.svg"
            alt="Underline-icon"
            width={15}
            height={15}
            onClick={handleUnderline}
          />

          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/376261/strikethrough.svg"
            alt="Strikethrough-icon"
            width={17}
            height={17}
            onClick={handleStrikethrough}
          />

          <span className="cursor-pointer" onClick={handleOrderedList}>
            OL
          </span>
          <span className="cursor-pointer" onClick={handleUnorderedList}>
            UL
          </span>
        </div>
        <textarea
          className="w-full mx-2 p-2 text-sm overflow-auto rounded-md bg-indigo-100"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex bg-indigo-500 justify-between rounded-md">
          <Image
            className="cursor-pointer hover:bg-yellow-500 ml-2"
            src="https://www.svgrepo.com/show/447618/emoticon-smile.svg"
            alt="Emoji-icon"
            width={17}
            height={17}
            onClick={handleInsertEmoji}
          />

          <Image
            className="cursor-pointer hover:bg-indigo-700 mr-2"
            src="https://www.svgrepo.com/show/533310/send-alt-1.svg"
            alt="SendMessage-icon"
            width={20}
            height={20}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
