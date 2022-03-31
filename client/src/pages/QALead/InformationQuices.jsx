import { Grid, Typography, Box, styled } from "@mui/material";
import React from "react";
import { MainPage } from "../../assets/styled/muistyled";
import CardButton from "../../components/cardUser/CardButton";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";

export const BoxContain = styled(Box)(() => ({
  background: "#f9f9f9",
  //background: "#f1f1f1",
  height: "65vh",
  borderRadius: "10px",
  overflowY: "scroll",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));

const InformationQuices = () => {
  return (
    <MainPage>
      <Header />
      <Typography variant="h5">Information Quizes</Typography>

      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" textAlign="center" color="#3047B0">
            Teams
          </Typography>
          <BoxContain mt={1}>
            <CardButton
              title="Matilde Puentes"
              subtitle="Team Leader"
              icon="arrow"
            />

            <CardButton title="Diego Tapias " subtitle="Agent" icon="arrow" />
          </BoxContain>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" textAlign="center" color="#3047B0">
            Team Members
          </Typography>
          <BoxContain mt={1}>
            <CardButton title="MAtilde Puentes" subtitle="Agent" icon="arrow" />

            <CardButton title="Diego Tapias " subtitle="Agent" icon="arrow" />
          </BoxContain>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" textAlign="center" color="#3047B0">
            Missions Assigned
          </Typography>
          <BoxContain mt={1}>
            <CardButton title="Quiz1" subtitle="Quiz Topic" icon="trash" />
          </BoxContain>
        </Grid>
      </Grid>

      <Footer />
    </MainPage>
  );
};

export default InformationQuices;
