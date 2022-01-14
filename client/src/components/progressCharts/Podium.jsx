import React from "react";
import podium from "../../assets/images/podium.svg";
import { Typography, Box, styled, Avatar } from "@mui/material";
import { justify } from "@antv/g2plot/lib/plots/sankey/sankey";
import "../../assets/sass/styles.scss";

const PodiumBox = styled(Box)(({ theme }) => ({
  height: "40vh",
  padding: "1rem",
  backgroundColor: "#f9f9f9",
  backgroundImage: `url(${podium})`,
  backgroundPosition: "center bottom",
  backgroundRepeat: "no-repeat",

  margin: "1rem 0",
  borderRadius: "5px",
}));

const BoxAvatarPodium = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  span: {
    color: "#3047B0",
    fontWeight: "bold",
  },
}));

const Podium = () => {
  return (
    <PodiumBox
      sx={{
        backgroundSize: {
          xs: "90%",
          sm: "60%",
          md: "80%",
          lg: "70%",
          xl: "90% ",
        },
      }}
    >
      <BoxAvatarPodium>
        <Avatar alt="Diego Tapias" src="" />
        <Typography variant="caption" color="initial">
          {}Diego Tapias
        </Typography>
      </BoxAvatarPodium>
      <BoxAvatarPodium sx={{ top: "-1rem", left: "-35%" }}>
        <Avatar alt="Daniel Moreno" src="" />
        <Typography variant="caption" color="initial">
          Daniel Moreno
        </Typography>
      </BoxAvatarPodium>
      <BoxAvatarPodium sx={{ top: "-2rem", left: "35%" }}>
        <Avatar alt="Matilde Puentes" src="" />
        <Typography variant="caption" color="initial">
          Matilde Puentes
        </Typography>
      </BoxAvatarPodium>
    </PodiumBox>
  );
};

export default Podium;
