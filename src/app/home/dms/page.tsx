"use client";
import React, { useState, useEffect } from "react";
import MessageInput from "@/app/components/MessageInput";
import MessageList from "@/app/components/MessageList";
import { Message, User } from "@/app/components/types";

export default function DirectMessage() {
  const loggedInUser = {
    id: parseInt(sessionStorage.getItem("id") || "0"),
    uid: sessionStorage.getItem("uid") || "",
    firstname: sessionStorage.getItem("firstname") || "",
    lastname: sessionStorage.getItem("lastname") || "",
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [chosenRecipient, setChosenRecipient] = useState<User | null>(null);

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
      fetchMessages();
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
    fetchMessages();
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

  return (
    <div className="h-screen overflow-hidden border-solid border-3 border-white  bg-indigo-800">
      <div className="m-2 p-1 flex flex-col justify-center content-center">
        <p className="font-sans text-lg font-bold text-white border-b-2 border-white">
          Inbox
        </p>
      </div>
      <div className="h-2/5 p-3 overflow-y-auto flex flex-col">
        <MessageList messages={messages} />
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
