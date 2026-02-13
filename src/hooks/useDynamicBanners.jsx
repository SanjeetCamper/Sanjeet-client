import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL;

export const useDynamicBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/banners`);
        const data = await res.json();
        setBanners(data.banners || []);
      } catch (err) {
        console.error("Banner fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { banners, loading };
};
