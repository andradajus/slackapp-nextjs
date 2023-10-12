"use client";
import { useState } from "react";

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

  const handleOrderedList = () => {
    console.log("New ordered list created");
  };

  const handleUnorderedList = () => {
    console.log("New unordered list created");
  };

  return (
    <>
      <div className="bg-amber-200">
        <div className="flex gap-2 bg-red-100">
          <span className="cursor-pointer" type="button" onClick={handleBold}>
            Bold
          </span>
          <span className="cursor-pointer" type="button" onClick={handleItalic}>
            Italic
          </span>

          <span
            className="cursor-pointer"
            type="button"
            onClick={handleUnderline}
          >
            Underline
          </span>

          <span
            className="cursor-pointer"
            type="button"
            onClick={handleStrikethrough}
          >
            Strikethrough
          </span>

          <span
            className="cursor-pointer"
            type="button"
            onClick={handleOrderedList}
          >
            OL
          </span>
          <span
            className="cursor-pointer"
            type="button"
            onClick={handleUnorderedList}
          >
            UL
          </span>
        </div>
        <input
          className="w-full pb-20"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex bg-cyan-200 justify-between">
          <span>Emojis</span>
          <span
            className="cursor-pointer"
            type="button"
            onClick={handleSendMessage}
          >
            Send Message
          </span>
        </div>
      </div>
    </>
  );
};

export default MessageInput;
