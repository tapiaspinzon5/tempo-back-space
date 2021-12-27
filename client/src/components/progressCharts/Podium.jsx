import React from "react";
import podium from "../../assets/images/podium.svg";
import { Typography, Box, styled, Avatar } from "@mui/material";
import { justify } from "@antv/g2plot/lib/plots/sankey/sankey";

const PodiumBox = styled(Box)(({ theme }) => ({
  height: "40vh",
  padding: "1rem",
  backgroundColor: "#f9f9f9",
  backgroundImage: `url(${podium})`,
  backgroundPosition: "center bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "80%",
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
    <PodiumBox>
      <BoxAvatarPodium>
        <Avatar
          alt="Remy Sharp"
          src="https://www.shareicon.net/data/128x128/2016/08/05/806962_user_512x512.png"
        />
        <Typography variant="caption" color="initial">
          Deiby Niño
        </Typography>
      </BoxAvatarPodium>
      <BoxAvatarPodium sx={{ top: "-1rem", left: "-35%" }}>
        <Avatar
          alt="Travis Howard"
          src="https://www.shareicon.net/data/128x128/2016/08/05/806962_user_512x512.png"
        />
        <Typography variant="caption" color="initial">
          Deiby Niño
        </Typography>
      </BoxAvatarPodium>
      <BoxAvatarPodium sx={{ top: "-2rem", left: "35%" }}>
        <Avatar
          alt="Cindy Baker"
          src="https://www.shareicon.net/data/128x128/2016/08/05/806962_user_512x512.png"
        />
        <Typography variant="caption" color="initial">
          Deiby Niño
        </Typography>
      </BoxAvatarPodium>
    </PodiumBox>
  );
};

export default Podium;
