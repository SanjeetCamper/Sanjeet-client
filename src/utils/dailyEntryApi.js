import axios from "axios";

const dailyEntryApi = axios.create({
  baseURL: "http://10.123.5.106:5000/api/daily-entry",
});

export default dailyEntryApi;
