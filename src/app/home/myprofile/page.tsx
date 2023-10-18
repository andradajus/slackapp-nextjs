"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const MyProfile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const id = sessionStorage.getItem("id");
  const uid = sessionStorage.getItem("uid");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("access-token", sessionStorage.getItem("access-token") || "");
  headers.append("client", sessionStorage.getItem("client") || "");
  headers.append("expiry", sessionStorage.getItem("expiry") || "");
  headers.append("uid", sessionStorage.getItem("uid") || "");

  const handleAddUserDetails = async () => {
    const userDetails = {
      uid: uid,
      email: uid,
      username: username,
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      aboutme: aboutMe,
    };

    const requestBody = {
      receiver_id: 5106, //Details Channel
      receiver_class: "Channel",
      body: JSON.stringify(userDetails),
    };

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
      setUsername("");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setAboutMe("");

      const bodyContent = JSON.parse(data.data.body);
      console.log("Formatted response data (body content):", bodyContent);
      const keyValueArray = [
        {
          uid: uid,
          email: uid,
          username: bodyContent.username,
          firstname: bodyContent.firstname,
          middlename: bodyContent.middlename,
          lastname: bodyContent.lastname,
          aboutme: bodyContent.aboutme,
        },
      ];

      localStorage.setItem(
        "conversaUserDetails",
        JSON.stringify(keyValueArray)
      );
      handleFormattedArray();
      console.log("Message sent successfully:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFormattedArray = async () => {
    const requestBody = {
      receiver_id: 5055, //Details Channel
      receiver_class: "Channel",
      body: keyValueArray,
    };

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
      setUsername("");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setAboutMe("");

      const bodyContent = JSON.parse(data.data.body);
      console.log("Formatted response data (body content):", bodyContent);
      const keyValueArray = [
        {
          uid: uid,
          email: uid,
          username: bodyContent.username,
          firstname: bodyContent.firstname,
          middlename: bodyContent.middlename,
          lastname: bodyContent.lastname,
          aboutme: bodyContent.aboutme,
        },
      ];

      localStorage.setItem(
        "conversaUserDetails",
        JSON.stringify(keyValueArray)
      );
      handleFormattedArray();
      console.log("Message sent successfully:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col text-left bg-indigo-800 text-white border-2 border-solid border-white">
        <main className="m-auto flex flex-col items-center justify-center text-center font-san text-sm">
          {/* {ownerImage && (
            <Image src={ownerImage} alt="Your Photo" width={150} height={150} />
          )} pwede pag maglalagay ng picture */}

          <div>
            <div>Email: {email}</div>

            <div>{id}</div>

            <div>
              Username
              <input
                className="text-black"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div>
              First Name
              <input
                className="text-black"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>

            <div>
              Middle Name
              <input
                className="text-black"
                type="text"
                value={middleName}
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
              />
            </div>

            <div>
              Last Name
              <input
                className="text-black"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            <div>
              About Me
              <input
                className="text-black"
                type="text"
                value={aboutMe}
                onChange={(e) => {
                  setAboutMe(e.target.value);
                }}
              />
            </div>
          </div>

          <div
            className="cursor-pointer text-sm font-bold font-sans w-14 h-6 rounded bg-yellow-100  text-black hover:text-orange-300 hover:underline"
            onClick={handleAddUserDetails}
          >
            Submit
          </div>
        </main>
      </div>
    </>
  );
};

export default MyProfile;
