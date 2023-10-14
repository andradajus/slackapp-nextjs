"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage = ({}) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  // const onUsernameChange = (e) => setUsername(e.target.value);
  // const onPasswordChange = (e) => setPassword(e.target.value);

  const clearError = () => {
    setError("");
  };

  // @ts-ignore
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        email,
        password,
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
        const nickname = response.headers.get("nickname");
        const name = response.headers.get("name");
        const id = response.headers.get("id");

        console.log("Login successful");
        console.log("Access Token:", accessToken);
        console.log("Client:", client);
        console.log("Expiry:", expiry);
        console.log("UID:", uid);
        console.log("Nickname:", nickname);
        console.log("Name:", name);
        console.log("ID:", id);

        sessionStorage.setItem("access-token", accessToken);
        sessionStorage.setItem("client", client);
        sessionStorage.setItem("expiry", expiry);
        sessionStorage.setItem("uid", uid);

        router.push("/home");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const savedUsers = JSON.parse(localStorage.getItem("savedUsers"));

  // if (
  //   savedUsers &&
  //   savedUsers.some(
  //     (user) => user.username === username && user.password === password
  //   )
  // ) {
  //   setError("");
  //   const loggedInUser = savedUsers.find(
  //     (user) => user.username === username
  //   );
  //   if (loggedInUser) setLoggedInUser(loggedInUser);
  //   navigate("/home");
  // } else {
  //   setUsername("");
  //   setPassword("");
  //   setError("Invalid username or password. Please try again.");
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-indigo-900 text-white">
      <header className="m-0 p-10">
        <h1 className="inline-flex text-5xl font-bold mb-0 text-yellow-400 font-serif">
          Conversa
          <Image
            src="/ConversaImage.png"
            alt="ConversaImage"
            width={100}
            height={100}
            className="px-5 mx-auto"
          />
        </h1>
        <p className="text-s mb-4 italic">Your Communication Friend Online</p>
      </header>

      <p className="text-base mb-4 font-sans text-yellow-200 font-semibold">
        Please enter the following information
      </p>

      <form
        className="flex flex-col text-base font-medium font-sans"
        onSubmit={handleLogin}
      >
        <label htmlFor="email" className="m-1">
          Email Address
        </label>
        <input
          className="text-black font-mono mb-3 px-1"
          key="email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="password" className="m-1">
          Password
        </label>
        <input
          className="text-black font-mono mb-2 px-1"
          key="password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
        />

        {error && (
          <p className="flex items-center justify-center m-auto mt-4 text-white bg-yellow-500">
            {error}
          </p>
        )}

        <span
          className="flex items-center justify-center m-auto mt-4 text-sm font-bold font-sans w-14 h-6 rounded bg-yellow-100  text-black  cursor-pointer hover:text-orange-300 hover:underline"
          onClick={handleLogin}
        >
          Login
        </span>
      </form>

      <h5 className="mt-9 mb-2 p-4 text-md font-sans">
        Don't have an account yet?
        <Link
          href="/signup"
          className="block font-sans hover:text-orange-300 hover:underline"
        >
          Sign up now!
        </Link>
      </h5>

      <footer className="mt-8">
        <h6 className="text-xs">&copy; 2023 Conversa</h6>
      </footer>
    </div>
  );
};

export default LoginPage;
