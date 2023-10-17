"use client";
import { useEffect } from "react";

const ChannelDetailsModal = ({ closeChannelDetails }) => {
  const fetchChannelDetails = async () => {
    try {
      const id = sessionStorage.getItem("currentChannelID");

      const url = `http://206.189.91.54/api/v1/channels/${id}`;

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("access-token", sessionStorage.getItem("access-token"));
      headers.append("client", sessionStorage.getItem("client"));
      headers.append("expiry", sessionStorage.getItem("expiry"));
      headers.append("uid", sessionStorage.getItem("uid"));

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      console.log("Channel details received:", responseData);
    } catch (error) {
      console.error("Error fetching channel details:", error);
    }
  };

  useEffect(() => {
    fetchChannelDetails();
  }, []);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h5 className="text-3xl font-semibold">Channel Details</h5>
            </div>

            <div className="relative p-6 flex-auto">Details Here</div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeChannelDetails}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ChannelDetailsModal;
