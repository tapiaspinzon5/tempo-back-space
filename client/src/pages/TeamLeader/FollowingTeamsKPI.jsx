import { Grid, styled } from "@mui/material";
import React from "react";
import Header from "../../components/homeUser/Header";

const MainFT = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const FollowingTeamsKPI = () => {
  return (
    <MainFT>
      <Header />
      <h1>Seguimiento KPI´s</h1>
    </MainFT>
  );
};

export default FollowingTeamsKPI;
