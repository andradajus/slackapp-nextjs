import React from "react";

function MessageList({ messages, userData }) {
  const userFullName = `${sessionStorage.getItem("firstname") || "Unknown"} ${
    sessionStorage.getItem("lastname") || "User"
  }`;

  if (!Array.isArray(messages)) {
    return (
      <div className="mt-4 px-1 font-sans text-base font-semibold bg-indigo-200">
        <p>No messages available</p>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-indigo-200">
      {messages.map((message, index) => (
        <div key={index}>
          <span className="text-base font-bold font-sans">{userData}</span>{" "}
          <span className="text-xs pl-5">
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
          <div className="pb-1">
            <span className="max-w-sm break-all font-sans text-sm">
              {message.body}
            </span>
          </div>
        </div>
      ))}
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
