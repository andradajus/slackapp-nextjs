"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({}) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orderedListCount, setOrderedListCount] = useState(1);

  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      setError("Please enter a message");
      return;
    }

    try {
      const response = await fetch("http://206.189.91.54/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": "access-token",
          client: "client",
          expiry: "expiry",
          uid: "uid",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (response.ok) {
        setSuccess("Message sent!");
        setMessage("");
      } else {
        setError("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("An error occured while sending the message. Please try again.");
    }
  };

  const handleFormatText = (format: string) => {
    const text = message;
    const selectionStart = messageRef.current?.selectionStart;
    const selectionEnd = messageRef.current?.selectionEnd;

    if (selectionStart !== undefined && selectionEnd !== undefined) {
      const selectedText = text.slice(selectionStart, selectionEnd);
      const newText =
        text.slice(0, selectionStart) +
        format +
        selectedText +
        format +
        text.slice(selectionEnd);
      setMessage(newText);
    }
  };

  const handleOrderedList = () => {
    const formattedListItem = `${orderedListCount}. ${message}`;
    setOrderedListCount(orderedListCount + 1);
    const updatedMessage = `${message}\n${formattedListItem}`;
    setMessage(updatedMessage);
  };

  const handleUnorderedList = () => {
    const updatedMessage = `${message}\n• \n• \n`;
    setMessage(updatedMessage);
  };

  const handleInsertEmoji = () => {
    setShowEmojiPicker(true);
  };

  const handleEmojiSelect = (emoji: string) => {
    const updatedMessage = message + emoji;
    setMessage(updatedMessage);
  };

  return (
    <div className="p-2 m-auto">
      <div className="bg-indigo-500 ml-1 mr-1 rounded-md content-center">
        <div className="flex gap-2 m-1 py-2 ml-2">
          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/491501/text-bold.svg"
            alt="Bold-icon"
            width={15}
            height={15}
            onClick={() => handleFormatText("**")}
          />

          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/491503/text-italic.svg"
            alt="Italic-icon"
            width={15}
            height={15}
            onClick={() => handleFormatText("*")}
          />

          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/491504/text-underline.svg"
            alt="Underline-icon"
            width={15}
            height={15}
            onClick={() => handleFormatText("__")}
          />

          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/376261/strikethrough.svg"
            alt="Strikethrough-icon"
            width={17}
            height={17}
            onClick={() => handleFormatText("~~")}
          />

          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/532192/list.svg"
            alt="BulletsList-icon"
            width={17}
            height={17}
            onClick={handleUnorderedList}
          />

          <Image
            className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
            src="https://www.svgrepo.com/show/532190/list-ol.svg"
            alt="NumberedList-icon"
            width={17}
            height={17}
            onClick={handleOrderedList}
          />
        </div>
        <div className="mx-2">
          <textarea
            ref={messageRef}
            className="w-full p-1 text-sm overflow-auto rounded-md bg-indigo-100"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
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
        {showEmojiPicker && (
          <EmojiPicker
            onEmojiClick={(emojiObject) => {
              const updatedMessage = message + emojiObject.emoji;
              setMessage(updatedMessage);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MessageInput;
