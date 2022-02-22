import React from "react";
import podium from "../../assets/images/podium.png";
import { Typography, Box, styled, Avatar } from "@mui/material";
import { shortName } from "../../helpers/helpers";
import avatar from "../../assets/temp-image/avatar.png";

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

const Podium = ({ podio }) => {
  return (
    <PodiumBox
      sx={{
        backgroundSize: {
          xs: "90%",
          sm: "60%",
          md: "80%",
          lg: "60%",
          xl: "60% ",
        },
      }}
    >
      <BoxAvatarPodium>
        <Avatar alt="Diego Tapias" src={avatar} />
        <Typography variant="caption" color="initial">
          {podio.length > 0
            ? shortName(podio[0].Agent) + "."
            : "The Game Starts Soon"}
        </Typography>
      </BoxAvatarPodium>
      <BoxAvatarPodium sx={{ top: "-1rem", left: "-35%" }}>
        <Avatar alt="Daniel Moreno" src={avatar} />
        <Typography variant="caption" color="initial">
          {podio.length > 1 ? shortName(podio[1].Agent) + "." : ""}
        </Typography>
      </BoxAvatarPodium>
      <BoxAvatarPodium sx={{ top: "-2rem", left: "35%" }}>
        <Avatar alt="Matilde Puentes" src={avatar} />
        <Typography variant="caption" color="initial">
          {podio.length > 2 ? shortName(podio[2].Agent) + "." : ""}
        </Typography>
      </BoxAvatarPodium>
    </PodiumBox>
  );
};

export default Podium;
