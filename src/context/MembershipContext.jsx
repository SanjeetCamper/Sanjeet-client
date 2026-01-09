import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useDailyUserCredentials } from "./DailyUserCredentialsContext";

const MembershipContext = createContext();
const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const MembershipProvider = ({ children }) => {
  const { getToken, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const {refreshCredentialsStatus} = useDailyUserCredentials();

  const [plans, setPlans] = useState([]);
  const [activeMembership, setActiveMembership] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 fetch all active plans
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/membership/plans`);
      setPlans(res.data.plans || []);
    } catch (err) {
      setError("Failed to load membership plans");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 fetch my active membership
  const fetchMyMembership = async () => {
    if (!isSignedIn) return;

    try {
      const token = await getToken();
      const res = await axios.get(`${API_BASE}/api/membership/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveMembership(res.data.membership || null);
    } catch (err) {
      setActiveMembership(null);
    }
  };

  // 🔹 buy membership
  const buyMembership = async (planId) => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      const res = await axios.post(
        `${API_BASE}/api/membership/buy`,
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.credentialsRequired) {
        navigate("/daily-user/create-credentials");
      } else {
        navigate("/dailyuser");
      }

      await refreshCredentialsStatus();
      fetchMyMembership();
    } catch (err) {
      const msg = err?.response?.data?.message || "Membership purchase failed";
      setError(msg);
      setTimeout(()=>{
        setError('');
      },3000);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    if (isSignedIn) {
      fetchMyMembership();
    }
  }, [isSignedIn]);

  return (
    <MembershipContext.Provider
      value={{
        plans,
        activeMembership,
        loading,
        error,
        buyMembership,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};

export const useMembership = () => useContext(MembershipContext);
