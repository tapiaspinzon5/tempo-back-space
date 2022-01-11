import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.142.24.175:4343/api/",
});

//10.142.24.175:

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("info"));
  config.headers.Authorization = "Bearer " + user.Token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  return config;
});

export { axiosInstance };
