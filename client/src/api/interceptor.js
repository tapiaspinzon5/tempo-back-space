import axios from "axios";
import CryptoJS from "crypto-js";

let d =
	"U2FsdGVkX1+BC3W5s9ugds2QjFM/Im+kXgjhi3u5YHjnwtpDwdpc42GIYjQVoRupyo6EQMbSx50k4nWa4NKMTbQm45b3/Gj6O5XNKAJ58ZNAxy0fZ37I+9RW9RY0DIy1ZShvnVCi4XOK21BRnvqGu3yOmD/ejrKHRhpkyztAncc9AvfrhsKmhzFyD2wljokQmQtcomL12Z6S3P56zrLMSxspaH5C4Nb2/Wgns8+PKhWC7v0uFXh1XfF6ekHN08D76RvgbKwrWc4jd/2USA4oNIdwQWU5g0Lq+N+h5Ui6HjN4CDYVPTMHx/7i2PCKGNERlauJvI49G3ujydDoGej95+30K2c2JSYZW5RR5HW4z1v/D41pLMSDAU2Z1dJJ+jchcBT3VxSkYhtZDHczPDmVHyFhYAjvyIxcdzn1NPDNFH+70BOoNDhKYWBWlr1WYYZVb3c68tyArIRULcVRToVfFP6L+SbxdvmvClTnY26EJgpVg3StGvkafAXL5n1AbWixPLoSH0tTcPmg6XjbW30zl/GqR0IbwnuyU/DQRHiavYfWi9R1FSJf7AVm37FE4sSTifmqhrPuK5UD8hP9sKBPKVmLWF7RLXOuyEnrltu/umNCUw63HvgY61mkBTzucCN/5oWbq4C0HAwhJirOD3rvAF9e1YlUlgBf0WKHuVDlHnMJnmG6A+z1DmqJ1r+xwbHFUY2HQichpRPvOzlFH9IAb10gt8FhFYMZJtMJAOw0j+uTkLmfEzmoNCAQ/R5DF/+pWjI+3IKFa7qe2lmancjXr1AbLC3GQ0zPJUVIlntgtHt6N+5phIu04NdjN1fV2b5w2fNwEOOtClvQMl02kJJIZzaLFwD/Xgwv8vDWWlIpt0b+3m6tM9cyCtOoLw9miqdHGBn193STE9ujkBWU5nB0FV+pyBPoR56LLhgTC1JVbma7l5QD7EL0UagWvqwGZ6imVwYntAeM/7Gbahutarx75ydOfP+4NFnf2aE1qrJ+ILmc8N/eRpYyevr5XUGuBErNXKnnjR+cgcxMGdFA2BzEBz2OV6jLS9czCHzcLCthFrx4NH+pLT9TF2qhTWkZLPcboHt3mxGZ+DxjxZdg3z0iebKWhjZ1r/CwIWFjwXbebp6/HqcH7LderRRvTu5BQab/UK9rF92N9QfrNSG8erLPC24h5pVYg9zb9lMT12ei8ZciJMYAZzXSUehfhNbhHpcmeDVnYtWcbOdFx+RXs5icrWY4jIoSlupJ98x/cQldGDbfTL0FUAZdiFFTUngpSC1ZFhMJvrYCDnoLHFiY+knBlwXB3TNzyo8iEB7ncZ5CVwRV4dH0mmxgcppuyA0RjMFsH6lU+RzjcDc8JFUwwlWJTA==";
let prueba = CryptoJS.AES.decrypt(d.replace(/['"]+/g, ""), "secret key 123");
let decryptedData = JSON.parse(prueba.toString(CryptoJS.enc.Utf8));
console.log(decryptedData);

const axiosInstance = axios.create({
	//Localhost
	baseURL: "http://localhost:4343/api/",
	// Desarrollo - testing
	//baseURL: "https://gamificationtest.teleperformance.co/api/",
	//baseURL: "https://gptest.teleperformance.co/api/",
	// Pilot
	//baseURL: "https://spacegptest.teleperformance.co/api/",
	//baseURL: "http://10.138.143.93:4343/api/",
	//produccion
	//baseURL: "https://spacegp.teleperformance.co/api/",

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
			//console.log("lo que llega :", data);
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
	//config.data = { ...config.data, idccms: 4581022 };
	config.data = { ...config.data, idccms: user.Idccms };
	return config;
});

export { axiosInstance };
