import { useState, useRef } from "react";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";
import { MessageInputProps, User } from "./types";

type SentMessage = {
  id: number;
  uid: string;
  text: string;
  sent: boolean;
  sender: User;
};

const MessageInput: React.FC<MessageInputProps> = ({
  receiverId,
  setMessages,
  loggedInUser,
  messages,

}) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState("");
  const [orderedListCount, setOrderedListCount] = useState(1);

  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const clearError = () => {
    setError("");
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      setError("Please enter a message.");
      return;
    }

    if (receiverId === 0) {
      setError("Please input the email of your recipient.");
      return;
    }

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "access-token",
        sessionStorage.getItem("access-token") || ""
      );
      headers.append("client", sessionStorage.getItem("client") || "");
      headers.append("expiry", sessionStorage.getItem("expiry") || "");
      headers.append("uid", sessionStorage.getItem("uid") || "");

      const response = await fetch("http://206.189.91.54/api/v1/messages", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          receiver_class: "User",
          receiver_id: receiverId,
          body: message,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data Sent:", data);
        console.log("Receiver ID:", receiverId);
        alert("Message sent!");

        const sentMessage: SentMessage = {
          id: 10002,
          uid: loggedInUser.uid,
          text: message,
          sent: true,
          sender: loggedInUser,
        };

        setMessages([...messages, sentMessage]);

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
      let newText = "";

      if (selectedText.startsWith(format) && selectedText.endsWith(format)) {
        newText =
          text.slice(0, selectionStart) +
          selectedText.slice(format.length, -format.length) +
          text.slice(selectionEnd);
      } else {
        newText =
          text.slice(0, selectionStart) +
          format +
          selectedText +
          format +
          text.slice(selectionEnd);
      }

      setMessage(newText);
    }
  };

  const handleDeleteOrderedList = () => {
    const cursorPosition = messageRef.current?.selectionStart || 0;
    const textBeforeCursor = message.slice(0, cursorPosition);
    const textAfterCursor = message.slice(cursorPosition);

    if (textBeforeCursor.endsWith("\n1. ")) {
      setOrderedListCount(1);
    }

    setMessage(textBeforeCursor + textAfterCursor);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Backspace") {
      handleDeleteOrderedList();
    }
  };

  const handleOrderedList = () => {
    const cursorPosition = messageRef.current?.selectionStart || 0;
    const formattedListItem = `${orderedListCount}. `;
    const updatedMessage =
      message.slice(0, cursorPosition) +
      formattedListItem +
      message.slice(cursorPosition);
    setOrderedListCount(orderedListCount + 1);
    setMessage(updatedMessage);
  };

  const handleUnorderedList = () => {
    const cursorPosition = messageRef.current?.selectionStart || 0;
    const formattedListItem = `• `;
    const updatedMessage =
      message.slice(0, cursorPosition) +
      formattedListItem +
      message.slice(cursorPosition);
    setMessage(updatedMessage);
  };

  const handleInsertEmoji = () => {
    setShowEmojiPicker(true);
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
            className="w-full h-auto p-1 text-sm overflow-auto rounded-md bg-indigo-100"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clearError();
            }}
            onKeyDown={handleKeyDown}
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

      {error && (
        <p className="flex items-center justify-center m-auto mt-4 py-1 px-3 text-black bg-yellow-300 text-sm font-bold rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default MessageInput;
