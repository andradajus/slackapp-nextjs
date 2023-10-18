import React from "react";
import MessageItem from "./MessageItem";

function MessageList({ messages }) {
  if (!Array.isArray(messages)) {
    return (
      <div className="mt-4 px-1 font-sans text-base bg-indigo-200">
        <p>No messages available</p>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-indigo-200">
      <ul className="border-solid border-y-2 px-1 text-sm border-white">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
