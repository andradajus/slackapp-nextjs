"use client";
import React, { useState } from "react";
import Image from "next/image";

const Home = () => {
  const [open, setOpen] = useState(null);

  const handleOpen = (index: React.SetStateAction<null>) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="ml-4">
        <header className="m-0 p-5">
          {/* <h1 className="inline-flex text-5xl font-bold content-center mb-0 text-yellow-400 font-serif">
            Conversa
            <Image
              src="/ConversaImage.png"
              alt="ConversaImage"
              width={100}
              height={100}
              className="px-5 mx-auto"
            />
          </h1> */}
          <h1 className="text-3xl font-semibold mb-2 text-yellow-400">
            Tasks:
          </h1>
        </header>

        <div className="text-white">
          <div className="grid grid-cols-12 grid-rows-12 gap-1">
            <div className="col-span-5 row-span-12">
              <div className="flex flex-col">
                <div className="mb-2">
                  <div className="text-base font-normal h-full">
                    <ul className="text-white list-decimal list-inside">
                      <li className="text-lg text-bold">Authentication</li>
                      <ul className="text-xs pl-5 mt-1 space-y-1 list-decimal list-inside">
                        <li className="flex flex-col line-through">
                          <span>a. User Registration</span>
                          <span>b. User Login</span>
                          <span>
                            c. Redirect to login on registration success
                          </span>
                          <span>d. Redirect to dashboard on login success</span>
                          <span>e. Logout</span>
                        </li>
                      </ul>

                      <li className="text-lg text-bold mt-1">Direct Message</li>
                      <ul className="text-xs pl-5 mt-1 space-y-1 list-decimal list-inside">
                        <li className="flex flex-col">
                          <span className="line-through">
                            f. User can send message to another user
                          </span>
                          <span className="line-through">
                            g. User retrieves message from another user
                          </span>
                        </li>
                      </ul>

                      <li className="text-lg text-bold mt-1">Channels</li>
                      <ul className="text-xs pl-5 mt-1 space-y-1 list-decimal list-inside">
                        <li className="flex flex-col line-through">
                          <span>
                            h. User can create a channel and add other users
                          </span>
                          <span>i. User can send message to a channel</span>
                          <span>j. User can retrieve message to a channel</span>
                        </li>
                      </ul>

                      <li className="text-lg text-bold mt-1">
                        API Integration
                      </li>
                      <ul className="text-xs pl-5 mt-1 space-y-1 list-decimal list-inside">
                        <li className="flex flex-col">
                          <span className="line-through">
                            k. localStorage can be used for other data but this
                            time, we have a backend api to communicate with.
                            available requests are in the api doc.
                          </span>
                        </li>
                      </ul>

                      <li className="text-lg text-bold mt-1">
                        <span>Real-Time Messaging</span>
                      </li>
                      <ul className="text-xs pl-5 mt-1 space-y-1 list-decimal list-inside">
                        <li className="flex flex-col">
                          <span className="line-through">
                            l. It means, if one user sends a message, the other
                            user automatically receives the message on their
                            side.
                          </span>
                        </li>
                      </ul>
                    </ul>
                  </div>
                  <div className="text-sm mt-4">
                    <span className="text-bold">For Implementation</span>
                    <ul className="pl-5 mt-1 space-y-1 list-decimal list-inside">
                      <li className="flex flex-col">
                        <ol className="list-inside list-decimal">
                          <li className="line-through">
                            Real-time retrieval of message or almost real time -
                            set timeout implementation or socket if theres time
                            to learn
                          </li>
                          <li>Tweak UI</li>
                          <li>
                            Unify dynamic components - messageinputs,
                            messagebox, inbox etc.
                          </li>
                          <li>
                            Create a more dynamic way of account data
                            &#40;Change user names, email, etc.&#41;
                          </li>
                          <li className="line-through">
                            {" "}
                            Transfer adding of details to signup
                          </li>
                          <li className="line-through">Alert Boxes</li>
                          <li className="line-through">Form Validations </li>
                          <li>
                            Tweak codes for better performance and readability
                          </li>
                          <li>
                            Tailwind Media Query for medium and large screen
                          </li>
                          <li className="line-through">Fix some states</li>
                        </ol>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-7 row-span-12 col-start-6">
              <span className="text-2xl">Current New Features</span>
              <ul className="text-white list-decimal list-inside">
                <li className="text-lg text-bold">User Database</li>
                <ul className="text-xs pl-5 mt-1 space-y-1 list-decimal list-inside">
                  <li className="flex flex-col">
                    <span>
                      User can input details like names in a form and during
                      chat names displays plus user details can be used.
                    </span>
                  </li>
                </ul>
                <li className="text-lg text-bold">
                  Dynamic Login using username/email
                </li>
                <ul className="text-xs pl-5 mt-1 space-y-1 list-decimal list-inside">
                  <li className="flex flex-col">
                    <span>
                      New or current users can login using their username/email.
                    </span>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
