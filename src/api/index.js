import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/weather",
});

export default axiosInstance;
