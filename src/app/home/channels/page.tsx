"use client";
import { useState, useEffect } from "react";
import MessageBox from "@/app/components/MessageBox";
import MessageInput from "@/app/components/MessageInput";
import MemberModal from "./MemberModal";
import CreateChannelModal from "./CreateChannelModal";

const Channels = () => {
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [isChannelModalOpen, setChannelModalOpen] = useState(false);
  const [channelDetails, setChannelDetails] = useState({
    id: "None",
    name: "None",
  });

  useEffect(() => {
    showChannelDetails();
  }, []);

  const showChannelDetails = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("access-token", sessionStorage.getItem("access-token"));
    headers.append("client", sessionStorage.getItem("client"));
    headers.append("expiry", sessionStorage.getItem("expiry"));
    headers.append("uid", sessionStorage.getItem("uid"));

    fetch("http://206.189.91.54/api/v1/channels", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.data?.length > 0) {
          const [firstChannel] = data.data;
          setChannelDetails({
            id: firstChannel.id,
            name: firstChannel.name,
          });
        }
      })
      .catch((error) => console.error("Error showing channel details:", error));
  };

  const openMember = () => {
    setMemberModalOpen(true);
    console.log("openMemberModal");
  };

  const closeMember = () => {
    setMemberModalOpen(false);
    console.log("openMemberModal");
  };

  const openChannel = () => {
    setChannelModalOpen(true);
    console.log("openChannelModal");
  };

  const closeChannel = () => {
    setChannelModalOpen(false);
    console.log("closeChannelModal");
  };

  return (
    <>
      {isMemberModalOpen && <MemberModal closeMember={closeMember} />}
      {isChannelModalOpen && <CreateChannelModal closeChannel={closeChannel} />}

      <div className="bg-red-200 m-2">
        <div className="flex justify-between">
          <div className="cursor-pointer">
            Channel ID: {channelDetails.id}
            <br />
            Channel Name: {channelDetails.name}
          </div>
          <div className="flex flex-row gap-2">
            <div className="cursor-pointer" onClick={openChannel}>
              + Create Channel +
            </div>
            <div className="cursor-pointer" onClick={openMember}>
              + Members +
            </div>
          </div>
        </div>
        <MessageBox />
        <MessageInput />
      </div>
    </>
  );
};

export default Channels;
