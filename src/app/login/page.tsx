"use client";
import React, { useState } from "react";
import Link from "next/link";
<<<<<<< HEAD
import { useRouter } from "next/navigation";

const LoginPage = ({}) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
=======
import jwt_decode from 'jwt-decode';

const LoginPage = ({}) => {
  // const [username, setUsername] = useState("");
>>>>>>> cd5036eca40dcba95bf5feb61994bab7c31f905d
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
<<<<<<< HEAD
  // const onUsernameChange = (e) => setUsername(e.target.value);
  // const onPasswordChange = (e) => setPassword(e.target.value);
=======
  // const navigate = navigate();

  // const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
>>>>>>> cd5036eca40dcba95bf5feb61994bab7c31f905d

  const clearError = () => {
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
=======
    loginUser();
  };

  const loginUser = async () => {
    const requestBody = {
      email,
      password,
    };
  
>>>>>>> cd5036eca40dcba95bf5feb61994bab7c31f905d
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
<<<<<<< HEAD
        const nickname = response.headers.get("nickname");
        const name = response.headers.get("name");
        const id = response.headers.get("id");

=======
        const name = response.headers.get("name");
        const nickname = response.headers.get("nickname");
        const user = { uid, name, nickname, email };
        const decodedToken = jwt_decode(accessToken);
        
        sessionStorage.setItem(`user:${uid}`, JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
  
>>>>>>> cd5036eca40dcba95bf5feb61994bab7c31f905d
        console.log("Login successful");
        console.log("Access Token:", accessToken);
        console.log("Client:", client);
        console.log("Expiry:", expiry);
        console.log("UID:", uid);
<<<<<<< HEAD
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
=======
        console.log("Name", name);
        console.log("Nickname", nickname);
        console.log('Decoded Token:', decodedToken);
  
>>>>>>> cd5036eca40dcba95bf5feb61994bab7c31f905d
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
