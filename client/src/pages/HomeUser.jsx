import React from "react";
import { Grid, styled, Typography, Button, Box } from "@mui/material";
import Header from "../components/homeUser/Header";

// import Ranking from "../components/homeUser/Ranking";
import Footer from "../components/Footer";
import ProgressHome from "../components/homeUser/ProgressHome";
import Podium from "../components/progressCharts/Podium";
import Circle from "../components/progressCharts/Circle";
import Diamond from "../components/progressCharts/Diamond";
import medal from "../assets/badges/ten.svg";
import StarProgress from "../components/progressCharts/StarProgress";
import Ranking from "../components/homeUser/Ranking";
//import { Star5 } from "../components/Star 5/Star5";
//import Games from "../components/homeUser/Games";
//import LastPlayed from "../components/homeUser/LastPlayed";
//import CategoryGames from "../components/homeUser/CategoryGames";
//import News from "../components/homeUser/News";
//import ProgressSection from "../components/homeUser/ProgressSection";
//import DescriptionGame from "../components/homeUser/DescriptionGame";

const MainHomeUser = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const SeeButton = styled(Button)(() => ({
  textTransform: "none",
  background: "#bdbdbd",
  color: "white",
  width: "8rem",
  padding: "0",
  borderRadius: "10px",
}));

const HomeUser = () => {
  return (
    <>
      <MainHomeUser
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProgressHome />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Podium />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Ranking />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" align="center" fontWeight="bold">
              Total Exp
            </Typography>
            <Circle />
            <Box display="flex" justifyContent="center">
              <SeeButton sx={{ backgroundColor: " #137ee0    " }}>
                See more
              </SeeButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" align="center" fontWeight="bold">
              Challenges Won
            </Typography>
            <Diamond />
            <Box display="flex" justifyContent="center">
              <SeeButton sx={{ backgroundColor: " #0cce6c   " }}>
                See more
              </SeeButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" align="center" fontWeight="bold">
              Games Played
            </Typography>
            <StarProgress />
            <Box display="flex" justifyContent="center">
              <SeeButton sx={{ backgroundColor: "  #f5be55  " }}>
                See more
              </SeeButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" align="center" fontWeight="bold">
              Latest Achievement
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "28vh",
                padding: "1rem 0",
              }}
            >
              <img src={medal} alt="top-Ten" height="75%" width="75%" />
              <Box display="flex" justifyContent="center" paddingTop="5px">
                <SeeButton sx={{ backgroundColor: " #45a2c1 " }}>
                  See more
                </SeeButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* <ProgressSection /> */}
        <Footer />
      </MainHomeUser>
    </>
  );
};

export default HomeUser;
