import React from "react";
import { useSelector } from "react-redux";

import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const userData = useSelector((store) => store.loginUser.userData);

  console.log(...rest);

  return (
    <Route
      {...rest}
      render={() => (userData?.role ? children : <Navigate to="/singin" />)}
    />
  );
};

export default PrivateRoute;
