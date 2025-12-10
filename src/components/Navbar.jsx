import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import NotchNotification from "./NotchNotification.";

const NavBar = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 px-4 pt-2 pb-3 shadow-sm">
      <div className="max-w-md sm:mx-8 rounded-full border flex justify-between items-center text-center p-2 px-3 mt-2 sm:p-6 sm:px-24">
        <img
          src={"/logo.png"}
          alt="Logo"
          className="w-12 rounded-full sm:w-12 hover:cursor-pointer"
          onClick={() => navigate("/")}
        />

        {user ? (
          <NotchNotification />
        ) : (
          ""
        )}

        {user ? (
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "40px",
                  height: "40px",
                },
              },
            }}
          ></UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 rounded-full px-6 py-3 text-gray-800 bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#14b8a6] text-white  transition-all cursor-pointer"
          >
            Login <ChevronRight />{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
