// import React from "react";
// import { ForMessageInput } from "./types";

// function MessageItem({ message }: { message: ForMessageInput }) {
//   const isSent = message.sent;
//   const backgroundColor = isSent ? "bg-blue-500" : "bg-received";

//   return (
//     <li
//       className={`max-h-52 flex flex-row place-content-between text-black ${backgroundColor}`}
//     >
//       <strong>{message.sender.uid}: </strong> {message.body}
//       <span className="text-xs pl-5">
//         {new Date(message.created_at).toLocaleTimeString()}
//       </span>
//     </li>
//   );
// }

// export default MessageItem;

// import React from "react";
// import { ForMessageInput, User } from "./types";

// function MessageItem({
//   message,
//   loggedInUser,
// }: {
//   message: ForMessageInput;
//   loggedInUser: User;
// }) {
//   const isSent = message.sender.id === loggedInUser.id;
//   const senderName = isSent
//     ? "You"
//     : `${message.receiver ? message.receiver.firstname : ""} ${
//         message.sender.lastname
//       }`;
//   const backgroundColor = isSent ? "bg-blue-500" : "bg-received";

//   return (
//     <li
//       className={`max-h-52 flex flex-row place-content-between text-black ${backgroundColor}`}
//     >
//       <strong>{senderName}: </strong> {message.body}
//       <span className="text-xs pl-5">
//         {new Date(message.created_at).toLocaleTimeString()}
//       </span>
//     </li>
//   );
// }

// export default MessageItem;
