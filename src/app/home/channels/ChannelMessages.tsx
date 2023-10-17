"useClient";
import Image from "next/image";
import { useState, useEffect } from "react";

const ChannelMessages = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const currentChannelID = sessionStorage.getItem("currentChannelID");
  const [filteredNames, setFilteredNames] = useState([]);
  const senderUID = sessionStorage.getItem("uid");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("access-token", sessionStorage.getItem("access-token") || "");
  headers.append("client", sessionStorage.getItem("client") || "");
  headers.append("expiry", sessionStorage.getItem("expiry") || "");
  headers.append("uid", sessionStorage.getItem("uid") || "");

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
        setMessages(Array.from(data.data));
        console.log("Messages retrieved:", data.data);
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

    const newMessage = {
      sender: senderUID,
      body: message,
      timestamp: new Date(),
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

      const data = await response.json();
      setMessages([...messages, newMessage]);
      setMessage("");
      console.log("Message Sent");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getNameForUID = (uid) => {
    const userData =
      JSON.parse(localStorage.getItem("storedCurrentUsers")) || {};
    const matchingData = userData.find((data) => data.uid === uid);
    return matchingData ? matchingData.name : uid;
  };

  const renderMessages = () => {
    return Array.from(messages).map((msg, index) => {
      const uid = msg.sender.uid;
      const name = getNameForUID(uid);

      console.log(`UID: ${uid}, Name: ${name}`);

      return (
        <li key={index}>
          <div className={`bg-${index % 2 === 0 ? "blue" : "green"}-400`}>
            <div className="flex flex-col text-xs">
              <span>{name}</span>
              <span>{msg.body}</span>
              <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
            </div>
            <span className="text-xs">React Button?</span>
          </div>
        </li>
      );
    });
  };

  useEffect(() => {
    retrieveMessages();
  }, [currentChannelID]);

  return (
    <>
      <div className="bg-white">
        <ul className="flex flex-col justify-end">{renderMessages()}</ul>
      </div>
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
            className="w-full overflow-auto h-28 rounded-md p-2 bg-indigo-100"
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
              onClick={handleStrikethrough}
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
    </>
  );
};

export default ChannelMessages;
