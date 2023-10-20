"use client";
import React, { useState, useEffect } from "react";
import MessageInput from "@/app/components/MessageInput";
import MessageList from "@/app/components/MessageList";

export default function DirectMessage() {
  const [messages, setMessages] = useState([]);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiverId, setReceiverId] = useState(0);
  const [users, setUsers] = useState([]);
  const [chosenRecipient, setChosenRecipient] = useState("");

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
        `http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=User`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fetch Messages", data);
        setMessages(data);
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
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  const chooseReceiver = (targetUid: string) => {
    const recipient = users.find(
      (user: { uid: string }) => user.uid === targetUid
    );

    if (recipient) {
      return recipient;
    }
    return null;
  };

  const handleSearchUserClick = () => {
    const targetUid = receiverEmail;
    const recipient = chooseReceiver(targetUid);

    if (recipient) {
      setReceiverId(recipient.id);
      setChosenRecipient(recipient);
      alert("Message will be sent to: " + targetUid);
      setReceiverEmail("");
    } else {
      alert("User not found!");
    }
  };

  const handleChangeRecipientClick = () => {
    setChosenRecipient("");
    setReceiverEmail("");
  };

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, []);

  return (
    <div className="h-screen border-solid border-2 border-white">
      <div className="m-3 p-3 flex flex-col justify-center content-center bg-indigo-800 rounded">
        <div className="flex flex-col">
          <p className="font-sans text-lg font-bold text-white  border-b-2 border-white">
            Inbox
          </p>
          <MessageList messages={messages} />
        </div>

        <form className="flex mt-5 flex-col">
          <label className="font-sans text-sm text-white font-bold">
            Send to:
            <p className="ml-3 text-base mb-2 text-yellow-300">
              {chosenRecipient.uid}
            </p>
          </label>

          <div className="w-1/2">
            {chosenRecipient && (
              <button
                className="m-auto ml-3 p-1 font-semibold border-solid border-2 rounded bg-indigo-500 text-xs hover:bg-indigo-700"
                type="button"
                onClick={handleChangeRecipientClick}
              >
                Change
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Enter email address"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            className="bg-indigo-100 p-1 mb-2 m-auto text-sm font-mono text-black rounded"
          />

          <button
            className="m-auto p-1 font-semibold border-solid border-2 rounded bg-indigo-500 text-xs  hover:bg-indigo-700"
            type="button"
            onClick={handleSearchUserClick}
          >
            Search User
          </button>
        </form>

        <div>
          <MessageInput receiverId={receiverId} fetchMessages={fetchMessages} />
        </div>
      </div>
    </div>
  );
}
