import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useContextUser } from "../context/UserContext";
import NotchNotification from "./NotchNotification.jsx"

const NavBar = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useContextUser();

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 px-4 pt-2 pb-2">
      <div className="flex justify-center">
        <div className="w-full max-w-md sm:mx-8 rounded-full border border-gray-300 shadow-sm flex justify-between items-center text-center p-2 px-3 mt-2">
          <img
            src={"/logo.png"}
            alt="Logo"
            className="w-12 rounded-full sm:w-12 hover:cursor-pointer"
            onClick={() => navigate("/")}
          />

          {user && user?.isProfileComplete ? <NotchNotification user={user} /> : ""}

          {user && user?.isProfileComplete ? (
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
              className="flex items-center gap-2 rounded-full px-6 py-3 text-gray-100 bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#14b8a6] transition-all cursor-pointer"
            >
              Login <ChevronRight />{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
