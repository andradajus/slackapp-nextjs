"use client";
import { useState, useEffect } from "react";
import ChannelMessages from "./ChannelMessages";
import MemberModal from "./MemberModal";
import CreateChannelModal from "./CreateChannelModal";
import ChannelDetailsModal from "./ChannelDetailsModal";
import SubSideBar from "./SubSideBar";
import Image from "next/image";
import AddMemberModal from "./AddMemberModal";
import Alert from "@/app/AlertBox";
import Link from "next/link";

const Channels = () => {
  const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [isChannelModalOpen, setChannelModalOpen] = useState(false);
  const [isChannelDetailsModalOpen, setChannelDetailsModalOpen] =
    useState(false);
  const [channelDetails, setChannelDetails] = useState({
    id: "None",
    name: "None",
  });
  const [channels, setChannels] = useState([]);
  const [alert, setAlert] = useState([]);

  const headers = new Headers();

  const showAlert = (message: any, type: any) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  useEffect(() => {
    showChannelDetails();
  }, []);

  const showChannelDetails = async () => {
    const url = "http://206.189.91.54/api/v1/channels/";
    headers.append("Content-Type", "application/json");

    headers.append("access-token", sessionStorage.getItem("access-token"));
    headers.append("client", sessionStorage.getItem("client"));
    headers.append("expiry", sessionStorage.getItem("expiry"));
    headers.append("uid", sessionStorage.getItem("uid"));
    const excludedChannelIds = [5129, 5130, 5108, 5079, 5133];

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();

      if (data?.data?.length > 0) {
        const filteredChannels = data.data.filter(
          (channel: { id: number }) => !excludedChannelIds.includes(channel.id)
        );
        const [firstChannel] = filteredChannels;
        setChannels(filteredChannels);
        setChannelDetails({
          id: firstChannel.id,
          name: firstChannel.name,
        });
        console.log("Channel details:", data);
      }
    } catch (error) {
      console.error("Error showing channel details:", error);
    }
  };

  const handleChannelClick = (channel: { id: string; name: any }) => {
    setChannelDetails({
      id: channel.id,
      name: channel.name,
    });
    showAlert(`Change Channel to:${channel.id}`, "success");
    sessionStorage.setItem("currentChannelID", channel.id);
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

  const closeAddMember = () => {
    setAddMemberModalOpen(false);
    console.log("openMemberModal");
  };

  const openAddMember = () => {
    setAddMemberModalOpen(true);
    console.log("openChannelModal");
  };

  const closeChannel = () => {
    setChannelModalOpen(false);
    console.log("closeChannelModal");
  };

  const openChannelDetails = () => {
    setChannelDetailsModalOpen(true);
    console.log("openChannelModal");
  };

  const closeChannelDetails = () => {
    setChannelDetailsModalOpen(false);
    console.log("closeChannelModal");
  };

  return (
    <>
      <Alert message={alert.message} type={alert.type} />
      {isAddMemberModalOpen && (
        <AddMemberModal closeAddMember={closeAddMember} />
      )}
      {isMemberModalOpen && <MemberModal closeMember={closeMember} />}
      {isChannelModalOpen && (
        <CreateChannelModal
          closeChannel={closeChannel}
          showChannelDetails={showChannelDetails}
        />
      )}
      {isChannelDetailsModalOpen && (
        <ChannelDetailsModal closeChannelDetails={closeChannelDetails} />
      )}

      <div className="flex flex-row">
        <div className="flex h-screen">
          <SubSideBar channels={channels} onChannelClick={handleChannelClick} />
        </div>

        <div className="flex flex-col w-full h-screen overflow-y-hidden">
          <div className="bg-indigo-300 flex flex-row justify-between">
            <div className="flex flex-row">
              <Image
                className="cursor-pointer hover:bg-orange-500 hover:rounded-lg ml-2"
                src="https://www.svgrepo.com/show/465994/refresh-round.svg"
                alt="Handle Refresh"
                width={40}
                height={40}
              />
            </div>

            <span
              className="cursor-pointer font-black m-1 p-1 hover:bg-indigo-700 hover:rounded-lg text-2xl text-white"
              onClick={openChannelDetails}
            >
              {channelDetails.name}
            </span>

            <div>
              <div className="flex flex-row gap-1 mr-2">
                <div className="mt-1 cursor-pointer">
                  <Image
                    className="cursor-pointer fill-white hover:bg-orange-500 hover:rounded-lg"
                    src="https://www.svgrepo.com/show/467918/add-file-12.svg"
                    alt="Create Channel"
                    width={40}
                    height={40}
                    onClick={openChannel}
                  />
                </div>

                <div className="mt-1 cursor-pointer">
                  <Image
                    className="cursor-pointer hover:bg-orange-500 hover:rounded-lg"
                    src="https://www.svgrepo.com/show/467504/add-user-square-left.svg"
                    alt="Add Members"
                    width={40}
                    height={40}
                    onClick={openAddMember}
                  />
                </div>

                <div className="mt-1 cursor-pointer">
                  <Image
                    className="cursor-pointer hover:bg-orange-500 hover:rounded-lg"
                    src="https://www.svgrepo.com/show/467682/edit-user.svg"
                    alt="Show Members"
                    width={40}
                    height={40}
                    onClick={openMember}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-1 h-full">
            <ChannelMessages />
          </div>
        </div>
      </div>
    </>
  );
};

export default Channels;
