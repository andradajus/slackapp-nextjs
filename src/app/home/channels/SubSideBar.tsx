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
      <div className="bg-indigo-500 h-full w-48">
        <div className="bg-indigo-600 text-center block text-2xl font-bold mb-0 text-yellow-400 font-serif pb-2 pt-2">
          <div>Conversa</div>
        </div>
        <div className="flex flex-col ml-4">
          <div>
            <span className="cursor-pointer" onClick={toggleChannelList}>
              Channels
            </span>
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
          <div className="hover:bg-indigo-700 cursor-pointer">Sent Message</div>
        </div>
      </div>
    </>
  );
};

export default SubSideBar;
