"use client";
import MessageInput from "@/app/components/MessageInput";
import { useState, useEffect } from "react";

type Message = {
  uid: string;
  text: string;
};

export default function DirectMessage() {
  const [messages, setMessages] = useState<Message[]>([]);
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
        throw new Error("Error retriving messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
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
        body: text,
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
          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.uid}:</strong> {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Recipient's ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="bg-indigo-100 p-2 text-sm font-mono text-black rounded"
        />
        <div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
}
