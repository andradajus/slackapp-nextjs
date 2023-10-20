import React from "react";

function MessageItem({ message }) {
  const isSent = message.sent;

  return (
    <li className={`overflow-y-auto max-h-52 ${isSent ? "text-blue-500" : ""}`}>
      <strong>{message.sender.email}:</strong> {message.body}
    </li>
  );
}

export default MessageItem;
