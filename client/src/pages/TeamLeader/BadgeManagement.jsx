import React from "react";
import { Grid, styled } from "@mui/material";
import Header from "../../components/homeUser/Header";

const MainBM = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const BadgeManagement = ({ count }) => {
  return (
    <MainBM>
      <Header count={count} />
      <h1>Barge Management</h1>
    </MainBM>
  );
};

export default BadgeManagement;
