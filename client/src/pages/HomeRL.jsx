import React from "react";
import { Grid, styled } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import { AdminCard } from "../components/AdminCard/AdminCard";
import img1 from "../assets/images/RL-1.svg";
import img2 from "../assets/images/RL-2.svg";

const MainHomeRL = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const data = [
  {
    id: 1,
    url: img1,
    title: "Provide User Info",
  },
  { id: 2, url: img2, title: "KPI´s Data Upload" },
];

export const HomeRL = () => {
  return (
    <>
      <MainHomeRL sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AdminCard data={data[0]} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AdminCard data={data[1]} />
          </Grid>
        </Grid>
        <Footer />
      </MainHomeRL>
    </>
  );
};
