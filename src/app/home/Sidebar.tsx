'use client'

import Image from "next/image";
import Link from "next/link";
import NominateName from "./NominateName";
import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [nominatedName, setNominatedName] = useState("");
  const [isNameModalOpen, setNameModalOpen] = useState(false);

  const handleNominateName = async () => {
    try {
      const uid = sessionStorage.getItem("uid");
      const receiverId = 3907;
      const receiverClass = "User";

      const url = `http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`;

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("access-token", sessionStorage.getItem("access-token"));
      headers.append("client", sessionStorage.getItem("client"));
      headers.append("expiry", sessionStorage.getItem("expiry"));
      headers.append("uid", sessionStorage.getItem("uid"));

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const messageWithMatchingUid = data.data.find((message) => {
        const uidIndex = message.body.indexOf(`uid: ${uid}`);
        return uidIndex !== -1;
      });

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

  useEffect(() => {
    handleNominateName();
  }, []);

  const closeName = async () => {
    setNameModalOpen(false);
    console.log("closeMemberModal");
    await handleNominateName();
  };

  const shouldShowNominateName = !nominatedName;

  return (
    <div className="border-2 border-solid border-white">
      <div className="w-32 flex flex-col h-screen bg-indigo-900 text-white">
        <header className="m-0 mt-2 p-3 pb-10 flex content-center justify-center">
          <h1 className="block text-lg font-bold mb-0 text-yellow-400 font-serif">
            Conversa
            <Image
              src="/ConversaImage.png"
              alt="ConversaImage"
              width={75}
              height={75}
              className="px-auto"
            />
          </h1>
        </header>

        <section>
          {shouldShowNominateName && <NominateName closeName={closeName} />}
          <div className="flex justify-left content-center pl-2 pt-4 pb-10">
            <p className="text-base font-sans font-bold">
              Hi, <span>{" " + nominatedName + "!"}</span>
            </p>
          </div>
        </section>

        <section className="m-auto text-center flex flex-col text-xs font-sans font-medium cursor-pointer">
          <Link
            href="/home/myprofile"
            className="pt-4 self-center hover:text-orange-300 hover:underline"
          >
            My Account
            <Image
              src="/Home-icon.png"
              alt="home-icon"
              width={65}
              height={65}
              className="px-4 pt-1 pb-2"
            />
          </Link>

          <Link
            href="/home/dms"
            className="self-center hover:text-orange-300 hover:underline"
          >
            Direct Messages
            <Image
              src="/dm-icon.png"
              alt="dm-icon"
              width={65}
              height={65}
              className="px-4 pt-1 pb-2 m-auto"
            />
          </Link>
          <Link
            href="/home/channels"
            className="self-center hover:text-orange-300 hover:underline"
          >
            My Channels
            <Image
              src="/channels-icon.png"
              alt="channels-icon"
              width={65}
              height={65}
              className="px-4 pt-1 pb-2"
            />
          </Link>
          <Link
            href="/home/login"
            className="pb-2 self-center hover:text-orange-300 hover:underline"
          >
            Logout
            <Image
              src="/logout-icon.png"
              alt="logout-icon"
              width={65}
              height={65}
              className="px-4 pt-1 pb-2"
            />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
