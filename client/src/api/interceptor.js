import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4343/api/",
});

//10.142.24.175:
//const userData = useSelector((store) => store.loginUser.userData);

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("userTP"));
  config.headers.Authorization = "Bearer " + user.token;
  config.headers.refreshAuthorization = "Bearer " + user.refreshToken;
  config.headers["Access-Control-Allow-Origin"] = "*";

  return config;
});

export { axiosInstance };
