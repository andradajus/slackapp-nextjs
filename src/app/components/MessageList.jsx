import React from "react";

function MessageList({ messages }) {
  return (
    <div className="mt-4 bg-indigo-200">
      <ul className="border-solid border-y-2 px-1 text-sm border-white">
        Messages should appear here
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
