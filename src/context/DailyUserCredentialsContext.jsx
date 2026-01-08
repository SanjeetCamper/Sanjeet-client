import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const DailyUserCredentialsContext = createContext();
const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const DailyUserCredentialsProvider = ({ children }) => {
  const { getToken, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // 👇 clear naming (no clash)
  const [credentialsInfo, setCredentialsInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch credential status
  const fetchCredentialsStatus = async () => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    try {
      const token = await getToken();
      const res = await axios.get(
        `${API_BASE}/api/daily-user/my-status`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCredentialsInfo(res.data.dailyUser || null);
    } catch {
      setCredentialsInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 set username/password (ONE TIME)
  const setDailyUserCredentials = async ({
    username,
    password,
  }) => {
    const token = await getToken();

    await axios.post(
      `${API_BASE}/api/daily-user/set-credentials`,
      { username, password },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    await fetchCredentialsStatus(); // refresh
  };

  useEffect(() => {
    fetchCredentialsStatus();
  }, []);

  return (
    <DailyUserCredentialsContext.Provider
      value={{
        credentialsInfo,
        loading,
        refreshCredentialsStatus: fetchCredentialsStatus,
        setDailyUserCredentials,
      }}
    >
      {children}
    </DailyUserCredentialsContext.Provider>
  );
};

export const useDailyUserCredentials = () =>
  useContext(DailyUserCredentialsContext);