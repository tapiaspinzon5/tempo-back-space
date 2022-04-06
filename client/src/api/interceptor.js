import axios from "axios";

const axiosInstance = axios.create({
	//Localhost
	//baseURL: "http://localhost:4343/api/",
	// Desarrollo - testing
	//baseURL: "https://gamificationtest.teleperformance.co/api/",
	// Pilot
	//baseURL: "https://spacegptest.teleperformance.co/api/",
	baseURL: "http://10.159.186.47:4343/api/",
});

axiosInstance.interceptors.request.use((config) => {
	const user = JSON.parse(sessionStorage.getItem("userTP"));
	config.headers.Authorization = "Bearer " + user.Token;
	config.headers.refreshAuthorization = "Bearer " + user.RefreshToken;
	config.headers["Access-Control-Allow-Origin"] = "http://localhost:4343";
	config.params = { idccms: user.Idccms };
	return config;
});

export { axiosInstance };
