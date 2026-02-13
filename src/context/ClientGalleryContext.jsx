import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const GalleryCtx = createContext(null);
const API = import.meta.env.VITE_BACKEND_URL;

const CACHE_KEY = "client_gallery_cache_v1";
const CACHE_TIME = 1000 * 60 * 5; // 5 minutes

export const ClientGalleryProvider = ({ children }) => {
  const { getToken } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  /* LOAD FROM CACHE */
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.time < CACHE_TIME) {
        setItems(parsed.items);
      }
    }
  }, []);

  /* FETCH FROM SERVER */
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const res = await axios.get(
        `${API}/api/admin/gallery/active/list`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setItems(res.data.items || []);

        /* SAVE CACHE */
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            time: Date.now(),
            items: res.data.items,
          })
        );
      }

    } catch (err) {
      console.error("Gallery fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <GalleryCtx.Provider value={{ items, loading }}>
      {children}
    </GalleryCtx.Provider>
  );
};

export const useClientGallery = () => useContext(GalleryCtx);
