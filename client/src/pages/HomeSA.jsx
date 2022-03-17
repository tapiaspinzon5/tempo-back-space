import React from "react";
import { Grid, Typography,  } from "@mui/material";

import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import Analytics from '../assets/images/HomeAdmin/OpenAnalytics.png'
import SA_OpenAccount from '../assets/images/HomeAdmin/SA_OpenAccount.png'
import SA_OpenUser from '../assets/images/HomeAdmin/SA_OpenUser.png'


import { useNavigate } from "react-router-dom";
import { ButtonHome, MainPage } from "../assets/styled/muistyled";



export const HomeSA = ({ count }) => {
  const navigate = useNavigate();

  return (
  
      <MainPage>
        <Header count={count} />

        <Typography variant="h5" > Welcome to Space GP - Super Admin</Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
         
                  <ButtonHome
                    onClick={() => {
                      navigate("/usermanage");
                    }}
                    disabled
                  >
                    <img src={SA_OpenUser} alt="Open User" />
                  </ButtonHome>

          </Grid>
          <Grid item xs={12} md={4}>
         
                  <ButtonHome
                    onClick={() => {
                      navigate("/upcount");
                    }}
                  >
                    <img src={SA_OpenAccount} alt="Open Account" />
                  </ButtonHome>

          </Grid>
          <Grid item xs={12} md={4}>
          
                  <ButtonHome
                    onClick={() => {
                      navigate("/analitycs-su");
                    }}
                    disabled
                  >
                    <img src={Analytics} alt="Analytics" />
                  </ButtonHome>

                 
          </Grid>
        </Grid>
        <Footer />
      </MainPage>
    
  );
};
