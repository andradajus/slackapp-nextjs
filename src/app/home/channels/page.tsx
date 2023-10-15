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

          console.log("Channel details:", firstChannel);
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
      {isChannelModalOpen && <CreateChannelModal closeChannel={closeChannel} />}
      {isChannelDetailsModalOpen && (
        <ChannelDetailsModal closeChannelDetails={closeChannelDetails} />
      )}

      <div className="grid grid-cols-12 grid-rows-5 h-screen">
        <div className="col-span-2 row-span-5 h-full w-full">
          <SubSideBar />
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
