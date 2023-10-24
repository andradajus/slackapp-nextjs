import React from "react";
import { ForMessageInput } from "./types";

function MessageItem({ message }: { message: ForMessageInput }) {
  return (
    <li
      className={`max-h-52 flex flex-row justify-stretch ${
        message.sent ? "text-blue-500" : "text-received"
      }`}
    >
      <strong>{message.receiver.uid}:</strong> {message.body}
      <span className="text-xs pl-5">
        {new Date(message.created_at).toLocaleTimeString()}
      </span>
    </li>
  );
}

export default MessageItem;
