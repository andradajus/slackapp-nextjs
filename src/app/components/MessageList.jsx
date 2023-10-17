import React from "react";

function MessageList({ messages }) {
  return (
    <ul className="border-solid border-y-2 border-white">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </ul>
  );
}

export default MessageList;
