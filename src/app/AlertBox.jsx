import React from "react";

const Alert = ({ message, type }) => {
  let alertColor = "";

  if (type === "Success!") {
    alertColor = "green";
  } else if (type === "Warning!") {
    alertColor = "amber";
  } else if (type === "Error!") {
    alertColor = "red";
  } else if (type === "Info!") {
    alertColor = "blue";
  }

  return (
    <div className="fixed top-0 left-1 ms-20 mt-2">
      <div className={`bg-${alertColor}-500 text-white font-bold px-7 py-2`}>
        {type}
      </div>
      <div
        className={`border-${alertColor}-400 rounded-b bg-${alertColor}-100 px-9 py-3 text-${alertColor}-700`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
