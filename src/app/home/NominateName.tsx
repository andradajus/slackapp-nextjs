"use client";
import { useState } from "react";

const NominateName = ({ closeName }) => {
  const [nominatedName, setNominatedName] = useState("");
  const uid = sessionStorage.getItem("uid");

  const handleNominateName = () => {
    const requestBody = {
      receiver_id: 3907,
      receiver_class: "User",
      body: `uid: ${uid} name: ${nominatedName}`,
const NominateName = ({closeName}) => {
    const [nominatedName, setNominatedName] = useState('');
    const uid = sessionStorage.getItem('uid');
  
    const handleNominateName = () => {
      const requestBody = {
        receiver_id: 3907, //channel 3907 for name requests
        receiver_class: 'User',
        body: `uid: ${uid} name: ${nominatedName}`,
      };
  
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('access-token', sessionStorage.getItem('access-token'));
      headers.append('client', sessionStorage.getItem('client'));
      headers.append('expiry', sessionStorage.getItem('expiry'));
      headers.append('uid', sessionStorage.getItem('uid'));
  
      fetch('http://206.189.91.54/api/v1/messages', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Message sent successfully:', data);
          closeName(); 
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("access-token", sessionStorage.getItem("access-token"));
    headers.append("client", sessionStorage.getItem("client"));
    headers.append("expiry", sessionStorage.getItem("expiry"));
    headers.append("uid", sessionStorage.getItem("uid"));

    fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Message sent successfully:", data);
        closeName();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-4 mx-auto max-w-2xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-yellow-200 outline-none focus:outline-none">
            <div className="flex items-start justify-center p-5">
              <h5 className="text-xl font-bold text-indigo-700 font-sans">
                Please tell us your name
              </h5>
            </div>

            <div className="bgrelative p-3 mx-4 flex-auto">
              <input
                className="flex text-center p-1 text-base w-full rounded-md shadow-md font-bold"
                type="text"
                placeholder="Nominate Name"
                value={nominatedName}
                onChange={(e) => setNominatedName(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end p-2">
              <button
                className="hover:text-indigo-700 hover:underline font-sans font-bold uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleNominateName}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NominateName;
