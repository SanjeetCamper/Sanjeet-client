import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const BannerCtx = createContext(null);
const API = import.meta.env.VITE_BACKEND_URL;

export const DynamicBannerProvider = ({ children }) => {
  const { getToken } = useAuth();

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);

      // Client side route -> no auth required
      const res = await axios.get(`${API}/api/banners`);

      setBanners(res.data.banners || []);
    } catch (err) {
      console.error("❌ Client Banner fetch failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  // If in future client routes become protected using clerk token:
  const fetchBannersWithToken = async () => {
    try {
      setLoading(true);

      const token = await getToken(); // if required
      const res = await axios.get(`${API}/api/banners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBanners(res.data.banners || []);
    } catch (err) {
      console.error("❌ Auth Banner fetch failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannersWithToken(); // normal public fetch
  }, []);

  return (
    <BannerCtx.Provider
      value={{
        banners,
        loading,
        refetch: fetchBannersWithToken,
      }}
    >
      {children}
    </BannerCtx.Provider>
  );
};

export const useDynamicBanners = () => useContext(BannerCtx);
