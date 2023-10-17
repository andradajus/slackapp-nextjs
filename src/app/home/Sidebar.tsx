"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NominateName from "./NominateName";
import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [nominatedName, setNominatedName] = useState("");
  const [isNameModalOpen, setNameModalOpen] = useState(false);
  const [open, setOpen] = useState(true);

  const handleNominateName = async () => {
    try {
      const uid = sessionStorage.getItem("uid");
      const receiverId = 3907; //name channel natin :D
      const receiverClass = "User";

      const url = `http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`;

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "access-token",
        sessionStorage.getItem("access-token") || ""
      );
      headers.append("client", sessionStorage.getItem("client") || "");
      headers.append("expiry", sessionStorage.getItem("expiry") || "");
      headers.append("uid", sessionStorage.getItem("uid") || "");

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

  const handleLogout = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("client");
    sessionStorage.removeItem("expiry");
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("id");
    router.push("/login");
  };

  useEffect(() => {
    handleNominateName();
  }, []);

  const closeName = async () => {
    setNameModalOpen(false);
    console.log("closeMemberModal");
    await handleNominateName();
  };

  const Menus = [
    {
      title: "My Profile",
      src: "/Home-icon.png",
      alt: "My Account",
      href: "/home/myprofile",
    },
    {
      title: "Direct Message",
      src: "/dm-icon.png",
      alt: "Dms",
      href: "/home/dms",
    },
    {
      title: "Channels",
      src: "/channels-icon.png",
      alt: "Channels",
      href: "/home/channels",
      gap: true,
    },
    {
      title: "Logout",
      src: "/logout-icon.png",
      alt: "Logout",
      href: "/login",
      gap: true,
      onclick: handleLogout,
    },
  ];

  const shouldShowNominateName = !nominatedName;

  return (
    <>
      {shouldShowNominateName && <NominateName closeName={closeName} />}
      <div className="flex">
        <div
          className={` ${
            open ? "w-72" : "w-20"
          } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
        >
          <Image
            src="https://www.svgrepo.com/show/532195/menu.svg"
            alt="Menu"
            width={25}
            height={25}
            className={`absolute cursor-pointer -right-3 top-20 w-6 border-dark-purple bg-white
         hover:bg-orange-200 rounded-full ${!open && "rotate-90"}`}
            onClick={() => setOpen(!open)}
          />

          <Link href="/home" passHref>
            <div className="flex gap-x-4 items-center mb-4">
              <Image
                src="/ConversaImage.png"
                alt="ConversaImage"
                width={75}
                height={75}
                className={`cursor-pointer duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              />
              <h1
                className={`block text-lg font-bold mb-0 text-yellow-400 font-serif origin-left duration-200 ${
                  !open && "scale-0"
                }`}
              >
                Conversa
              </h1>
            </div>
          </Link>

          <section
            className={`block text-lg font-bold mb-0 text-yellow-400 font-serif origin-left duration-200 ${
              !open && "scale-0"
            }`}
          >
            <div className="flex justify-left content-center pl-2 pt-4">
              <p className="text-base font-sans font-bold">
                <span>Hi,</span> <span>{" " + nominatedName + "!"}</span>
              </p>
            </div>
          </section>

          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
              >
                <Link
                  href={Menu.href}
                  className=" hover:text-orange-300 hover:underline hover:scale-110 ease-in-out duration-300"
                >
                  <div className="flex flex-row" onClick={Menu.onclick}>
                    <Image
                      alt={Menu.alt}
                      src={Menu.src}
                      width={30}
                      height={30}
                    />

                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200 pl-2 pt-1`}
                    >
                      {Menu.title}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
