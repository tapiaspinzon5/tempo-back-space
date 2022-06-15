import React from "react";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	//   const navigate = useNavigate();
	const userData = useSelector((store) => store.loginUser.userData);
	if (sessionStorage.getItem("userTP")) {
		const userTP = JSON.parse(
			CryptoJS.AES.decrypt(
				sessionStorage.getItem("userTP"),
				"secret key 123"
			).toString(CryptoJS.enc.Utf8)
		);

		if (userTP.Token === userData.Token) {
			return children;
		}
	} else {
		return <Navigate to="/" replace />;
	}
};

export default PrivateRoute;
