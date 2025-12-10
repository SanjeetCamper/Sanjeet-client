import React from "react";
import { NavLink } from "react-router-dom";
import {
  UserRound,
  LayoutDashboard,
  HomeIcon,
  CalendarCheck,
  Handshake,
  Settings,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-18 bg-white z-50 px-4 pt-3">
      <div className="flex justify-between items-center py-1 bg-white border border-gray-500/50 rounded-full text-sm fixed bottom-2 left-1/2 -translate-x-1/2 w-full max-w-sm">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `rounded-full flex flex-col items-center justify-center gap-0.5 px-4 py-2 text-xs sm:text-sm ml-1 ${
              isActive ? "bg-gray-200 text-black" : "text-gray-500"
            }`
          }
        >
          <HomeIcon />
          <label htmlFor="" className="font-serif">
            Home
          </label>
        </NavLink>

        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            `rounded-full flex flex-col items-center justify-center gap-0.5 px-3 py-2 text-xs sm:text-sm ${
              isActive ? "bg-gray-200 text-black" : "text-gray-500"
            }`
          }
        >
          <LayoutDashboard />
          <label htmlFor="" className="font-serif">
            Dashboard
          </label>
        </NavLink>

        <NavLink
          to={"/history"}
          className={({ isActive }) =>
            `rounded-full flex flex-col items-center justify-center gap-0.5 px-4 py-2 text-xs sm:text-sm ${
              isActive ? "bg-gray-200 text-black" : "text-gray-500"
            }`
          }
        >
          <CalendarCheck />
          <label htmlFor="" className="font-serif">
            History
          </label>
        </NavLink>

        <NavLink
          to={"/dailyuser"}
          className={({ isActive }) =>
            `rounded-full flex flex-col items-center justify-center gap-0.5 px-4 py-2 text-xs sm:text-sm ${
              isActive ? "bg-gray-200 text-black" : "text-gray-500"
            }`
          }
        >
          <Handshake />
          <label htmlFor="" className="font-serif text-center">
            Daily User
          </label>
        </NavLink>

        <NavLink
          to={"/setting"}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 px-4 py-2 text-xs sm:text-sm mr-1 rounded-full ${
              isActive ? "bg-gray-200 text-black" : "text-gray-500"
            }`
          }
        >
          <Settings />
          <label htmlFor="" className="font-serif">
            Setting
          </label>
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
