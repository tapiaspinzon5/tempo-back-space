import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { ButtonHome, MainPage } from "../assets/styled/muistyled";
import Header from "../components/homeUser/Header";
import { useNavigate } from "react-router-dom";
import OpenAnalytics from "../assets/images/HomeAdmin/RL_OpenAnalytics.png";
import Organization from "../assets/images/HomeAdmin/CD_organigrama.png";
import Footer from "../components/Footer";

const HomeCD = ({ count }) => {
  const navigate = useNavigate();
  return (
    <MainPage>
      <Box>
        <Header count={count} />
        <Typography variant="h5">
          {" "}
          Welcome to Space GP - Cluster Director
        </Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <ButtonHome
            onClick={() => {
              navigate("/analytics");
            }}
          >
            <img src={OpenAnalytics} alt="Open Analytics" />
          </ButtonHome>
        </Grid>
        <Grid item xs={12} md={6}>
          <ButtonHome
            onClick={() => {
              navigate("/organizationchart");
            }}
          >
            <img src={Organization} alt="Open Account" />
          </ButtonHome>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default HomeCD;
