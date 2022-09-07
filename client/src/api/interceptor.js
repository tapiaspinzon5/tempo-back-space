import axios from "axios";
import CryptoJS from "crypto-js";

let d =
  "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";
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
      console.log("se envia", data);
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
      console.log("lo que llega :", data);
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
