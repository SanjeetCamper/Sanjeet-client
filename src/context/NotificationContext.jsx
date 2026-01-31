import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useToast } from "./ToastContext.jsx";
import { io } from "socket.io-client";
import { useContextUser } from "./UserContext.jsx";
import { useNavigate } from "react-router-dom";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getToken, isSignedIn } = useAuth();
  const { user } = useContextUser();
  const { showToast } = useToast();
  const API = import.meta.env.VITE_BACKEND_URL;

  const socketRef = useRef(null);

  const authHeader = async () => ({
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });

  const fetchNotifications = async () => {
    if (!isSignedIn) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${API}/api/notifications`,
        await authHeader()
      );
      setNotifications(res.data.notifications || []);
    } catch {
      showToast("Failed to fetch notifications", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    if (!isSignedIn) return;
    try {
      const res = await axios.get(
        `${API}/api/notifications/unread-count`,
        await authHeader()
      );
      setUnreadCount(res.data.count || 0);
    } catch {}
  };

  const openNotification = async (notif) => {
    try {
      if (!notif.isRead) {
        await axios.patch(
          `${API}/api/notifications/${notif._id}/read`,
          {},
          await authHeader()
        );

        // 🔥 remove from notch immediately
        setNotifications((prev) =>
          prev.filter((n) => n._id !== notif._id)
        );
        setUnreadCount((c) => Math.max(0, c - 1));
      }

      navigate(`/notifications?open=${notif._id}`);
    } catch {
      showToast("Failed to open notification", "error");
    }
  };

  // SOCKET
  useEffect(() => {
    if (!isSignedIn || !user?._id) return;

    if (!socketRef.current) {
      socketRef.current = io(API, { transports: ["websocket"] });
      socketRef.current.emit("join_client", user._id);

      socketRef.current.on("new_notification", () => {
        fetchNotifications();
        fetchUnreadCount();
      });
    }

    return () => {
      socketRef.current?.off("new_notification");
    };
  }, [isSignedIn, user?._id]);

  useEffect(() => {
    if (isSignedIn) {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [isSignedIn]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        fetchUnreadCount,
        openNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }
  return ctx;
};
