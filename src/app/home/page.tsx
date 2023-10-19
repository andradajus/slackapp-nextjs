"use client";
import React, { useState, useEffect } from "react";
import MessageInput from "../components/MessageInput";
import MessageBox from "../components/MessageBox";

const Home = () => {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex h-full border-2 border-solid border-white">
          <div className="flex flex-col flex-grow">
            <div className="h-3/4 bg-indigo-800 overflow-y-auto">
              <MessageBox />
            </div>
            <div className="h-1/4 bg-indigo-900 pt-5 overflow-y-auto">
              <MessageInput />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
