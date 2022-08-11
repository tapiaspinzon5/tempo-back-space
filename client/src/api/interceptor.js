import axios from "axios";
import CryptoJS from "crypto-js";

/* let d =
	"U2FsdGVkX1/6dpcGdv9ce3mx/MZt4TfjcQSwVr3VDsJcPqCeGas+6bN6QdPmaPrxoTY9dtlqB/IGhRmefOClYsdKW8WX62sddglWnjV/EFkrxxdGf74mE/cGvO+OHHL7lD4LDoQXzUYOmAAVTbcBby1rOSFRR8/zzjZgdvPc+PJ9dfRcVZRxbpeCamb5GicU9BWPpPkf+3WUPVQ+k/dYYBQUoL+e1DnKBsvfI9Zyhfut9bIrO9yydtql+81fCof20Xt1nS2WBDZycTYphCkl7f8yTBzY7ErYB42+iHSbk/f844/myM/9or7ztjrpLH8bFD0ss5h2ZIfhgQTuyZVDQD28t02PNiNvjW1pO1f8bETcC8bDYE4uBNhIBzVQKkzgxnoKv3tO3cWgGR2Itum12JqpyCCZTCJkfVfBuivZ4yxyiWWI8SdkpkGshHga9ubM";

let prueba = CryptoJS.AES.decrypt(d.replace(/['"]+/g, ""), "secret key 123");
let decryptedData = JSON.parse(prueba.toString(CryptoJS.enc.Utf8));
console.log(decryptedData); */

const axiosInstance = axios.create({
	//Localhost
	baseURL: "http://localhost:4343/api/",
	// Desarrollo - testing
	//baseURL: "https://gamificationtest.teleperformance.co/api/",
	//baseURL: "https://gptest.teleperformance.co/api/",
	// Pilot
	//baseURL: "https://spacegptest.teleperformance.co/api/",
	//baseURL: "http://10.138.143.93:4343/api/",
	transformRequest: [
		function (data, headers) {
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
	config.headers["Access-Control-Allow-Origin"] = "http://localhost:4343";
	config.data = { ...config.data, idccms: user.Idccms };
	return config;
});

export { axiosInstance };
