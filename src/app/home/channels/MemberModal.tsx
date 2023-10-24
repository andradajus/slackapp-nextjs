import React, { useEffect, useState } from "react";

const MemberModal = ({ closeMember }) => {
  const [channelMembers, setChannelMembers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("access-token", sessionStorage.getItem("access-token"));
  headers.append("client", sessionStorage.getItem("client"));
  headers.append("expiry", sessionStorage.getItem("expiry"));
  headers.append("uid", sessionStorage.getItem("uid"));

  useEffect(() => {
    showMemberList();
  }, []);

  const showMemberList = async () => {
    const currentChannelID = sessionStorage.getItem("currentChannelID");

    if (!currentChannelID) {
      console.error("No currentChannelID found in sessionStorage.");
      return;
    }

    const url = `http://206.189.91.54/api/v1/channels/${currentChannelID}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Channel Details", data);
      const channelMembers = data.data.channel_members.map(
        (member) => member.user_id
      );
      console.log("Channel Members", channelMembers);
      setChannelMembers(channelMembers);

      retrieveUserDetails(channelMembers);
    } catch (error) {
      console.error("Error showing list of members:", error);
    }
  };

  const retrieveUserDetails = async () => {
    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${5133}&receiver_class=Channel`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const filteredData = data.data.map((item) => {
        const bodyContent = JSON.parse(item.body);
        return {
          firstname: bodyContent.firstname,
          lastname: bodyContent.lastname,
          id: bodyContent.id,
        };
      });
      setFilteredData(filteredData);
      console.log("Filtered Data", filteredData);
    } catch (error) {
      console.error("Error retrieving message:", error);
      return null;
    }
  };

  const renderChannelMembers = () => {
    return channelMembers.map((user_id) => {
      const userData = filteredData.find((data) => data.id == user_id);
      const name = userData
        ? `${userData.firstname} ${userData.lastname}`
        : "Unknown User";
      return (
        <li key={user_id}>
          User ID: {user_id}, Name: {name}
        </li>
      );
    });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h5 className="text-3xl font-semibold">Channel Members</h5>
            </div>

            <div className="relative p-6 flex-auto">
              {channelMembers?.length > 0 && <ul>{renderChannelMembers()}</ul>}
              {channelMembers?.length === 0 && (
                <p>Loading channel members...</p>
              )}
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeMember}
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

export default MemberModal;
