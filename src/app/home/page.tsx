"use client";
import React, { useState, useEffect } from "react";
import MessageInput from "../components/MessageInput";
import MessageBox from "../components/MessageBox";
import NominateName from "./NominateName";
import Layout from "./layout";
import Sidebar from "./Sidebar";
import Link from "next/link";

const Home = () => {
  const [nominatedName, setNominatedName] = useState("");
  const [isNameModalOpen, setNameModalOpen] = useState(false);
  const id = sessionStorage.getItem("id");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("access-token", sessionStorage.getItem("access-token"));
  headers.append("client", sessionStorage.getItem("client"));
  headers.append("expiry", sessionStorage.getItem("expiry"));
  headers.append("uid", sessionStorage.getItem("uid"));

  useEffect(() => {
    handleAddUser();
    storeCurrentUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const requestBody = {
        id: 5079,
        member_id: id,
      };

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
      handleNominateName();
      console.log("Member has been added to the channel", data);
    } catch (error) {
      console.error("Error adding member to the channel:", error);
    }
  };

  const handleNominateName = async () => {
    try {
      const uid = sessionStorage.getItem("uid");
      const receiverId = 5079;
      const receiverClass = "Channel";

      const url = `http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`;

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const messageWithMatchingUid = data.data.find(
        (message: { body: string | string[] }) => {
          const uidIndex = message.body.indexOf(`uid: ${uid}`);
          return uidIndex !== -1;
        }
      );

      if (messageWithMatchingUid) {
        const bodyParts = messageWithMatchingUid.body.split(" ");
        const nameIndex = bodyParts.indexOf("name:");
        if (nameIndex !== -1 && nameIndex + 1 < bodyParts.length) {
          setNominatedName(bodyParts[nameIndex + 1]);
        }
      }
    } catch (error) {
      console.error("Error retrieving messages:", error);
    }
  };

  const closeName = async () => {
    setNameModalOpen(false);
    await handleNominateName();
  };

  const storeCurrentUsers = async () => {
    try {
      const uid = sessionStorage.getItem("uid");
      const receiverId = 5079;
      const receiverClass = "Channel";

      const url = `http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`;

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Raw Data", data);

      const filteredBody = data.data.map((item) => item.body);
      console.log("Body Array:", filteredBody);

      const convertedFilteredBody = filteredBody.map((item) => {
        const [uidKey, uidValue, nameKey, nameValue] = item.split(" ");
        const uid = uidValue.substring(uidValue.indexOf(":") + 1);
        const name = nameValue.substring(nameValue.indexOf(":") + 1);
        return { uid, name };
      });

      console.log("Converted Filter Body:", convertedFilteredBody);
      localStorage.setItem(
        "storedCurrentUsers",
        JSON.stringify(convertedFilteredBody)
      );
    } catch (error) {
      console.error("Error retrieving messages:", error);
    }
  };

  const shouldShowNominateName = !nominatedName;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex h-full border-2 border-solid border-white">
        {shouldShowNominateName && <NominateName closeName={closeName} />}
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
  );
};

export default Home;
