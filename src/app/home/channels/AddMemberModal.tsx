"use client";
import {
  SetStateAction,
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";

const AddMemberModal = ({ closeAddMember }) => {
  const [addMember, setAddMember] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [findUserUID, setFindUserUID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [noUsersFound, setNoUsersFound] = useState(false);
  const resultsPerPage = 7;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("access-token", sessionStorage.getItem("access-token") || "");
  headers.append("client", sessionStorage.getItem("client") || "");
  headers.append("expiry", sessionStorage.getItem("expiry") || "");
  headers.append("uid", sessionStorage.getItem("uid") || "");

  const handleAddMember = async () => {
    try {
      const currentChannelID = sessionStorage.getItem("currentChannelID");
      const requestBody = {
        id: currentChannelID,
        member_id: addMember,
      };

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

  const handleFindUser = async () => {
    try {
      const response = await fetch(`http://206.189.91.54/api/v1/users`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResult(data);
      console.log("User", data);

      if (data.data && data.data.length === 0) {
        setNoUsersFound(true);
      } else {
        setNoUsersFound(false);
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }
  };

  const handleUserClick = (uid: SetStateAction<string>) => {
    setAddMember(uid);
  };

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const loadPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h5 className="text-2xl font-semibold font-sans">Add Member</h5>
            </div>

            <div className="relative p-6 flex-auto">
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
                className="text-blue-500 background-transparent font-semibold font-sans uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:underline"
                type="button"
                onClick={handleAddMember}
              >
                Add Member
              </button>
            </div>

            <div className="ml-6">
              <input
                className="border-2 rounded"
                key="findUserUID"
                type="text"
                id="findUserUID"
                value={findUserUID}
                onChange={(e) => {
                  setFindUserUID(e.target.value);
                  setSearchResult("");
                }}
              />
              <button
                className="text-blue-500 background-transparent font-semibold font-sans hover:underline uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleFindUser}
              >
                Find User
              </button>
              <table className="w-full mt-2">
                <thead className="font-sans text-base font-bold">
                  Found Users:
                  <tr>
                    <th className="font-sans text-sm">ID</th>
                    <th className="font-sans text-sm">UID</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult &&
                    searchResult.data
                      .filter((user: { uid: string | string[] }) =>
                        user.uid.includes(findUserUID)
                      )
                      .slice(startIndex, endIndex)

                      .map(
                        (
                          user: {
                            uid:
                              | string
                              | number
                              | boolean
                              | ReactElement<
                                  any,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | PromiseLikeOfReactNode
                              | null
                              | undefined;
                            id:
                              | string
                              | number
                              | boolean
                              | ReactElement<
                                  any,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | PromiseLikeOfReactNode
                              | null
                              | undefined;
                          },
                          index: Key | null | undefined
                        ) => (
                          <tr
                            className="hover:bg-orange-500 gap-2"
                            key={index}
                            onClick={() => handleUserClick(user.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <td className="font-sans text-sm">{user.id}</td>
                            <td className="font-sans text-sm">{user.uid}</td>
                          </tr>
                        )
                      )}
                </tbody>
              </table>
              {searchResult &&
                searchResult.data.filter((user: { uid: string | string[] }) =>
                  user.uid.includes(findUserUID)
                ).length > endIndex && (
                  <>
                    <button
                      className="text-blue-500 font-sans hover:underline background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={loadPreviousPage}
                    >
                      Previous Page
                    </button>
                    <button
                      className="text-blue-500 font-sans hover:underline background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={loadNextPage}
                    >
                      Next Page
                    </button>
                  </>
                )}
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 font-sans hover:underline background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
