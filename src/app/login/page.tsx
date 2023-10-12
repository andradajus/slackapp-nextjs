"use client";
import React, { useState } from "react";
import Link from "next/link";

const LoginPage = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  // const navigate = navigate();

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const clearError = () => {
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = async () => {
    const requestBody = {
      email,
      password,
    };

    try {
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

        console.log("Login successful");
        console.log("Access Token:", accessToken);
        console.log("Client:", client);
        console.log("Expiry:", expiry);
        console.log("UID:", uid);

        const authenticatedResponse = await fetch(
          "http://206.189.91.54/api/v1/some_authenticated_endpoint",
          {
            method: "GET",
            headers: {
              "access-token": accessToken,
              client,
              expiry,
              uid,
            },
          }
        );

        if (authenticatedResponse.ok) {
          const authenticatedData = await authenticatedResponse.json();
          console.log("Authenticated request successful:", authenticatedData);
        } else {
          console.error(
            "Authenticated request failed:",
            authenticatedResponse.statusText
          );
        }
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

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
  };

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

        <button className="loginButton" type="submit">
          Login
        </button>
      </form>

      <h5 className="loginLink">
        Don't have an account yet? <br />
        <Link href="/signup">Sign up</Link>!
      </h5>
    </div>
  );
};

export default LoginPage;
