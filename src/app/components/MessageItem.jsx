import React from "react";

function MessageItem({ message }) {
  const isSent = message.sent;

  return (
    <li className={`overflow-y-auto max-h-52 ${isSent ? "text-blue-500" : ""}`}>
      <strong>{message.uid}:</strong> {message.text}
    </li>
  );
}

export default MessageItem;
