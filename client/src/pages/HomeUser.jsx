import React, { useState } from "react";
import { Grid, styled } from "@mui/material";
import Header from "../components/homeUser/Header";
import Games from "../components/homeUser/Games";
import LastPlayed from "../components/homeUser/LastPlayed";
import CategoryGames from "../components/homeUser/CategoryGames";
import DescriptionGame from "../components/homeUser/DescriptionGame";

const MainHomeUser = styled(Grid)(() => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",

  margin: "15px",
}));

const BoxDecription = styled(Grid)(() => ({
  position: "absolute",
  zIndex: 1000,
  top: 0,
  right: "-27rem",
  transition: "right .4s",
}));

const HomeUser = () => {
  //estado para mostrar el componente DescriptionGame
  const [onHover, setOnHover] = useState(false);
  //mostrar/ocultar DescriptionGame
  const handleMouseEnter = (e) => {
    setOnHover(true);
  };
  const handleMouseLeave = (e) => {
    setOnHover(false);
  };

  return (
    <MainHomeUser>
      <Grid>
        <Header />
        <Games
          setOnHover={setOnHover}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        <LastPlayed />
        <CategoryGames />
      </Grid>
      <BoxDecription sx={onHover && { right: "1rem" }}>
        <DescriptionGame />
      </BoxDecription>
    </MainHomeUser>
  );
};

export default HomeUser;
