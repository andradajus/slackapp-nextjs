"use client";
import { useState, useEffect } from "react";

const SubSideBar = ({ channels, onChannelClick }) => {
  const [isChannelListOpen, setChannelListOpen] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {}, []);

  const toggleChannelList = () => {
    setChannelListOpen(!isChannelListOpen);
  };

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    onChannelClick(channel);
  };

  return (
    <>
      <div className="bg-indigo-500 h-screen border-2 border-y-0 border-white overflow-hidden w-48">
        <div className="bg-indigo-600 text-center block text-xl font-semibold mb-0 text-yellow-300 font-serif pb-2 pt-2">
          <div>Channel List</div>
        </div>
        <div className="flex flex-col mt-7 ml-4">
          <div className="text-white font-sans font-semibold">
            <span
              className="cursor-pointer text-lg font-black"
              onClick={toggleChannelList}
            ></span>
            <div className={`gap-4 ${isChannelListOpen ? "block" : "hidden"}`}>
              <ul className="gap-2">
                {channels.map((channel) => (
                  <li
                    className="cursor-pointer hover:text-orange-300 hover:underline ml-2"
                    key={channel.id}
                    onClick={() => handleChannelClick(channel)}
                  >
                    {channel.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="hover:bg-indigo-700 cursor-pointer">Sent Message</div> */}
        </div>
      </div>
    </>
  );
};

export default SubSideBar;
