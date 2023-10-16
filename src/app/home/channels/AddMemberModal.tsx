"use client";
import { useState } from "react";

const AddMemberModal = ({ closeAddMember }) => {
  const [addMember, setAddMember] = useState("");

  const handleAddMember = async () => {
    try {
      const currentChannelID = sessionStorage.getItem("currentChannelID");
      const requestBody = {
        id: currentChannelID,
        member_id: addMember,
      };

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("access-token", sessionStorage.getItem("access-token"));
      headers.append("client", sessionStorage.getItem("client"));
      headers.append("expiry", sessionStorage.getItem("expiry"));
      headers.append("uid", sessionStorage.getItem("uid"));

      const response = await fetch(
        `http://206.189.91.54/api/v1/channel/add_member`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Member has been added to the channel", data);
      closeAddMember();
    } catch (error) {
      console.error("Error adding member to the channel:", error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h5 className="text-3xl font-semibold">Add Member</h5>
            </div>

            <div className="relative p-6 flex-auto">
              Add a Member
              <input
                className="border-2"
                key="name"
                type="text"
                id="name"
                value={addMember}
                onChange={(e) => {
                  setAddMember(e.target.value);
                }}
              />
              <button
                className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleAddMember}
              >
                Add Member
              </button>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeAddMember}
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

export default AddMemberModal;
