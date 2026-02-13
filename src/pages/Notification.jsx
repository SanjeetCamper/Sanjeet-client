import { useEffect, useState } from "react";
import { useNotifications } from "../context/NotificationContext.jsx";
import { useSearchParams } from "react-router-dom";
import BackButtonByNavigate from "../components/BackButtonByNavigate.jsx";
import { motion } from "framer-motion";

const FILTERS = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "all", label: "All" },
];

const Notification = () => {
  const { notifications, openNotification, fetchNotifications, loading } =
    useNotifications();

  const [filter, setFilter] = useState("today");
  const [params] = useSearchParams();
  const openId = params.get("open");

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (openId) {
      const el = document.getElementById(openId);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openId, notifications]);

  const filtered = notifications.filter((n) => {
    const d = new Date(n.createdAt);
    const now = new Date();

    if (filter === "today")
      return d.toDateString() === new Date().toDateString();
    if (filter === "week") return d > new Date(now.setDate(now.getDate() - 7));
    if (filter === "month")
      return d > new Date(now.setMonth(now.getMonth() - 1));
    return true;
  });

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-100 bg-white">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
      }}
      className="p-4 fixed top-0 left-0 w-full h-screen z-100 bg-white overflow-y-auto scroll-hide pt-20"
    >
      <div className="fixed top-0 left-0 w-full z-100 bg-white p-4 space-y-3">
        <BackButtonByNavigate
          urlPath={"/order-place"}
          urlHeading={"Notifications"}
        />
        {/* FILTERS */}
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1 rounded-full text-xs
              ${
                filter === f.key
                  ? "bg-[#21c4cc] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mt-3 px-1">
        {/* LIST */}
        <div className="rounded divide-y divide-gray-300 overflow-y-auto space-y-3">
          {loading && (
            <p className="p-4 text-sm text-gray-400 text-center">Loading...</p>
          )}

          {!loading && filtered.length === 0 && (
            <p className="p-4 text-sm text-gray-400 text-center">
              No notifications
            </p>
          )}

          {filtered.map((n) => (
            <div
              key={n._id}
              id={n._id}
              onClick={() => openNotification(n)}
              className={`p-4 cursor-pointer border border-gray-200 shadow rounded-xl
              ${
                n._id === openId
                  ? "bg-[#21c4cc]/20 border-l-4 border-[#21c4cc]"
                  : n.isRead
                    ? "bg-white"
                    : "bg-blue-50"
              }`}
            >
              <p className="font-medium text-sm">{n.title}</p>
              <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">
                {n.message}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default Notification;
