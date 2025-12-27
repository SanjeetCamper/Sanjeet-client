import axios from "axios";

const dailyEntryApi = axios.create({
  // baseURL: "https://sanjeet-client.pages.dev/api/daily-entry",
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/daily-user`,
});

export default dailyEntryApi;
