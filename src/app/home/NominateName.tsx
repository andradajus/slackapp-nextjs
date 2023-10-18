"use client";
import React, { useState, useEffect } from "react";

const NominateName = ({ closeName }: { closeName: () => void }) => {
  const [nominatedName, setNominatedName] = useState("");
  const uid = sessionStorage.getItem("uid");

  const handleNominateName = async () => {
    const requestBody = {
      receiver_id: 5079, //Names Channel
      receiver_class: "Channel",
      body: `uid: ${uid} name: ${nominatedName}`,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "access-token",
      sessionStorage.getItem("access-token") || ""
    );
    headers.append("client", sessionStorage.getItem("client") || "");
    headers.append("expiry", sessionStorage.getItem("expiry") || "");
    headers.append("uid", sessionStorage.getItem("uid") || "");

    try {
      const response = await fetch("http://206.189.91.54/api/v1/messages", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(uid);
      console.log(nominatedName);
      console.log("Message sent successfully:", data);
      closeName();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-4 mx-auto max-w-2xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-yellow-200 outline-none focus:outline-none">
            <div className="flex items-start justify-center p-5">
              <h5 className="text-xl font-bold text-indigo-700 font-sans">
                Please tell us your name
              </h5>
            </div>

            <div className="bgrelative p-3 mx-4 flex-auto">
              <input
                className="flex text-center p-1 text-base w-full rounded-md shadow-md font-bold"
                type="text"
                placeholder="Nominate Name"
                value={nominatedName}
                onChange={(e) => setNominatedName(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end p-2">
              <button
                className="hover:text-indigo-700 hover:underline font-sans font-bold uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleNominateName}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NominateName;
