import React from "react";

function MessageList({ message }) {
  if (!Array.isArray(message) || message.length === 0) {
    return (
      <div className="mt-4 px-1 font-sans text-base bg-indigo-200">
        <p>No messages available</p>
      </div>
    );
  }

  const isSent = message.sent;
  const backgroundColor = isSent ? "bg-blue-500" : "bg-received";

  return (
    <div className=" bg-indigo-200">
      <ul className="overflow-y-auto border-solid border-y-2 px-1 text-sm border-white">
        <li
          className={`max-h-52 flex flex-row place-content-between text-black ${backgroundColor}`}
        >
          <strong>{message.sender.uid}: </strong> {message.body}
          <span className="text-xs pl-5">
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default MessageList;

// import React from "react";

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
//       <div className="h-auto overflow-auto ">
//         <h2 className="mt-4 bg-indigo-200">Sent Messages</h2>
//         <ul className="border-solid border-y-2 px-1 text-sm border-white">
//           {userSentMessages.map((message, index) => (
//             <li key={index} className="mb-2">
//               <div className="border-solid border-2 border-indigo-300 p-2 rounded">
//                 <strong>{message.sender.email}:</strong> {message.body}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="h-auto overflow-auto">
//         <h2 className="mt-4 bg-white text-yellow-500">Received Messages</h2>
//         <ul className="border-solid border-y-2 px-1 text-sm border-white">
//           {userReceivedMessages.map((message, index) => (
//             <li key={index} className="mb-2">
//               <div className="border-solid border-2 border-white p-2 rounded">
//                 <strong>{message.receiver.email}:</strong> {message.body}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default MessageList;
