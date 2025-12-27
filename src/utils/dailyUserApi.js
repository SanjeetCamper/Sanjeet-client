import axios from "axios";

const dailyUserApi = axios.create({
  // baseURL: "http://10.123.5.106:5000/api/daily-user",
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/daily-user`,
});

export default dailyUserApi;
