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
};

export default PrivateRoute;
