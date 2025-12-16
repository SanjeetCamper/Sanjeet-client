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
    <div className="fixed bottom-0 left-0 w-full h-20 bg-white z-50 pt-3">
      <div
        className="
          flex items-center gap-2
          bg-white border border-gray-500/50 rounded-full
          fixed bottom-2 left-1/2 -translate-x-1/2
          px-2 py-1
          overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          whitespace-nowrap
          w-xs   /* 👈 mobile me 4 icons */
        "
      >
        <NavLink
          to={"/dailyuser/app/dashboard"}
          className={({ isActive }) =>
            `flex-shrink-0 w-20 flex flex-col items-center justify-center py-2 text-xs
            ${
              isActive ? "bg-gray-200 text-black rounded-full" : "text-gray-500"
            }`
          }
        >
          <LayoutDashboardIcon className="w-5" />
          <label htmlFor="" className="font-serif">
            Dashboard
          </label>
        </NavLink>

        <NavLink
          to={"/dailyuser/app/history"}
          className={({ isActive }) =>
            `flex-shrink-0 w-20 flex flex-col items-center justify-center py-2 text-xs
            ${
              isActive ? "bg-gray-200 text-black rounded-full" : "text-gray-500"
            }`
          }
        >
          <HistoryIcon className="w-5" />
          <label htmlFor="" className="font-serif">
            History
          </label>
        </NavLink>

        <NavLink
          to={"/dailyuser/app/notification"}
          className={({ isActive }) =>
            `flex-shrink-0 w-20 flex flex-col items-center justify-center py-2 text-xs
            ${
              isActive ? "bg-gray-200 text-black rounded-full" : "text-gray-500"
            }`
          }
        >
          <BellIcon className="w-5" />
          <label htmlFor="" className="font-serif">
            Notification
          </label>
        </NavLink>

        <NavLink
          to={"/dailyuser/app/setting"}
          className={({ isActive }) =>
            `flex-shrink-0 w-20 flex flex-col items-center justify-center py-2 text-xs
            ${
              isActive ? "bg-gray-200 text-black rounded-full" : "text-gray-500"
            }`
          }
        >
          <Settings className="w-5" />
          <label htmlFor="" className="font-serif">
            Setting
          </label>
        </NavLink>
      </div>
    </div>
  );
};

export default DailyUserFooterNavbar;
