"useClient";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";
import { useState, useEffect, useRef } from "react";

const ChannelMessages = ({}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const currentChannelID = sessionStorage.getItem("currentChannelID");
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState([]);
  const senderUID = sessionStorage.getItem("uid");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState("");
  const [orderedListCount, setOrderedListCount] = useState(1);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("access-token", sessionStorage.getItem("access-token") || "");
  headers.append("client", sessionStorage.getItem("client") || "");
  headers.append("expiry", sessionStorage.getItem("expiry") || "");
  headers.append("uid", sessionStorage.getItem("uid") || "");

  const clearError = () => {
    setError("");
  };

  const handleFormatText = (format: string) => {
    const text = message;

    const messageElement = messageRef.current;
    console.log("Formatted Text");

    if (messageElement) {
      const selectionStart = messageElement.selectionStart || 0;
      const selectionEnd = messageElement.selectionEnd || 0;

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
      console.log("New Message: ", newText);
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

  const retrieveMessages = async () => {
    const currentChannelID = sessionStorage.getItem("currentChannelID");
    if (!currentChannelID) return;

    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${currentChannelID}&receiver_class=Channel`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data?.data) {
        getMemberList();
        setMessages(Array.from(data.data));
        renderMessages();
      }
    } catch (error) {
      console.error("Error retrieving messages:", error);
    }
  };

  const handleSendMessage = async () => {
    const requestBody = {
      receiver_id: currentChannelID,
      receiver_class: "Channel",
      body: message,
    };

    try {
      const response = await fetch("http://206.189.91.54/api/v1/messages", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setMessage("");
      retrieveMessages;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const retrieveUserDetails = async () => {
    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${5133}&receiver_class=Channel`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const filteredData = data.data.map((item: { body: string }) => {
        const bodyContent = JSON.parse(item.body);
        return {
          firstname: bodyContent.firstname,
          lastname: bodyContent.lastname,
          id: bodyContent.id,
        };
      });
      setFilteredData(filteredData);
    } catch (error) {
      console.error("Error retrieving message:", error);
      return null;
    }
  };

  const getMemberList = async () => {
    const currentChannelID = sessionStorage.getItem("currentChannelID");

    if (!currentChannelID) {
      return null;
    }

    const url = `http://206.189.91.54/api/v1/channels/${currentChannelID}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const channelMembers = data.data.channel_members.map(
        (member: { user_id: any }) => member.user_id
      );

      setChannelMembers(channelMembers);
    } catch (error) {
      console.error("Error showing list of members:", error);
    }
  };

  const retrieveMessageInterval = () => {
    const retrieveAndSetMessages = async () => {
      await retrieveMessages();
      retrieveUserDetails();
      setupNextInterval();
    };

    const setupNextInterval = () => {
      const intervalTime = 10000;
      if (!intervalId) {
        const id = setInterval(retrieveAndSetMessages, intervalTime);
        setIntervalId(id);
      }
    };

    setupNextInterval();

    return () => {
      clearInterval(intervalId);
    };
  };

  useEffect(() => {
    const retrieveAndSetup = async () => {
      retrieveMessageInterval();
      console.log("Run use Effect");
    };

    retrieveAndSetup();

    return () => {
      retrieveMessageInterval();
    };
  }, []);

  const renderMessages = () => {
    return messages.map((msg, index) => {
      const senderId = msg.sender.id;
      const userData = filteredData.find((data) => data.id == senderId);
      const name = userData
        ? `${userData.firstname} ${userData.lastname}`
        : "Unknown User";

      return (
        <ul key={index}>
          <li className="border-t border-black">
            <div>
              <div className="flex flex-col">
                <div>
                  <span className="text-sm font-bold">
                    {name ? name : "Unknown User"}
                  </span>{" "}
                  <span className="text-xs pl-3">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <div className="pb-1">
                  <span className="max-w-sm break-all text-sm">{msg.body}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      );
    });
  };

  return (
    <div className="h-screen p-2 bg-indigo-800">
      <div className="flex flex-col rounded-lg ml-1 mr-1 p-2 bg-white h-96 max-h-96 overflow-y-auto">
        {renderMessages()}
      </div>

      <div className="p-1 py-2 w-full">
        <div className="bg-indigo-500 rounded-md content-center">
          <div className="flex gap-2 m-1 py-1 ml-2">
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
              className="w-full h-28 p-1 text-sm overflow-auto rounded-md bg-indigo-100"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                clearError();
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="flex flex-row bg-indigo-500 justify-between rounded-md">
            <Image
              className="cursor-pointer hover:bg-yellow-500 ml-2 rounded"
              src="https://www.svgrepo.com/show/447618/emoticon-smile.svg"
              alt="Emoji-icon"
              width={20}
              height={20}
              onClick={handleInsertEmoji}
            />

            <div
              className="flex bg-indigo-500 hover:bg-yellow-200 rounded-md cursor-pointer"
              onClick={handleSendMessage}
            >

              <span className="pt-1 pb-1 pr-1 ml-2 font-semibold text-sm">
                Send
              </span>
              <Image
                className="cursor-pointer mr-1"
                src="https://www.svgrepo.com/show/533310/send-alt-1.svg"
                alt="SendMessage-icon"
                width={20}
                height={20}
              />
            </div>
          </div>

          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={(emojiObject) => {
                const updatedMessage = message + emojiObject.emoji;
                setMessage(updatedMessage);
              }}
            />
          )}

          {error && (
            <p className="flex items-center justify-center m-auto mt-4 py-1 px-3 text-black bg-yellow-300 text-sm font-bold rounded">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelMessages;
