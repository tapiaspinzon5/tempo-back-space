import React from "react";
import { Grid, Typography } from "@mui/material";
import HeadWinners from "./HeadWinners";
import cardMiniGame from "../../assets/images/awards/cardMiniGame.png";
import { Box, styled } from "@mui/system";
import Liston from "./Liston";

const BoxCard = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  div: {
    position: "relative",
    top: "-25px",
  },
  h6: {
    color: "#3047B0",
    fontWeight: 700,
    backgroundColor: "#fff",
    padding: "0.4rem 3rem",
    borderRadius: "10px",
    boxShadow: "1px 1px 8px #e8e8e8",
    marginTop: "-30px",
  },
  span: {
    background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
    marginTop: ".5rem",
    padding: "3px 8px",
    borderRadius: "3px",
    color: "#fff",
  },
}));

const MiniGames = ({ setSection }) => {
  return (
    <Grid>
      <HeadWinners setSection={setSection} title="Mini Games" />
      <Grid container>
        <Grid xs={12} md={4}>
          <BoxCard>
            <img src={cardMiniGame} alt="" width="50%" />
            <Box>
              <Liston name="Deiby Niño Garces" />
            </Box>

            <Typography variant="h6">Missions</Typography>
            <Typography variant="caption">
              TL. Matilde Puentes Gutierrez{" "}
            </Typography>
          </BoxCard>
        </Grid>
        <Grid xs={12} md={4}>
          <BoxCard>
            <img src={cardMiniGame} alt="" width="50%" />
            <Box>
              <Liston name="Daniel Moreno Salas" />
            </Box>

            <Typography variant="h6">Badges</Typography>
            <Typography variant="caption">
              TL. Matilde Puentes Gutierrez{" "}
            </Typography>
          </BoxCard>
        </Grid>
        <Grid xs={12} md={4}>
          <BoxCard>
            <img src={cardMiniGame} alt="" width="50%" />
            <Box>
              <Liston name="Diego Tapias" />
            </Box>

            <Typography variant="h6">Challenges</Typography>
            <Typography variant="caption">
              TL. Matilde Puentes Gutierrez{" "}
            </Typography>
          </BoxCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MiniGames;
