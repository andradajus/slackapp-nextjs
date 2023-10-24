import React from "react";

const AlertModal = ({ message, type }) => {
  let alertColor = "";

  if (type === "success") {
    alertColor += "green";
  } else if (type === "warning") {
    alertColor += "amber";
  } else if (type === "error") {
    alertColor += "red";
  } else if (type === "info") {
    alertColor += "blue";
  }

  return (
    <div className="flex w-full flex-col">
      <ul>
        <li
          className={`font-medium fixed top-0 left-1 ms-20 mt-2 w-auto bg-${alertColor}-200`}
        >
          {message}{" "}
        </li>
      </ul>
    </div>
  );
};

export default AlertModal;
