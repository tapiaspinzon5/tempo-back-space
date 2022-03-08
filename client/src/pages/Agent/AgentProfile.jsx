import React from "react";
import { MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { Grid, styled, Box, Typography } from "@mui/material";
import ProfileSection from "../../components/Profile/ProfileSection";
import TPVSection from "../../components/Profile/TPVSection";
import BadgesSection from "../../components/Profile/BadgesSection";

const BoxSection = styled(Grid)(() => ({
  background: "#f9f9f9",
  minHeight: "70vh",
  borderRadius: "10px",
}));

const AgentProfile = ({profile}) => {
  return (
    <MainPage>
      <Header />
      <Grid container spacing={3} marginTop={2}>
        <Typography variant="h1" color="initial"></Typography>
        <Grid item xs={12} md={4}>
          <BoxSection>
            <ProfileSection profile={profile}/>
          </BoxSection>
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxSection>
            <TPVSection />
          </BoxSection>
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxSection>
            <BadgesSection />
          </BoxSection>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default AgentProfile;
