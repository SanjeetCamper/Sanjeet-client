import axios from "axios";

const dailyUserApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/daily-user`,
});

export default dailyUserApi;
