"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type KeyValueData = {
  uid: string | null;
  email: string | null;
  username: any;
  firstname: any;
  middlename: any;
  lastname: any;
  aboutme: any;
};

const MyProfile = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  // const [keyValueArray, setKeyValueArray] = useState([]);
  const [keyValueArray, setKeyValueArray] = useState<KeyValueData[]>([]);

  const id = sessionStorage.getItem("id");
  const uid = sessionStorage.getItem("uid");
  const currentEmail = sessionStorage.getItem("uid") ?? "";
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
      // const keyValueArray = [
      //   {
      //     id: id,
      //     uid: uid,
      //     email: uid,
      //     username: bodyContent.username,
      //     firstname: bodyContent.firstname,
      //     middlename: bodyContent.middlename,
      //     lastname: bodyContent.lastname,
      //     aboutme: bodyContent.aboutme,
      //   },
      // ];

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
      ] as unknown as KeyValueData[];

      console.log("Data sent successfully:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="min-h-screen flex flex-col text-left  text-white">
        <div className="m-4 text-2xl block font-bold text-yellow-400 font-serif text-center">
          <span>Profile Information</span>
        </div>
        <main className="flex flex-col font-san text-sm">
          {/* {ownerImage && (
          <Image src={ownerImage} alt="Your Photo" width={150} height={150} />
        )} pwede pag maglalagay ng picture */}

          {keyValueArray.length > 0 ? (
            keyValueArray.map((item, index) => (
              <div
                className="bg-indigo-800 shadow-md rounded-md m-3"
                key={index}
              >
                <div className="flex justify-center">
                  <Image
                    src="https://www.svgrepo.com/show/497407/profile-circle.svg"
                    alt="ConversaImage"
                    width={150}
                    height={150}
                    className="mt-2 object-contain bg-indigo-100 rounded-full"
                  />
                </div>

                <div className="ml-2 border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-semibold leading-6 mb-0 text-yellow-300 font-serif">
                        First Name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="font-semibold text-white">
                          {item.firstname}
                        </span>
                      </dd>
                    </div>

                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-semibold leading-6 text-yellow-300 font-serif">
                        Middle Name
                      </dt>
                      <dd className="mt-1 text-sm font-semibold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="font-semibold text-white">
                          {item.middlename}
                        </span>
                      </dd>
                    </div>

                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-semibold leading-6 text-yellow-300 font-serif">
                        Last Name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="font-semibold text-white">
                          {item.lastname}
                        </span>
                      </dd>
                    </div>

                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="font-semibold text-sm font-semiboldleading-6 text-yellow-300 font-serif">
                        Username
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="font-semibold text-white">
                          {item.username}
                        </span>
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-semibold leading-6 text-yellow-300 font-serif">
                        <span className="text-yellow-400">Email address</span>
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="font-semibold text-white">
                          {item.email}
                        </span>
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="font-semibold text-sm leading-6 text-yellow-300 font-serif">
                        About me
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="font-semibold text-white italic">
                          {item.aboutme}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* <p>UID: {item.uid}</p>
                  <p>Email: {item.email}</p>
                  <p>Username: {item.username}</p>
                  <p>First Name: {item.firstname}</p>
                  <p>Middle Name: {item.middlename}</p>
                  <p>Last Name: {item.lastname}</p>
                  <p>About Me: {item.aboutme}</p> */}
              </div>
            ))
          ) : (
            <div className="self-center text-center m-3 gap-1">
              <div>To complete setting-up your account,</div>
              <div>please fill out the form below</div>

              <div className="relative mb-2">
                <input
                  type="text"
                  className="block rounded-sm shadow-md px-2.5 pb-2 pt-5 w-full text-md text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder=""
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                  Username
                </label>
              </div>

              <div className="relative mb-2">
                <input
                  type="text"
                  className="block rounded-sm shadow-md px-2.5 pb-2 pt-5 w-full text-md text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder=""
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                  First Name
                </label>
              </div>
              <div className="relative mb-2">
                <input
                  type="text"
                  className="block rounded-sm shadow-md px-2.5 pb-2 pt-5 w-full text-md text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={middleName}
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                  placeholder=""
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                  Middle Name
                </label>
              </div>

              <div className="relative mb-2">
                <input
                  type="text"
                  className="block rounded-sm shadow-md px-2.5 pb-2 pt-5  text-md w-full text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                  Last Name
                </label>
              </div>
              <div className="relative mb-2">
                <input
                  className="block rounded-sm shadow-md px-2.5 pb-2 pt-5  text-md w-full text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="You may type in your motto, favorite quotes, hobbies, etc."
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                  About Me
                </label>
              </div>

              <div
                className="cursor-pointer text-sm font-bold font-sans w-14 h-6 rounded bg-yellow-100  text-black hover:text-orange-300 hover:underline"
                onClick={handleAddUserDetails}
              >
                Submit
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyProfile;
