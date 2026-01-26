import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const VillageContext = createContext();
const API = import.meta.env.VITE_BACKEND_URL;

export const VillageProvider = ({ children }) => {
  const [villages, setVillages] = useState([]);

  const fetchVillages = async () => {
    try {
      const res = await axios.get(`${API}/api/client/villages`);
      setVillages(res.data.villages || []);
    } catch (err) {
      console.error("Village fetch error:", err);
    }
  };

  useEffect(() => {
    fetchVillages();
  }, []);

  return (
    <VillageContext.Provider value={{ villages }}>
      {children}
    </VillageContext.Provider>
  );
};

export const useVillages = () => useContext(VillageContext);
