"useClient";
import Image from "next/image";
import { useState } from "react";

const ChannelMessages = ({}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const currentChannelID = sessionStorage.getItem("currentChannelID");
  const senderUID = sessionStorage.getItem("uid");

  const handleSendMessage = () => {
    const requestBody = {
      receiver_id: currentChannelID,
      receiver_class: "Channel",
      body: message,
    };

    const newMessage = {
      sender: senderUID,
      body: message,
      timestamp: new Date().toISOString(),
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "access-token",
      sessionStorage.getItem("access-token") || ""
    );
    headers.append("client", sessionStorage.getItem("client") || "");
    headers.append("expiry", sessionStorage.getItem("expiry") || "");
    headers.append("uid", sessionStorage.getItem("uid") || "");

    fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMessages([...messages, newMessage]);
        setMessage("");
        console.log("Channel Message sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });

    console.log("Message Sent");
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
      <div className="bg-white">
        <ul className="flex flex-col justify-end">
          {messages.map((msg, index) => (
            <li key={index}>
              <div className="bg-blue-400">
                <div className="text-xs">
                  <span>{msg.sender}</span>
                  <span>{msg.body}</span>
                </div>
                <span className="text-xs">React Button?</span>
              </div>
            </li>
          ))}
        </ul>
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
