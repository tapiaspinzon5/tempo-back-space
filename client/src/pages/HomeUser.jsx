import React from "react";
import { Grid, styled } from "@mui/material";
import Header from "../components/homeUser/Header";
import ChallengeSummary from "../components/homeUser/ChallengeSummary";

//import Games from "../components/homeUser/Games";
//import LastPlayed from "../components/homeUser/LastPlayed";
import CategoryGames from "../components/homeUser/CategoryGames";
import Ranking from "../components/homeUser/Ranking";
//import DescriptionGame from "../components/homeUser/DescriptionGame";

const MainHomeUser = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "130px",
  },
}));

// const BoxDecription = styled(Grid)(() => ({
//   position: "absolute",
//   zIndex: 1000,
//   top: 0,
//   right: "-27rem",
//   transition: "right .4s",
// }));

const HomeUser = () => {
  //estado para mostrar el componente DescriptionGame
  // const [onHover, setOnHover] = useState(false);
  //mostrar/ocultar DescriptionGame
  //const handleMouseEnter = (e) => {
  ///  setOnHover(true);
  //};
  //const handleMouseLeave = (e) => {
  //  setOnHover(false);
  //};

  return (
    <MainHomeUser sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <Header />
      <Grid container>
        <Grid xs={12} md={6}>
          <ChallengeSummary />
        </Grid>
        <Grid xs={12} md={6}>
          <Ranking />
        </Grid>
      </Grid>
      <CategoryGames />
    </MainHomeUser>
  );
};

export default HomeUser;
