import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid,  Typography  } from "@mui/material";
import { ButtonHome, MainPage } from "../assets/styled/muistyled";

import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import Analytics from '../assets/images/HomeAdmin/OpenAnalytics.png'
import OM_LOBManage from '../assets/images/HomeAdmin/OM_LOBManage.png'
import OM_RoleManage from '../assets/images/HomeAdmin/OM_RoleManage.png'




////////////////////////////////////////
export const HomeOM = ({ count }) => {
  const navigate = useNavigate();

  return (
    <>
      <MainPage>
        <Header count={count} />
        <Typography variant="h5" > Welcome to Space GP - Operation Manager</Typography>


        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
                  <ButtonHome
                  disabled
                    onClick={() => {
                      navigate("/upcampaign");
                    }}
                  >
                    <img src={OM_LOBManage} alt="top-Ten" />
                  </ButtonHome>
          </Grid>
          <Grid item xs={12} md={4}>
                  <ButtonHome
                    onClick={() => {
                      navigate("/upcampaign");
                    }}
                  >
                    <img src={OM_RoleManage} alt="top-Ten" />
                  </ButtonHome>
          </Grid>
          <Grid item xs={12} md={4}>
                  <ButtonHome
                  disabled
                    onClick={() => {
                      navigate("/upcampaign");
                    }}
                  >
                    <img src={Analytics} alt="top-Ten" />
                  </ButtonHome>
          </Grid>
        </Grid>
        <Footer />
      </MainPage>
    </>
  );
};
