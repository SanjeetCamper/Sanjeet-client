import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../context/NotificationContext.jsx";

const NotchNotification = () => {
  const { notifications, unreadCount, openNotification } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const lastUnread = notifications.find((n) => !n.isRead);
  const unreadNotifications = notifications.filter((n) => !n.isRead);

  // sound + vibration
  useEffect(() => {
    if (unreadCount > 0) {
      new Audio("/notification.mp3").play().catch(() => {});
      navigator.vibrate?.([100, 50, 100]);
    }
  }, [unreadCount]);

  // outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      {/* BAR */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-2 cursor-pointer"
      >
        <span
          className={`text-[11px] px-2 py-0.5 rounded-full max-w-[160px] truncate
          ${
            lastUnread
              ? "bg-[#21c4cc]/20 text-[#21c4cc]"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {lastUnread ? lastUnread.title : "No new updates"}
        </span>

        <div className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell
            size={20}
            className={unreadCount ? "text-[#21c4cc]" : "text-gray-500"}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-3 top-10 w-[240px] bg-white border border-gray-300 rounded-xl shadow-lg z-50"
          >
            <div className="max-h-[180px] overflow-y-auto p-2 space-y-2">
              {unreadNotifications.length === 0 && (
                <p className="text-xs text-center text-gray-400 py-4">
                  No Un-Read Notifications
                </p>
              )}

              {unreadNotifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => {
                    openNotification(n);
                    setOpen(false);
                  }}
                  className={`p-2 rounded-lg cursor-pointer text-xs
                    ${!n.isRead ? "bg-gray-100" : "bg-blue-50"}`}
                >
                  <p className="font-semibold text-blue-600 truncate">
                    {n.title}
                  </p>
                  <p className="text-gray-500 line-clamp-2">{n.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotchNotification;
