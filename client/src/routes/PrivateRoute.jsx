import React from "react";
import { useSelector } from "react-redux";

import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.loginUser.userData);

  if (localStorage.getItem("userTP")) {
    const userTP = JSON.parse(localStorage.getItem("userTP"));
    console.log(userTP.token);
    console.log(userData.token);
    if (userTP.token === userData.token) {
      return children;
    }
  } else {
    //navigate("/");
  }

  //   return (
  //     //  <Route
  //     //    {...rest}
  //     //   render={() => (userData?.role ? children : <Navigate to="/singin" />)}
  //     // />
  //   );
};

export default PrivateRoute;
