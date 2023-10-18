"use client";
import React, { useState, useEffect } from "react";
import MessageInput from "../components/MessageInput";
import MessageBox from "../components/MessageBox";

const addUserToChannel = async () => {
  try {
    const memberID = sessionStorage.getItem("id");
    const requestBody = {
      id: 5107,
      member_id: memberID,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("access-token", sessionStorage.getItem("access-token"));
    headers.append("client", sessionStorage.getItem("client"));
    headers.append("expiry", sessionStorage.getItem("expiry"));
    headers.append("uid", sessionStorage.getItem("uid"));

    const response = await fetch(
      `http://206.189.91.54/api/v1/channel/add_member`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Member has been added to the channel", data);
  } catch (error) {
    console.error("Error adding member to the channel:", error);
  }
};

const Home = () => {
  return (
    <>
      <button onClick={addUserToChannel}>Add User Here</button>
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex h-full border-2 border-solid border-white">
          <div className="flex flex-col flex-grow">
            <div className="h-3/4 bg-indigo-800 overflow-y-auto">
              <MessageBox />
            </div>
            <div className="h-1/4 bg-indigo-900 pt-5 overflow-y-auto">
              <MessageInput />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
