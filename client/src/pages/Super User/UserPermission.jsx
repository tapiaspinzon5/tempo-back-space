import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";

const UserPermission = () => {
  return (
    <MainPage>
      <Box>
        <Header />
        <Typography variant="h5">Set New User Permissions</Typography>
      </Box>
      <Grid container>
        <Grid item xs={12}>
          contenidos
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default UserPermission;
