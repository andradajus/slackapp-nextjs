import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import MessageInput from "./MessageInput";
import MessageBox from "./MessageBox";

const Home = ({ loggedInUser }) => {
  return (
    <>
      <h1>This is the Homepage for this App</h1>
      <div></div>
      <MessageBox loggedInUser={loggedInUser} />
      <MessageInput loggedInUser={loggedInUser} />
    </>
  );
};

export default Home;
