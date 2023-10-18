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

  const handleAddUserDetails = async () => {
    //   const requestBody = {
    //     receiver_id: 5079, //Names Channel
    //     receiver_class: "Channel",
    //     body: `[uid: "${uid}",
    //             email:"${uid}",
    //             firstName: "${firstName}",
    //             middleName: "${middleName}",
    //             surname: "${surname}",
    //             username: "${username}",
    //           ]`
    //   };
    //   const headers = new Headers();
    //   headers.append("Content-Type", "application/json");
    //   headers.append(
    //     "access-token",
    //     sessionStorage.getItem("access-token") || ""
    //   );
    //   headers.append("client", sessionStorage.getItem("client") || "");
    //   headers.append("expiry", sessionStorage.getItem("expiry") || "");
    //   headers.append("uid", sessionStorage.getItem("uid") || "");
    //   try {
    //     const response = await fetch("http://206.189.91.54/api/v1/messages", {
    //       method: "POST",
    //       headers: headers,
    //       body: JSON.stringify(requestBody),
    //     });
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     console.log(uid);
    //     console.log(nominatedName);
    //     console.log("Message sent successfully:", data);
    //   } catch (error) {
    //     console.error("Error sending message:", error);
    //   }
    // };
  };
  return (
    <>
      <div className="min-h-screen flex flex-col text-left bg-indigo-800 text-white border-2 border-solid border-white">
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
