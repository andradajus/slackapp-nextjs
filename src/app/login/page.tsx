"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div>
      <form className="loginForm" onSubmit={handleLogin}>
        <input
          key="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
        />

        <input
          key="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
        />

        {error && <p className="loginError">{error}</p>}

        <span className="cursor-pointer" onClick={handleLogin}>
          Login
        </span>
      </form>

      <h5 className="loginLink">
        Don't have an account yet? <br />
        <Link href="/signup">Sign up</Link>!
      </h5>
    </div>
  );
};

export default LoginPage;
