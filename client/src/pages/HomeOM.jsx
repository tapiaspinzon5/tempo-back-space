import React from "react";
import { Grid, styled } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import { AdminCard } from "../components/AdminCard/AdminCard";
import img1 from "../assets/images/OM-1.svg";
import img2 from "../assets/images/OM-2.svg";
import img3 from "../assets/images/OM-3.svg";

const MainHomeOM = styled(Grid)(({ theme }) => ({
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
    title: "Account Name Assignment",
  },
  { id: 2, url: img2, title: "Creation of LOB´s" },
  { id: 3, url: img3, title: "Assigning Team Members" },
];

export const HomeOM = () => {
  return (
    <>
      <MainHomeOM sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <Header />
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>
            <AdminCard data={data[0]} />
          </Grid> */}
          <Grid item xs={12} md={4}>
            <AdminCard data={data[1]} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AdminCard data={data[2]} />
          </Grid>
        </Grid>
        <Footer />
      </MainHomeOM>
    </>
  );
};
