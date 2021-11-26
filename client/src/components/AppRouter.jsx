import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Description } from "../pages/Description";
import HomeUser from "../pages/HomeUser";
import { Navbar } from "./SideBar/Navbar";
import { Grid, styled } from "@mui/material";
import { Catalogue } from "./Catalogue/Catalogue";

const MainApp = styled(Grid)(() => ({
  display: "flex",
  //position: "relative",
}));

const AppRouter = () => {
  return (
    <Router>
      <MainApp>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeUser />} />
          <Route path="/catalogo" element={<Catalogue />} />
          <Route path="/description/:gameID" element={<Description />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </MainApp>
    </Router>
  );
};

export default AppRouter;
