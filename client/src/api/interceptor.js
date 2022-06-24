import axios from "axios";
import CryptoJS from "crypto-js";

const axiosInstance = axios.create({
	//Localhost
	baseURL: "http://localhost:4343/api/",
	// Desarrollo - testing
	//baseURL: "https://gamificationtest.teleperformance.co/api/",
	// Pilot
	//baseURL: "https://spacegptest.teleperformance.co/api/",
	//baseURL: "http://10.146.244.120:4343/api/",
	transformRequest: [
		function (data, headers) {
			// Do whatever you want to transform the data
			//console.log("se envia", data);
			let encrypted = CryptoJS.AES.encrypt(
				JSON.stringify(data),
				"secret key 123"
			).toString();
			data = { data: encrypted };
			let hash = CryptoJS.MD5(encrypted).toString();
			headers.refreshAuthorization =
				headers.refreshAuthorization + "&#&" + hash;
			return JSON.stringify(data);
		},
	],
	transformResponse: [
		function (data) {
			let bytes = CryptoJS.AES.decrypt(
				data.replace(/['"]+/g, ""),
				"secret key 123"
			);
			let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			data = decryptedData;
			//console.log("llega   ", decryptedData);
			return data;
		},
	],
});

axiosInstance.interceptors.request.use((config) => {
	const user = JSON.parse(
		CryptoJS.AES.decrypt(
			sessionStorage.getItem("userTP"),
			"secret key 123"
		).toString(CryptoJS.enc.Utf8)
	);
	config.headers["Content-Type"] = "application/json; charset=ISO-8859-1";
	config.headers.responseEncoding = "utf8";
	config.headers.Authorization = "Bearer " + user.Token;
	config.headers.refreshAuthorization = "Bearer " + user.RefreshToken;
	config.headers["Access-Control-Allow-Origin"] =
		"https://spacegptest.teleperformance.co/api/";
	//config.params = { idccms: user.Idccms };
	config.data = { ...config.data, idccms: user.Idccms };
	return config;
});

export { axiosInstance };
