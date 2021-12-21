import React from "react";
import { Grid, Typography, styled, Button, Box, Avatar } from "@mui/material";

const BoxRanking = styled(Box)(({ theme }) => ({
  height: "40vh",
  padding: "1rem",
  backgroundColor: "#f9f9f9",
  margin: "1rem 0",
  borderRadius: "5px",
}));

const CardRanking = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  padding: "5px",
  borderRadius: "3px",
  marginBottom: "0.3rem",
  p: {
    color: "#3047B0",
    margin: "0 1rem",
  },
  div: {
    display: "flex",
    alignItems: "center",
  },
}));

const Ranking = () => {
  return (
    <BoxRanking>
      <CardRanking>
        <Box>
          <Typography variant="body2" fontWeight="bold">
            1
          </Typography>
          <Avatar
            alt="Pepito"
            src="https://www.shareicon.net/data/128x128/2016/08/05/806962_user_512x512.png"
          />
          <Typography variant="body2" fontWeight="bold" color="initial">
            Diego Tapias
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="bold" color="initial">
          500 XP
        </Typography>
      </CardRanking>
      <CardRanking>
        <Box>
          <Typography variant="body2" fontWeight="bold" marginRight={2}>
            2
          </Typography>
          <Avatar
            alt="Pepito"
            src="https://www.shareicon.net/data/128x128/2016/08/05/806962_user_512x512.png"
          />
          <Typography variant="body2" fontWeight="bold" color="initial">
            Daniel Moreno Salas
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="bold" color="initial">
          500 XP
        </Typography>
      </CardRanking>
    </BoxRanking>
  );
};

export default Ranking;
