import axios from "axios";

const dailyEntryApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/daily-entry`,
});

export default dailyEntryApi;
