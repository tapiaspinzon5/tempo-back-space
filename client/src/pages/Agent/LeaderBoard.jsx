import React from "react";
import { Typography, Grid, styled, Box } from "@mui/material";
import { MainPage, BoxContain } from "../../assets/styled/muistyled";
import Header from "../../components/homeUser/Header";

const LeaderBoard = () => {
  return (
    <MainPage>
      <Grid marginTop={2}>
        <Header />
      </Grid>
      <Box margin="2rem 0" color="#3047B0">
        <Typography variant="h5" fontWeight="500">
          Leaderboard
        </Typography>
      </Box>
      <Grid container columnSpacing={7}>
        <BoxContain item xs={12} md={6}>
          left
        </BoxContain>
        <BoxContain item xs={12} md={6}>
          right
        </BoxContain>
      </Grid>
    </MainPage>
  );
};

export default LeaderBoard;
