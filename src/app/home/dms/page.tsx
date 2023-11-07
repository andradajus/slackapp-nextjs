"use client";
import React, { useState, useEffect } from "react";
import MessageInput from "@/app/components/MessageInput";
import { Message, User } from "@/app/components/types";

export default function DirectMessage() {
  const loggedInUser = {
    id: parseInt(sessionStorage.getItem("id") || "0"),
    uid: sessionStorage.getItem("uid") || "",
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  //Gamit ko para sa filtering ng messages since doble nalabas sa inbox
  const [userMap, setUserMap] = useState<Map<number, User>>(new Map());

  const [chosenRecipient, setChosenRecipient] = useState<User | null>(null);
  //Para to dun sa kung gagamit ng first/lastnames
  //const [filteredData, setFilteredData] = useState<User[]>([]);

  const receiverId = parseInt(
    sessionStorage.getItem("storedReceiverId") || "0",
    10
  );

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, []);

  const fetchMessages = async () => {
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

      const response = await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${loggedInUser.id}&receiver_class=User`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data.data);
      } else {
        throw new Error("Error retrieving messages");
      }
    } catch (error) {
      console.error("Error retrieving messages:", error);
    }
  };

  const fetchUsers = async () => {
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

      const response = await fetch(`http://206.189.91.54/api/v1/users`, {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);

        const userMap = new Map();
        data.data.forEach((user: User) => {
          userMap.set(user.id, user);
        });
        setUserMap(userMap);
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  const chooseReceiver = (targetUid: string): User | null => {
    const recipient = users.find((user: User) => user.uid === targetUid);

    if (recipient) {
      sessionStorage.setItem("storedReceiverId", recipient.id.toString());
      return recipient;
    }
    return null;
  };

  const handleSearchUserClick = () => {
    const targetUid = receiverEmail;
    const recipient = chooseReceiver(targetUid);

    if (recipient) {
      setChosenRecipient(recipient);
      alert("Message will be sent to: " + targetUid);
      setReceiverEmail("");
    } else {
      alert("User not found!");
    }
  };

  const handleChangeRecipientClick = () => {
    setChosenRecipient(null);
    setReceiverEmail("");
  };

  const fetchMessageInterval = () => {
    const fetchAndSetMessages = async () => {
      await fetchMessages();

      const timerId = setInterval(fetchAndSetMessages, 1000);
      setIntervalId(timerId as unknown as number);
    };

    useEffect(() => {
      fetchMessageInterval();
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, []);
  };

  //Codes sana for having first and lastname kaso dahil wala naman stored sa storage mismo, wala nareretrieve
  // const renderMessages = () => {
  //   const renderedMessageIds = new Set();

  //   return messages.map((message, index) => {
  //     const messageId = message.id;
  //     const senderId = message.sender.id;

  //     if (!renderedMessageIds.has(messageId)) {
  //       renderedMessageIds.add(messageId);

  // const senderId = message.sender.id;
  // const userData = filteredData.find((data) => data.id == senderId);
  // const name = userData
  //   ? `${userData.firstname} ${userData.lastname}`
  //   : "Unknown User";

  const renderMessages = () => {
    const renderedMessageIds = new Set();

    return messages.map((message, index) => {
      const messageId = message.id;
      const senderId = message.sender.id;

      if (!renderedMessageIds.has(messageId)) {
        renderedMessageIds.add(messageId);

        const senderInfo = userMap.get(senderId);
        const senderName = senderInfo ? `${senderInfo.uid}` : "Unknown User";

        return (
          <ul key={index}>
            <li className="border-t border-black">
              <div>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between">
                    <span className="text-sm font-semibold text-yellow-300">
                      Sender: {senderName}
                    </span>{" "}
                    <span className="text-xs pl-3 items-end text-white">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="pb-1 text-white">
                    <span className="max-w-sm break-all text-sm">
                      {message.body}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="h-screen overflow-hidden border-solid border-3 border-white  bg-indigo-800">
      <div className="m-2 p-1 flex flex-col justify-center content-center">
        <p className="font-sans text-lg font-bold text-white border-b-2 border-white">
          Inbox
        </p>
      </div>
      <div className="h-2/5 p-3 overflow-y-auto flex flex-col">
        {renderMessages()}
      </div>

      <div className="h-3/5 m-2 p-1">
        <form className="flex flex-col">
          <p className="flex justify-center font-sans text-base mb-3 text-white font-bold">
            New Message
          </p>
          <label className="flex content-center justify-center font-sans text-sm mb-2 text-white font-bold">
            Send to:
            {chosenRecipient ? (
              <span className="ml-3 text-sm text-yellow-300">
                {chosenRecipient.uid}
              </span>
            ) : (
              <span className="ml-3 text-sm text-yellow-300">
                No recipient selected.
              </span>
            )}
            <span>
              {chosenRecipient && (
                <button
                  className="ml-3 text-sm font-semibold hover:text-white"
                  type="button"
                  onClick={handleChangeRecipientClick}
                >
                  Change
                </button>
              )}
            </span>
          </label>

          {chosenRecipient ? null : (
            <div className="flex content-end justify-end mt-2 mb-1">
              <input
                type="text"
                placeholder="Enter email address"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                className="bg-indigo-100 p-1 mr-2 text-sm font-sans text-black rounded"
              />

              <button
                className="p-1 font-semibold text-xs border-solid border-2 rounded bg-indigo-500 hover:bg-indigo-700"
                type="button"
                onClick={handleSearchUserClick}
              >
                Search
              </button>
            </div>
          )}
        </form>

        <div>
          <MessageInput
            receiverId={receiverId}
            loggedInUser={loggedInUser}
            messages={messages}
            setMessages={setMessages}
            fetchMessages={fetchMessages}
          />
        </div>
      </div>
    </div>
  );
}
