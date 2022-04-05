import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	//   const navigate = useNavigate();
	const userData = useSelector((store) => store.loginUser.userData);
	if (sessionStorage.getItem("userTP")) {
		const userTP = JSON.parse(sessionStorage.getItem("userTP"));

		if (userTP.Token === userData.Token) {
			return children;
		}
	} else {
		return <Navigate to="/" replace />;
	}

	//   //   return (
	//   //     //  <Route
	//   //     //    {...rest}
	//   //     //   render={() => (userData?.role ? children : <Navigate to="/singin" />)}
	//   //     // />
	//   //   );
	//   const user = true;

	//   if (!user) {
	//     // Redirect them to the /login page, but save the current location they were
	//     // trying to go to when they were redirected. This allows us to send them
	//     // along to that page after they login, which is a nicer user experience
	//     // than dropping them off on the home page.
	//   }

	//   return children;
};

export default PrivateRoute;
