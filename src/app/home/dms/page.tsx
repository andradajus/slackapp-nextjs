import { useState, useEffect } from "react";

export default function DirectMessage() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    const response = await fetch("/api/messages");
    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (user.trim() === "" || text.trim() === "") return;

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, text }),
    });

    if (response.ok) {
      setText("");
      fetchMessages();
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
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
