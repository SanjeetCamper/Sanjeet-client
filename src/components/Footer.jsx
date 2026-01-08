import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  LayoutDashboard,
  // CalendarCheck,
  Handshake,
  Settings,
  BellIcon,
  ChevronRight,
  Plane,
  // BarChart,
} from "lucide-react";

const Footer = () => {
  const scrollRef = useRef(null);
  const navRefs = useRef([]);
  const [showArrow, setShowArrow] = useState(true);

  // 👉 Arrow visibility check
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
      setShowArrow(false);
    } else {
      setShowArrow(true);
    }
  };

  // 👉 Center clicked item
  const centerItem = (index) => {
    navRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  useEffect(() => {
    handleScroll(); // initial arrow check
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-19 pt-2 bg-white z-50">
      {/* RELATIVE wrapper for arrow */}
      <div className="relative max-w-[280px] mx-auto">
        {/* SCROLLABLE NAV */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="
            flex items-center gap-2
            bg-white border border-gray-200 shadow-sm rounded-full
            px-2 py-1
            overflow-x-auto
            whitespace-nowrap
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {[
            { to: "/", label: "Home", icon: HomeIcon },
            { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            // { to: "/membership/plans", label: "Membership", icon: Plane },
            { to: "/notification", label: "Notification", icon: BellIcon },
            { to: "/dailyuser", label: "Daily User", icon: Handshake },
            { to: "/setting", label: "Setting", icon: Settings },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                ref={(el) => (navRefs.current[i] = el)}
                to={item.to}
                onClick={() => centerItem(i)}
                className={({ isActive }) =>
                  `flex-shrink-0 w-20 flex flex-col items-center py-2 text-xs
                  ${
                    isActive
                      ? "bg-[#21c4cc] text-white rounded-full transition-all duration-300 ease-out scale-105 shadow-md"
                      : "text-gray-500"
                  }`
                }
              >
                <Icon className="w-4" />
                <span className="text-[10px] leading-none">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* 👉 RIGHT ARROW HINT */}
        {showArrow && (
          <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1">
            <ChevronRight className="w-4 h-4 text-gray-500 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
