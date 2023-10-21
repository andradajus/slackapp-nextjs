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

  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverEmail, setReceiverEmail] = useState("");
  // const [receiverId, setReceiverId] = useState<number>(0);
  const [users, setUsers] = useState([]);
  const [chosenRecipient, setChosenRecipient] = useState<User | null>(null);
  const receiverId = sessionStorage.getItem("storedReceiverId");
  // const receiverId = parseInt(
  //   sessionStorage.getItem("storedReceiverId") || "0",
  //   10
  // );

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
    );

    if (recipient) {
      sessionStorage.setItem("storedReceiverId", recipient.id);
      return recipient;
    }

    // if (recipient) {
    //   sessionStorage.setItem(
    //     "storedReceiverId",
    //     (recipient as User).id.toString()
    //   );
    //   return recipient as User;
    // }

    return null;
  };

  // const handleSearchUserClick = () => {
  //   const targetUid = receiverEmail;
  //   const recipient = chooseReceiver(targetUid);

  //   if (recipient) {
  //     // setReceiverId(recipient.id);
  //     setChosenRecipient(recipient);
  //     alert("Message will be sent to: " + targetUid);
  //     setReceiverEmail("");
  //   } else {
  //     alert("User not found!");
  //   }
  // };

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

  // useEffect(() => {
  //   fetchMessages();
  // }, [receiverId]);

  // useEffect(() => {
  //   fetchUsers();
  // }, [loggedInUser]);

  useEffect(() => {
    fetchMessages();
    fetchUsers();
    fetchMessageInterval();
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
          <MessageInput
            receiverId={receiverId}
            loggedInUser={loggedInUser}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
}
