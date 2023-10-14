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
        const id = data.data.id;
        const userDetails = {
          id: id,
          username: username,
          surname: surname,
          firstName: firstName,
          middleName: middleName,
        };

        const storedUserData =
          JSON.parse(localStorage.getItem("storedUserData")) || [];
        storedUserData.push(userDetails);
        localStorage.setItem("storedUserData", JSON.stringify(storedUserData));

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-indigo-900 text-white">
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

      <h2 className="inline-flex text-lg font-bold mb-0 text-yellow-300">
        Account Registration
      </h2>
      <h5 className="text-base mb-6 font-sans">
        Please complete the registration form below:
      </h5>

      <form className="flex flex-col text-sm font-medium font-sans">
        <div className="flex items-center mb-5">
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
        </div>

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

        <label htmlFor="Username" className="m-1">
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
        />

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
        <h5 className="mt-3 p-1 text-sm">
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
      <h6 className="mt-3 p-4 text-base font-sans">
        Already have an account? <br />{" "}
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
