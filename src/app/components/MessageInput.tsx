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
  fetchMessages,
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
          id: loggedInUser.id,
          uid: loggedInUser.uid,
          text: message,
          sent: true,
          sender: loggedInUser,
        };
        setMessage("");
        fetchMessages();
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
    const messageElement = messageRef.current;

    if (messageElement) {
      const selectionStart = messageElement.selectionStart || 0;
      const selectionEnd = messageElement.selectionEnd || 0;

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
    const messageElement = messageRef.current;
    if (messageElement) {
      const cursorPosition = messageElement.selectionStart || 0;
      const textBeforeCursor = message.slice(0, cursorPosition);
      const textAfterCursor = message.slice(cursorPosition);

      if (textBeforeCursor.endsWith(`\n${orderedListCount}. `)) {
        setOrderedListCount(orderedListCount - 1);
      }

      setMessage(textBeforeCursor + textAfterCursor);
    }
  };

  const handleOrderedList = () => {
    const messageElement = messageRef.current;
    if (messageElement) {
      const cursorPosition = messageElement.selectionStart || 0;
      const formattedListItem = `${
        orderedListCount === 0 ? 1 : orderedListCount
      }. `;

      const textBeforeCursor = message.slice(0, cursorPosition);
      const textAfterCursor = message.slice(cursorPosition);

      const updatedMessage =
        textBeforeCursor + formattedListItem + textAfterCursor;

      setOrderedListCount(orderedListCount + 1);

      const newCursorPosition = cursorPosition + formattedListItem.length;

      setMessage(updatedMessage);

      messageElement.selectionStart = newCursorPosition;
      messageElement.selectionEnd = newCursorPosition;
      messageElement.focus();
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Backspace") {
      handleDeleteOrderedList();
    }
  };

  const handleUnorderedList = () => {
    const messageElement = messageRef.current;
    if (messageElement) {
      const cursorPosition = messageElement.selectionStart || 0;
      const formattedListItem = `• `;

      const textBeforeCursor = message.slice(0, cursorPosition);
      const textAfterCursor = message.slice(cursorPosition);

      const updatedMessage =
        textBeforeCursor + formattedListItem + textAfterCursor;

      setMessage(updatedMessage);

      const newCursorPosition = cursorPosition + formattedListItem.length;
      messageElement.selectionStart = newCursorPosition;
      messageElement.selectionEnd = newCursorPosition;
      messageElement.focus();
    }
  };

  const handleInsertEmoji = () => {
    setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
  };

  const emojiPickerContainerClasses = `
    absolute
    z-50
    bg-white
    border
    border-gray-300
    rounded
    max-h-32
    overflow-y-auto
    right-0
    bottom-10
  `;

  return (
    <div className="bg-indigo-500 rounded-md content-center">
      <div className="flex gap-2 m-1 pt-2 ml-2">
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
          className="w-full h-28 p-2 text-sm overflow-auto rounded-md bg-indigo-100"
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
          className="cursor-pointer hover:bg-yellow-500 ml-2 rounded"
          src="https://www.svgrepo.com/show/447618/emoticon-smile.svg"
          alt="Emoji-icon"
          width={20}
          height={20}
          onClick={handleInsertEmoji}
        />

        <div className="flex bg-indigo-500 hover:bg-yellow-200 justify-between rounded-md cursor-pointer">
          <span className="pt-1 pb-1 pr-1 ml-2 font-semibold text-sm">
            Send
          </span>
          <Image
            className="cursor-pointer mr-2"
            src="https://www.svgrepo.com/show/533310/send-alt-1.svg"
            alt="SendMessage-icon"
            width={20}
            height={20}
            onClick={handleSendMessage}
          />
        </div>
      </div>

      <div className="relative">
        <div className={emojiPickerContainerClasses}>
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

      {error && (
        <p className="flex items-center justify-center m-auto mt-1 px-3 text-black bg-yellow-300 text-sm font-bold rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default MessageInput;
