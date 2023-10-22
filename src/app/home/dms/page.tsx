"use client";
import React, { useState, useEffect } from "react";
import MessageInput from "@/app/components/MessageInput";
import MessageList from "@/app/components/MessageList";
import { Message, User } from "@/app/components/types";

export default function DirectMessage() {
  const loggedInUser = {
    id: parseInt(sessionStorage.getItem("id") || "0"),
    uid: sessionStorage.getItem("uid") || "",
  };

  const firstname = sessionStorage.getItem("firstname") || "Unknown";
  const lastname = sessionStorage.getItem("lastname") || "User";

  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [chosenRecipient, setChosenRecipient] = useState<User | null>(null);
  // const receiverId = sessionStorage.getItem("storedReceiverId");

  const receiverId = parseInt(
    sessionStorage.getItem("storedReceiverId") || "0",
    10
  );

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
        setMessages(data.data);
      } else {
        throw new Error("Error retrieving messages");
      }
    } catch (error) {
      console.error("Error retrieving messages:", error);
    }
  };

  const fetchMessageInterval = () => {
    setTimeout(() => {
      console.log("Insert interval here");
      fetchMessages();
    }, 1000);
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

  const chooseReceiver = (targetUid: string): User | null => {
    const recipient = users.find(
      (user: User) => user.uid === targetUid
      // (user: { uid: string; id: number }) => user.uid === targetUid
    ) as User | undefined;

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
      fetchMessages();
    } else {
      alert("User not found!");
    }
  };

  const handleChangeRecipientClick = () => {
    setChosenRecipient(null);
    setReceiverEmail("");
  };

  useEffect(() => {
    fetchMessages();
    fetchUsers();
    fetchMessageInterval();
  }, []);

  return (
    <div className="h-screen overflow-hidden border-solid border-2 bg-indigo-800 border-white">
      <div className="h-full m-2 p-1 flex flex-col justify-center content-center">
        <p className=" font-sans text-lg font-bold text-white border-b-2 border-white">
          Inbox
        </p>
        <div className="h-1/2 overflow-y-auto flex flex-col">
          <MessageList
            messages={messages}
            userData={`${firstname} ${lastname}`}
          />
        </div>

        <div className="bg-indigo-300 mt-4 rounded">
          <form className="flex m-1 flex-col">
            <label className="h-1/2 font-sans text-sm text-white font-semibold">
              Send to:
              {chosenRecipient ? (
                <p className="ml-3 text-base mb-2 text-yellow-300">
                  {chosenRecipient.uid}
                </p>
              ) : (
                <p className="ml-3 text-base mb-2 text-yellow-300">
                  No recipient selected.
                </p>
              )}
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
              className="w-[90%] bg-indigo-100 p-1 mb-2 m-auto text-sm font-mono text-black rounded"
            />

            <button
              className="m-auto p-1 font-semibold border-solid border-2 rounded bg-indigo-500 text-xs  hover:bg-indigo-700"
              type="button"
              onClick={handleSearchUserClick}
            >
              Search User
            </button>
          </form>
        </div>
        <div className="px-0 py-1 mt-2">
          <MessageInput
            receiverId={receiverId}
            loggedInUser={loggedInUser}
            messages={messages}
            setMessages={setMessages}
            fetchMessages={function (): void {}}
          />
        </div>
      </div>
    </div>
  );
}
