"useClient";
import Image from "next/image";
import { useState, useEffect } from "react";

const ChannelMessages = ({}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const currentChannelID = sessionStorage.getItem("currentChannelID");
  const [filteredData, setFilteredData] = useState([]);
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
      retrieveMessages();
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

      const filteredData = data.data.map((item) => {
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
      console.error("No currentChannelID found in sessionStorage.");
      return;
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
        (member) => member.user_id
      );

      setChannelMembers(channelMembers);
    } catch (error) {
      console.error("Error showing list of members:", error);
    }
  };

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
                  <span className="text-md font-bold">{name}</span>{" "}
                  <span className="text-xs pl-3">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <div className="pb-1">
                  <span className="max-w-sm break-all">{msg.body}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      );
    });
  };

  useEffect(() => {
    retrieveUserDetails();
    retrieveMessages();
  }, [currentChannelID]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col rounded-lg ml-1 mr-1 p-2 bg-white h-96 max-h-96 overflow-y-auto">
          {renderMessages()}
        </div>

        <div className="p-1 w-full">
          <div className="bg-indigo-500 ml-1 mr-1 rounded-md content-center p-2">
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
              className="w-full h-20 overflow-auto rounded-md pl-1 pr-1 text-sm resize-none "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex bg-indigo-500 justify-between rounded-md ">
              <Image
                className="cursor-pointer hover:bg-yellow-500 ml-2"
                src="https://www.svgrepo.com/show/447618/emoticon-smile.svg"
                alt="Emoji-icon"
                width={17}
                height={17}
                onClick={handleStrikethrough}
              />
              <div
                className="flex flex-row cursor-pointer 
              hover:bg-indigo-700
              bg-yellow-200 rounded-md mt-1 pr-1 pl-1
              font-bold"
                onClick={handleSendMessage}
              >
                <span className="pt-1 pb-1 pr-1 text-sm ">Send Message</span>
                <Image
                  src="https://www.svgrepo.com/show/533310/send-alt-1.svg"
                  alt="SendMessage-icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelMessages;
