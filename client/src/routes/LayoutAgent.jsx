import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import HomeUser from "../pages/HomeUser";

const LayoutAgent = () => {
  return (
    <div>
      <Routes>
        <Route index element={<HomeUser />} />
      </Routes>
      <h1>Dasbordar agent</h1>
      <Outlet />
    </div>
  );
};

export default LayoutAgent;
