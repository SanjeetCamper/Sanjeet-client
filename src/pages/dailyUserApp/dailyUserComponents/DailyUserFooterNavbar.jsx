import {
  BellIcon,
  CalendarCheck,
  Handshake,
  History,
  HistoryIcon,
  HomeIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  Settings,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const DailyUserFooterNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-18 bg-white z-50 px-4 pt-3">
      <div className="flex justify-between items-center py-1 bg-white border border-gray-500/50 rounded-full text-sm fixed bottom-2 left-1/2 -translate-x-1/2 w-full max-w-sm">
        <NavLink
          to={"/dailyuser/app/dashboard"}
          className={({ isActive }) =>
            `rounded-full flex flex-col items-center justify-center gap-0.5 w-22 h-15 text-xs sm:text-sm ml-1 ${
              isActive ? "bg-gray-200 text-black" : "text-gray-500"
            }`
          }
        >
          <LayoutDashboardIcon />
          <label htmlFor="" className="font-serif">
            Dashboard
          </label>
        </NavLink>

        <NavLink
          to={"/dailyuser/app/history"}
          className={({ isActive }) =>
            `rounded-full flex flex-col items-center justify-center gap-0.5 w-22 h-15 text-xs sm:text-sm ${
              isActive ? "bg-gray-200 text-black" : "text-gray-500"
            }`
          }
        >
          <HistoryIcon />
          <label htmlFor="" className="font-serif">
            History
          </label>
        </NavLink>

        <NavLink
          to={"/dailyuser/app/notification"}
          className={({ isActive }) =>
            `rounded-full flex flex-col items-center justify-center gap-0.5 w-23 h-15 text-xs sm:text-sm ${
              isActive ? "bg-gray-200 text-black" : "text-gray-500"
            }`
          }
        >
          <BellIcon />
          <label htmlFor="" className="font-serif">
            Notification
          </label>
        </NavLink>

        <NavLink
          to={"/dailyuser/app/setting"}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 w-22 h-15 text-xs sm:text-sm mr-1 rounded-full ${
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

export default DailyUserFooterNavbar;
