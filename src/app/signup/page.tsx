"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoginPage from "../login/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  // const [surname, setSurname] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [middleName, setMiddleName] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [uid, setUid] = useState("");
  const router = useRouter();

  const clearError = () => {
    setError("");
  };

  const handleRegisterButton = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      surname.trim() === "" ||
      firstName.trim() === "" ||
      username.trim() === "" ||
      password.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      email.trim() === ""
    ) {
      setError("Please fill out all the blank fields.");
      return;
    }
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setError("Passwords do not match");
      return;
    }

    const requestBody = {
      email,
      password,
      password_confirmation: confirmPassword,
    };

    try {
      const response = await fetch("http://206.189.91.54/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        handleLogin();
        console.log("Registration successful:", data);
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.errors);
        setError("Registration failed. Please check the provided information.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  // login registered user here
  const handleLogin = async (e: { preventDefault: () => void }) => {
    try {
      const requestBody = {
        email: email,
        password: password,
      };

      const response = await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const accessToken = response.headers.get("access-token");
        const client = response.headers.get("client");
        const expiry = response.headers.get("expiry");
        const uid = response.headers.get("uid");

        const responseData = await response.json();
        const id = responseData.data.id;

        sessionStorage.setItem("access-token", accessToken!);
        sessionStorage.setItem("client", client!);
        sessionStorage.setItem("expiry", expiry!);
        sessionStorage.setItem(
          "uid",
          uid!
        ); /* <!> - an assertion to Typescript that the values are not null */
        sessionStorage.setItem("id", id);
        accountsLogin();
        console.log("Successful Login of Registered User");
      } else if (response.status === 401) {
        setError("Login failed. Please check your email and password.");
      } else {
        console.error("Login failed:", response.statusText);
        setError("An error occurred while logging in. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  //upon login log admin user account

  const accountsLogin = async () => {
    try {
      const requestBody = {
        email: "accounts@conversa.com",
        password: "conversa",
      };

      const response = await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const accessToken = response.headers.get("access-token");
        const client = response.headers.get("client");
        const expiry = response.headers.get("expiry");
        const uid = response.headers.get("uid");
        const responseData = await response.json();
        const id = responseData.data.id;
        sessionStorage.setItem("admin-access-token", accessToken!);
        sessionStorage.setItem("admin-client", client!);
        sessionStorage.setItem("admin-expiry", expiry!);
        sessionStorage.setItem(
          "admin-uid",
          uid!
        ); /* <!> - an assertion to Typescript that the values are not null */
        sessionStorage.setItem("admin-id", id);
        addUserToChannel();
        console.log("Successful Login of Admin Account");
      } else {
        console.error("Login failed:", response.statusText);
        setError("Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //add user to admin account channel
  /*admin task - not client-related*/
  const addUserToChannel = async () => {
    try {
      const memberID = sessionStorage.getItem("id");
      const requestBody = {
        id: 5133,
        member_id: memberID,
      };

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "access-token",
        sessionStorage.getItem("admin-access-token") as string
      );
      headers.append(
        "client",
        sessionStorage.getItem("admin-client") as string
      );
      headers.append(
        "expiry",
        sessionStorage.getItem("admin-expiry") as string
      );
      headers.append("uid", sessionStorage.getItem("admin-uid") as string);

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
      handleAddUserDetails();
      console.log("User added to channel successfully registered");
    } catch (error) {
      console.error("Error adding member to the channel:", error);
    }
  };

  //send message to user account
  const handleAddUserDetails = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "access-token",
      sessionStorage.getItem("access-token") || ""
    );
    headers.append("client", sessionStorage.getItem("client") || "");
    headers.append("expiry", sessionStorage.getItem("expiry") || "");
    headers.append("uid", sessionStorage.getItem("uid") || "");
    const id = sessionStorage.getItem("id");
    const userDetails = {
      id: id,
      uid: email,
      email: email,
      username: username,
      firstname: firstName,
      middlename: middleName,
      lastname: surname,
      // aboutme: aboutMe,
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
      setSurname("");
      setPassword("");
      setEmail("");
      // setAboutMe("");
      sessionStorage.removeItem("admin-access-token");
      sessionStorage.removeItem("admin-client");
      sessionStorage.removeItem("admin-expiry");
      sessionStorage.removeItem("admin-uid");
      sessionStorage.removeItem("admin-id");
      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("client");
      sessionStorage.removeItem("expiry");
      sessionStorage.removeItem("uid");
      sessionStorage.removeItem("id");
      router.push("/login");
      console.log("Successfully sent Details");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center text-center bg-indigo-900 text-white">
      <header className="m-0 p-5">
        <h1 className="inline-flex text-5xl font-bold content-center mb-0 text-yellow-400 font-serif">
          Conversa
          <Image
            src="/ConversaImage.png"
            alt="ConversaImage"
            width={100}
            height={100}
            className="px-5 mx-auto"
          />
        </h1>
        <p className="text-sm mb-4 italic">Your Communication Friend Online</p>
      </header>

      <h2 className="inline-flex text-lg font-sans font-semibold mt-4 mb-0 text-yellow-300">
        Account Registration
      </h2>
      <h5 className="text-base mb-6 font-sans">
        Please complete the registration form below:
      </h5>

      <form className="flex flex-col text-sm font-medium font-sans">
        {/* <div className="flex items-center mb-5">
          <div className="w-1/3">
            <label htmlFor="Surname" className="m-1 block">
              Surname
            </label>
            <input
              className=" text-black font-mono mb-1 px-1 w-48 rounded-lg"
              key="surname"
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
                clearError();
              }}
            />
          </div>

          <div className="w-1/3">
            <label htmlFor="First Name" className="m-1 block">
              First Name
            </label>
            <input
              className="text-black font-mono mb-1 px-1 w-48 rounded-lg"
              key="firstName"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                clearError();
              }}
            />
          </div>

          <div className="w-1/3">
            <label htmlFor="Middle Name" className="m-1 block">
              Middle Name
            </label>
            <input
              className="text-black font-mono mb-1 px-1 w-48 rounded-lg"
              key="middleName"
              type="text"
              id="middleName"
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
                clearError();
              }}
            />
          </div>
        </div> */}

        <label htmlFor="Email Address" className="m-1">
          Email Address
        </label>
        <input
          className="text-black font-mono mb-3 px-1 w-48 mx-auto rounded-lg"
          key="email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
        />

        {/* <label htmlFor="Username" className="m-1">
          Username
        </label>
        <input
          className="text-black font-mono mb-3 px-1 w-48 mx-auto rounded-lg"
          key="username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            clearError();
          }}
        /> */}

        <label htmlFor="Password" className="m-1">
          Password
        </label>
        <input
          className="text-black font-mono mb-3 px-1 w-48 mx-auto rounded-lg"
          key="password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="Confirm Password" className="m-1">
          Confirm Password
        </label>
        <input
          className="text-black font-mono mb-3 px-1 w-48 mx-auto rounded-lg"
          key="confirmPassword"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearError();
          }}
        />

        {error && (
          <p className="flex items-center justify-center m-auto mt-4 py-1 px-3 text-black bg-yellow-300 text-sm font-bold rounded">
            {error}
          </p>
        )}
        <h5 className="mt-5 p-1 text-sm">
          Before clicking 'Register', please review and ensure correct
          information in the registration details. <br />
          <br />
          <button
            className="flex items-center justify-center m-auto text-sm font-bold font-sans w-20 h-6 rounded bg-yellow-100  text-black  cursor-pointer hover:text-orange-300 hover:underline"
            type="submit"
            onClick={handleRegisterButton}
          >
            Register
          </button>
        </h5>
      </form>
      <h6 className="mt-5 p-4 text-base font-sans">
        Already have an account? <br />
        <Link
          href="/login"
          className="block font-sans hover:text-orange-300 hover:underline"
        >
          Login!
        </Link>
      </h6>
      <footer className="mt-6 pb-4">
        <h6 className="text-xs">&copy; 2023 Conversa</h6>
      </footer>
    </div>
  );
};

export default SignUpPage;

// function handleAddUserDetails() {
//   throw new Error("Function not implemented.");
// }
