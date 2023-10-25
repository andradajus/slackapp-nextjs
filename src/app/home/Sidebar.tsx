"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Alert from "../AlertBox";

const Sidebar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const uid = sessionStorage.getItem("uid");
  const [keyValueArray, setKeyValueArray] = useState<
    {
      uid: string | null;
      email: string | null;
      username?: string;
      firstname?: string;
      middlename?: string;
      lastname?: string;
      aboutme?: string;
    }[]
  >([]);
  const [alert, setAlert] = useState([]);
  const showAlert = (message: any, type: any) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  useEffect(() => {
    retrieveUserDetails();
  }, []);

  const retrieveUserDetails = async () => {
    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${5133}&receiver_class=Channel`;

    try {
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
      const uidToMatch = uid;
      const matchingMessage = data.data.find((message: { body: string }) => {
        try {
          const bodyContent = JSON.parse(message.body);
          return bodyContent.uid === uidToMatch;
        } catch (error) {
          return false;
        }
      });

      if (matchingMessage) {
        const bodyContent = JSON.parse(matchingMessage.body);
        const keyValueData = [
          {
            uid: uidToMatch,
            email: uidToMatch,
            username: bodyContent.username,
            firstname: bodyContent.firstname,
            middlename: bodyContent.middlename,
            lastname: bodyContent.lastname,
            aboutme: bodyContent.aboutme,
          },
        ];
        setKeyValueArray(keyValueData);
      } else {
        setTimeout(() => {
          showAlert(
            "Hi, we've detected that you haven't registered yet. Please proceed to MyProfile",
            "Warning!"
          );
        }, 2000);
        console.log("No user with matching UID found.");
      }
    } catch (error) {
      console.error("Error retrieving message:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("client");
    sessionStorage.removeItem("expiry");
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("currentChannelID");
    sessionStorage.removeItem("storedReceiverId");
  };

  const Menus = [
    {
      title: "Home",
      src: "/Home-icon.png",
      alt: "My Account",
      href: "/home",
    },
    {
      title: "My Profile",
      src: "/Profile-icon.png",
      alt: "My Profile",
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
      href: "/",
      gap: true,
      onclick: handleLogout,
    },
  ];

  return (
    <>
      <Alert message={alert.message} type={alert.type} />
      <div className="flex border-r border-solid border-indigo-600">
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
            style={{ height: "auto" }}
            className={`absolute cursor-pointer -right-3 top-20 w-6 border-dark-purple bg-slate-100 opacity-50
         hover:bg-orange-200 rounded-full ${!open && "rotate-90"}`}
            onClick={() => setOpen(!open)}
          />

          <Link href="/home" passHref>
            <div className="flex gap-x-4 items-center mb-4 hover:scale-110">
              <Image
                src="/ConversaImage.png"
                alt="ConversaImage"
                width={75}
                height={75}
                style={{ width: "auto" }}
                className={`cursor-pointer duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              />
              <h1
                className={` text-lg font-bold mb-0 text-yellow-400 font-serif origin-left duration-200  hover:text-orange-300 hover:underline hover:scale-110 ${
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
              <div className="text-base font-sans font-bold">
                {keyValueArray.map((item, index) => (
                  <div key={index}>
                    <span>
                      <span>Hi, {item.firstname ?? "User"}!</span>
                    </span>
                  </div>
                ))}
              </div>
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
                      style={{ width: "auto" }}
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
