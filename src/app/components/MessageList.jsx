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

// import React from "react";
// import MessageItem from "./MessageItem";

// function MessageList({ messages }) {
//   const userSentMessages = messages.filter((message) => message.sentByUser);
//   const userReceivedMessages = messages.filter(
//     (message) => !message.sentByUser
//   );

//   if (!Array.isArray(messages)) {
//     return (
//       <div className="mt-4 px-1 font-sans text-base bg-indigo-200">
//         <p>No messages available</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div>
//         <h2 className="mt-4 bg-indigo-200">Sent Messages</h2>
//         <ul className="border-solid border-y-2 px-1 text-sm border-white">
//           {userSentMessages.map((message, index) => (
//             <MessageItem key={index} message={message} />
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2 className="mt-4 bg-white text-yellow-500">Received Messages</h2>
//         <ul className="border-solid border-y-2 px-1 text-sm border-white">
//           {userReceivedMessages.map((message, index) => (
//             <MessageItem key={index} message={message} />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default MessageList;
