import React from "react";
import { Grid, Box, Typography, styled } from "@mui/material";
import {
  BoxData,
  ButtonAction,
  MainPage,
  ScrollContainer,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";

const AccountCreation = () => {
  return (
    <MainPage>
      <Box>
        <Header />
        <Typography variant="h5">Account Creation Section</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <BoxData>
            <ButtonAction>Create campaign</ButtonAction>
            <ScrollContainer maxHeight="60vh">
              <Typography variant="h1" color="initial">
                algo{" "}
              </Typography>
            </ScrollContainer>
          </BoxData>
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxData>Operation manager</BoxData>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default AccountCreation;
