"use client";
import { useState, useEffect } from "react";
import MessageBox from "@/app/components/MessageBox";
import MessageInput from "@/app/components/MessageInput";
import MemberModal from "./MemberModal";
import CreateChannelModal from "./CreateChannelModal";
import ChannelDetailsModal from "./ChannelDetailsModal";
import SubSideBar from "./SubSideBar";
import Image from "next/image";
import Link from "next/link";

const Channels = () => {
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [isChannelModalOpen, setChannelModalOpen] = useState(false);
  const [isChannelDetailsModalOpen, setChannelDetailsModalOpen] =
    useState(false);
  const [channelDetails, setChannelDetails] = useState({
    id: "None",
    name: "None",
  });
  const [channels, setChannels] = useState([]);

  const headers = new Headers();

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

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();

      if (data?.data?.length > 0) {
        const [firstChannel] = data.data;
        setChannels(data.data);
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

  const handleChannelClick = (channel) => {
    setChannelDetails({
      id: channel.id,
      name: channel.name,
    });
  };

  const updateChannels = (newChannels) => {
    setChannels(newChannels);
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
      {isMemberModalOpen && <MemberModal closeMember={closeMember} />}
      {isChannelModalOpen && (
        <CreateChannelModal
          closeChannel={closeChannel}
          channels={channels}
          updateChannels={updateChannels}
        />
      )}
      {isChannelDetailsModalOpen && (
        <ChannelDetailsModal closeChannelDetails={closeChannelDetails} />
      )}
      <div className="grid grid-cols-12 grid-rows-5 h-screen">
        <div className="col-span-2 row-span-5 h-full w-full">
          <SubSideBar channels={channels} onChannelClick={handleChannelClick} />
        </div>
        <div className="col-span-10 row-span-5 bg-amber-200 col-start-3 h-full w-full">
          <div className="bg-green-200 h-full">
            <div className="flex justify-between col-span-9 row-span-5 col-start-4">
              <div className="bg-slate-200 ml-2 p-2 hover:bg-indigo-700 text-lg">
                <span className="ml-2 p-2">{channelDetails.id}</span>
              </div>
              <span
                className="cursor-pointer font-bold ml-2 p-2 hover:bg-indigo-700 text-2xl"
                onClick={openChannelDetails}
              >
                {channelDetails.name}
              </span>
              <div className="flex flex-row gap-2 mr-2">
                <div className="cursor-pointer">
                  <Image
                    className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
                    src="https://www.svgrepo.com/show/310629/channel-add.svg"
                    alt="Create Channel"
                    width={40}
                    height={40}
                    onClick={openChannel}
                  />
                </div>
                <div className="cursor-pointer">
                  <Image
                    className="cursor-pointer hover:bg-indigo-700 hover:rounded-sm"
                    src="https://www.svgrepo.com/show/513862/user-add.svg"
                    alt="Add Members"
                    width={40}
                    height={40}
                    onClick={openMember}
                  />
                </div>
              </div>
            </div>

            <div className="bg-red-200 justify-items-end">
              <MessageBox />
              <MessageInput />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Channels;
