import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const ClientScrollBannerCtx = createContext(null);
const API = import.meta.env.VITE_BACKEND_URL;

export const ClientScrollBannerProvider = ({ children }) => {
  const { getToken } = useAuth();

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEnabledScrollBanners = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const res = await axios.get(
        `${API}/api/admin/scrollBanner/enabled/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setBanners(res.data.banners || []);
      }

    } catch (error) {
      console.error("Client ScrollBanner Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnabledScrollBanners();
  }, []);

  return (
    <ClientScrollBannerCtx.Provider
      value={{
        banners,
        loading,
      }}
    >
      {children}
    </ClientScrollBannerCtx.Provider>
  );
};

export const useClientScrollBanner = () =>
  useContext(ClientScrollBannerCtx);
