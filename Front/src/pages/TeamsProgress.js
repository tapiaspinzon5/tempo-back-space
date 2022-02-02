import React from 'react'
import { Grid, styled } from "@mui/material";
import Header from '../components/homeUser/Header';
import TeamsRanking from '../components/teamProgress/TeamsRanking';

const customData = require('../DBData/progressPage.json')

const MainTeamsProgress = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "130px",
  },
}));
const TeamsProgress = () => {
  return (
    <MainTeamsProgress>
      <Header/>
      <Grid container>
        <Grid item xs={4} md={4}>
          <TeamsRanking data = {customData}/>
        </Grid>
        <Grid item xs={4} md={4}>
          <TeamsRanking data = {customData}/>
        </Grid>
        <Grid item xs={4} md={4}>
          <TeamsRanking data = {customData}/>
        </Grid>
      </Grid>
    </MainTeamsProgress>
  )
}

export default TeamsProgress
