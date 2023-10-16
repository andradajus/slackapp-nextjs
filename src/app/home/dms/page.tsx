"use client";
import { useState, useEffect } from "react";

export default function DirectMessage() {
  const [messages, setMessages] = useState([]);
  const [uid, setUid] = useState("");
  const [text, setText] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const fetchMessages = async () => {
    const response = await fetch("http://206.189.91.54/api/v1/messages");
    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (uid.trim() === "" || text.trim() === "" || receiverId.trim() === "")
      return;

    const requestBody = {
      receiver_id: receiverId,
      receiver_class: "User",
      body: text,
    };

    const response = await fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      setText("");
      fetchMessages();
    }
  };

  return (
    <div className="m-3 p-3 flex flex-col justify-center content-center bg-indigo-500">
      <div>
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
        className="bg-indigo-300 text-black"
      />
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
