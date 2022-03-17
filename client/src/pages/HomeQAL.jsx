import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import QA_MissionManage from '../assets/images/HomeAdmin/QA_MissionManage.png'
import QA_MissionAssign from '../assets/images/HomeAdmin/QA_MissionAssignment.png'
import Analytics from '../assets/images/HomeAdmin/OpenAnalytics.png'
import { ButtonHome, MainPage } from "../assets/styled/muistyled";


export const HomeQAL = ({ count }) => {
  const navigate = useNavigate();
  return (
  
      <MainPage  >
        <Header count={count} />
        <Typography variant="h5" > Welcome to Space GP - QA Lead</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
             <ButtonHome
             disabled
                    onClick={() => {
                      navigate("/upquiz");
                    }}
                  >
                    <img src={QA_MissionManage} alt="QA_MissionManage" />
                  </ButtonHome>
          </Grid>
          <Grid item xs={12} md={4}>
             <ButtonHome
                    onClick={() => {
                      navigate("/upquiz");
                    }}
                  >
                    <img src={QA_MissionAssign} alt="QA_MissionAssign" />
                  </ButtonHome>
          </Grid>
          <Grid item xs={12} md={4}>          
                  <ButtonHome
                  disabled
                    onClick={() => {
                      navigate("/upquiz");
                    }}
                  >
                    <img src={Analytics} alt="Analytics" />
                  </ButtonHome>

                  
          </Grid>
        </Grid>
        <Footer />
      </MainPage>
    
  );
};
