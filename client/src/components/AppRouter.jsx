import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Description } from "../pages/Description";
import HomeUser from "../pages/HomeUser";
import { Navbar } from "./SideBar/Navbar";
import { Grid, styled } from "@mui/material";

const MainApp = styled(Grid)(() => ({
  display: "flex",
  position: "relative",
}));

const AppRouter = () => {
  const [open, setOpen] = useState(false);
  return (
    <Router>
      <MainApp sx={{ bgcolor: "background.default" }}>
        <Navbar open={open} setOpen={setOpen} />
        <Routes>
          <Route path="/" element={<HomeUser />} />
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
