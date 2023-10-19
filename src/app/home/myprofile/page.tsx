"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [keyValueArray, setKeyValueArray] = useState([]);
  const id = sessionStorage.getItem("id");
  const uid = sessionStorage.getItem("uid");
  const currentEmail = sessionStorage.getItem("uid");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("access-token", sessionStorage.getItem("access-token") || "");
  headers.append("client", sessionStorage.getItem("client") || "");
  headers.append("expiry", sessionStorage.getItem("expiry") || "");
  headers.append("uid", sessionStorage.getItem("uid") || "");

  useEffect(() => {
    retrieveUserDetails();
    setEmail(currentEmail);
  }, []);

  //Pwedeng gamitin kung need mo access info :D / 5133 User Details Channels
  const retrieveUserDetails = async () => {
    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${5133}&receiver_class=Channel`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data:", data);

      const uidToMatch = uid;
      const matchingMessage = data.data.find((message) => {
        try {
          const bodyContent = JSON.parse(message.body);
          return bodyContent.uid === uidToMatch;
        } catch (error) {
          return false;
        }
      });

      if (matchingMessage) {
        const bodyContent = JSON.parse(matchingMessage.body);
        console.log("Formatted response data (body content):", bodyContent);
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
        console.log("Key Value Data", keyValueData);
        setKeyValueArray(keyValueData);
      } else {
        console.log("No user with matching UID found.");
      }
    } catch (error) {
      console.error("Error retrieving message:", error);
    }
  };

  //Hanggang dito key value pair na siya. Match to UID tapos yung info return na sa data ng user :D

  const handleAddUserDetails = async () => {
    const userDetails = {
      id: id,
      uid: uid,
      email: uid,
      username: username,
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      aboutme: aboutMe,
    };

    const requestBody = {
      receiver_id: 5133, //Details Channel
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
      router.push("/home");

      const bodyContent = JSON.parse(data.data.body);
      console.log("Formatted response data (body content):", bodyContent);
      const keyValueArray = [
        {
          id: id,
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
      console.log("Data sent successfully:", data);
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
            {keyValueArray.length > 0 ? (
              keyValueArray.map((item, index) => (
                <div key={index}>
                  <p>UID: {item.uid}</p>
                  <p>Email: {item.email}</p>
                  <p>Username: {item.username}</p>
                  <p>First Name: {item.firstname}</p>
                  <p>Middle Name: {item.middlename}</p>
                  <p>Last Name: {item.lastname}</p>
                  <p>About Me: {item.aboutme}</p>
                </div>
              ))
            ) : (
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
                <div
                  className="cursor-pointer text-sm font-bold font-sans w-14 h-6 rounded bg-yellow-100  text-black hover:text-orange-300 hover:underline"
                  onClick={handleAddUserDetails}
                >
                  Submit
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default MyProfile;
