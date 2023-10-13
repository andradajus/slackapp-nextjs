import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Input from "./Input";
import MessageInput from "../components/MessageInput";
import MessageBox from "../components/MessageBox";
import NominateName from "./nominateName";


const Home = ({}) => {
  return (
    <>
      <NominateName />
      <h1>This is the Homepage for this App</h1>
      <div></div>
      <MessageBox />
      <MessageInput />
    </>
  );
};

export default Home;
