import { createContext, useContext, useEffect, useState } from "react";
import dailyUserApi from "../../../utils/dailyUserApi.js";
import dailyEntryApi from "../../../utils/dailyEntryApi.js";

const DailyUserContext = createContext();

export const useDailyUser = () => useContext(DailyUserContext);

export const DailyUserProvider = ({ children }) => {
  const [dailyUser, setDailyUser] = useState(null);
  const [summary, setSummary] = useState({
    camperBalance: 0,
    pendingAmount: 0,
  });
  const [todaySummary, setTodaySummary] = useState({
    totalQuantity: 0,
    totalAmount: 0,
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("dailyUserToken");

  // 🔹 fetch /me
  const fetchMe = async () => {
    if (!token) return;
    const res = await dailyUserApi.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDailyUser(res.data.dailyUser);
  };

  const fetchUserSummary = async () => {
    if (!token) return;
    const res = await dailyUserApi.get("/getUserSummary", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSummary(res.data.summary);
  };

  // 🔹 fetch /today
  const fetchToday = async () => {
    if (!token) return;
    const res = await dailyEntryApi.get("/today", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodaySummary(res.data.summary);
  };

  // 🔹 fetch /today
  const fetchHistory = async () => {
    if (!token) return;

    const res = await dailyEntryApi.get("/history", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setHistory(res.data.entries);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await fetchMe();
        await fetchUserSummary();
        await fetchToday();
        await fetchHistory();
      } catch (err) {
        console.error("DailyUserContext error", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <DailyUserContext.Provider
      value={{
        dailyUser,
        summary,
        todaySummary,
        history,
        loading,
        refreshMe: fetchMe,
        refreshUserSummary: fetchUserSummary,
        refreshToday: fetchToday,
        refreshHistory: fetchHistory,
      }}
    >
      {children}
    </DailyUserContext.Provider>
  );
};