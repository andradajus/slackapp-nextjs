import { useState } from "react";

const CreateChannelModal = ({ closeChannel, showChannelDetails }) => {
  const [name, setName] = useState("");

  const handleCreateChannel = async () => {
    try {
      const id = sessionStorage.getItem("id");
      const requestBody = {
        name: name,
        user_ids: [id],
      };

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("access-token", sessionStorage.getItem("access-token"));
      headers.append("client", sessionStorage.getItem("client"));
      headers.append("expiry", sessionStorage.getItem("expiry"));
      headers.append("uid", sessionStorage.getItem("uid"));

      const response = await fetch("http://206.189.91.54/api/v1/channels", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Channel has been created", data);
      closeChannel();
      showChannelDetails();
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5">
              <h5 className="text-3xl font-semibold">Create Channel Here</h5>
            </div>

            <div className="relative p-6 flex-auto">
              Create a channel
              <input
                className="border-2"
                key="name"
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center justify-end p-6">
              <button
                className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleCreateChannel}
              >
                Submit
              </button>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeChannel}
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

export default CreateChannelModal;
