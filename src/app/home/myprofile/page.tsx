"use client";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    const userEmail = sessionStorage.getItem("uid", uid);
    setEmail(userEmail);
  }, []);

  return (
    <>
      <h3>This is the profile page</h3>
      <span>Email:{email}</span>
    </>
  );
};

export default MyProfile;
