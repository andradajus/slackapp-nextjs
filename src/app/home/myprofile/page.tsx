"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const MyProfile = ({ nominatedName, username }) => {
  /*naglalagay-lagay lang muna para matry*/
  const [email, setEmail] = useState("");

  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    const userEmail = sessionStorage.getItem("uid", uid);
    setEmail(userEmail);
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col text-left bg-indigo-900 text-white">
        <header className="m-0 p-10">
          <h1 className="inline-flex text-3xl font-bold mb-0 text-yellow-400 font-serif">
            Conversa
            <Image
              src="/ConversaImage.png"
              alt="ConversaImage"
              width={50}
              height={50}
              className="px-1 mx-auto"
            />
          </h1>
          <p className="text-xs mb-4 italic">
            Your Communication Friend Online
          </p>
        </header>
        <main className="flex flex-col items-center justify-center text-center font-san text-sm">
          {/* {ownerImage && (
            <Image src={ownerImage} alt="Your Photo" width={150} height={150} />
          )} pwede pag maglalagay ng picture */}

          <p> Active: {nominatedName} </p>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </main>
      </div>
    </>
  );
};

export default MyProfile;
