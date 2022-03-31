import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:4343/api/",
	//  baseURL: "https://gamificationtest.teleperformance.co/api/",
});

axiosInstance.interceptors.request.use((config) => {
	const user = JSON.parse(localStorage.getItem("userTP"));
	config.headers.Authorization = "Bearer " + user.Token;
	config.headers.refreshAuthorization = "Bearer " + user.RefreshToken;
	config.headers["Access-Control-Allow-Origin"] = "*";
	return config;
});

export { axiosInstance };
