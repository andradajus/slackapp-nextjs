"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const MyProfile = ({
  nominatedName,
  uid,
}: {
  nominatedName: string;
  uid: string;
}) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    // const userEmail = sessionStorage.getItem("uid", uid);
    const userEmail = uid;

    if (userEmail !== null) {
      setEmail(userEmail);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col text-left bg-indigo-900 text-white">
        <main className="m-auto flex flex-col items-center justify-center text-center font-san text-sm">
          {/* {ownerImage && (
            <Image src={ownerImage} alt="Your Photo" width={150} height={150} />
          )} pwede pag maglalagay ng picture */}

          <p>Active: {nominatedName} </p>
          <p>Username: {uid}</p>
          <p>Email: {email}</p>
        </main>
      </div>
    </>
  );
};

export default MyProfile;
