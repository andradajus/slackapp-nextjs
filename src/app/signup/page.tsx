"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoginPage from "../login/page";
import Image from "next/image";

const SignUpPage = () => {
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // @ts-ignore
  const onSurnameChange = (e) => setSurname(e.target.value); // @ts-ignore
  const onFirstNameChange = (e) => setFirstName(e.target.value); // @ts-ignore
  const onMiddleNameChange = (e) => setMiddleName(e.target.value); // @ts-ignore
  const onUsernameChange = (e) => setUsername(e.target.value); // @ts-ignore
  const onPasswordChange = (e) => setPassword(e.target.value); // @ts-ignore
  const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value); // @ts-ignore
  const onEmailChange = (e) => setEmail(e.target.value);
  const clearError = () => {
    setError("");
  };

  // @ts-ignore
  const handleRegisterButton = async (e) => {
    e.preventDefault();
    if (
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
      surname,
      firstName,
      middleName,
      email,
      username,
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

  //   const updatedUsers = [...savedUsers, newUser];
  //   localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
  //   setError("");
  //   setTimeout(() => {
  //     alert("Account succesfully created.");
  //     <LoginPage />
  //   }, 1000);
  // };

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
        <p className="text-s mb-0 italic">Your Communication Friend Online</p>
      </header>

      <h2 className="inline-flex text-2xl font-bold mb-0 text-yellow-300">
        Account Registration
      </h2>
      <h5 className="mb-4">Please complete the registration form below:</h5>

      <form className="flex flex-col text-sm">
        <label htmlFor="Surname">Surname</label>
        <input
          className="text-black font-mono m-1 px-1"
          key="surname"
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="First Name">First Name</label>
        <input
          className="text-black font-mono m-1 px-1"
          key="firstName"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="Middle Name">Middle Name</label>
        <input
          className="text-black font-mono m-1 px-1"
          key="middleName"
          type="text"
          id="middleName"
          value={middleName}
          onChange={(e) => {
            setMiddleName(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="Username">Username</label>
        <input
          className="text-black font-mono m-1 px-1"
          key="username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="Password">Password</label>
        <input
          className="text-black font-mono m-1 px-1"
          key="password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="Confirm Password">Confirm Password</label>
        <input
          className="text-black font-mono m-1 px-1"
          key="confirmPassword"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="Email Address">Email Address</label>
        <input
          className="text-black font-mono m-1 px-1"
          key="email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
        />

        {error && (
          <p className="text-black bg-yellow-300 mt-4 text-sm">{error}</p>
        )}
        <h5 className="mt-5 p-3 text-base">
          Before clicking 'Register', please review and ensure correct
          information in the registration details. <br />
          <br />
          <button
            className="font-serif w-20 h-6 m-auto bg-indigo-200 text-black cursor-pointer hover:text-orange-300 hover:underline"
            type="submit"
            onClick={handleRegisterButton}
          >
            Register
          </button>
        </h5>
      </form>
      <h6 className="mt-5 p-4">
        Already have an account? <br />{" "}
        <Link href="/login" className="hover:text-orange-300 hover:underline">
          Login
        </Link>
        !
      </h6>
      <footer className="mt-8 pb-4">
        <h6 className="text-xs">&copy; 2023 Conversa</h6>
      </footer>
    </div>
  );
};

export default SignUpPage;
