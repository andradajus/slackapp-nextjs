import React from "react";

function MessageItem({ message }) {
  return (
    <li className="overflow-y-auto max-h-52">
      <strong>{message.uid}:</strong> {message.text}
    </li>
  );
}

export default MessageItem;
