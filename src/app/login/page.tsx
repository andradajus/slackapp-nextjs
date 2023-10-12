"use client";
import React, { useState } from "react";
import Link from "next/link";
import jwt_decode from 'jwt-decode';

const LoginPage = ({}) => {
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  // const navigate = navigate();

  // const onUsernameChange = (e) => setUsername(e.target.value);
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
        const name = response.headers.get("name");
        const nickname = response.headers.get("nickname");
        const user = { uid, name, nickname, email };
        const decodedToken = jwt_decode(accessToken);
        
        sessionStorage.setItem(`user:${uid}`, JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
  
        console.log("Login successful");
        console.log("Access Token:", accessToken);
        console.log("Client:", client);
        console.log("Expiry:", expiry);
        console.log("UID:", uid);
        console.log("Name", name);
        console.log("Nickname", nickname);
        console.log('Decoded Token:', decodedToken);
  
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
