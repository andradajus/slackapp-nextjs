"use client";
import MessageInput from "@/app/components/MessageInput";
import { useState, useEffect, useRef } from "react";
import MessageList from "@/app/components/MessageList";

export default function DirectMessage() {
  const [messages, setMessages] = useState([]);
  const [uid, setUid] = useState("");
  const [text, setText] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://206.189.91.54/api/v1/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        throw new Error("Error retrieving messages");
      }
    } catch (error) {
      console.error("Error retrieving messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (uid.trim() === "" || text.trim() === "" || receiverId.trim() === "") {
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

      const requestBody = {
        receiver_id: receiverId,
        receiver_class: "User",
        message: text,
      };

      const response = await fetch("http://206.189.91.54/api/v1/messages", {
        method: "POST",
        headers: headers,
        // {"Content-Type": "application/json"},
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setText("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-screen border-solid border-2 border-white">
      <div className="m-3 p-3 flex flex-col justify-center content-center bg-indigo-800 rounded">
        <div className="flex flex-col">
          <p className="font-sans text-lg font-bold text-white  border-b-2 border-white">
            Inbox
          </p>
          <MessageList messages={messages} />
        </div>
        <form className="flex mt-5">
          <input
            type="text"
            placeholder="Send to:"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="bg-indigo-100 p-2 mb-4 text-sm font-mono text-black rounded"
          />

          <button className="m-auto px-2 flex justify-center align-center content-center border-solid border-2 rounded bg-indigo-500">
            Confirm
          </button>
        </form>
        <div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
}
