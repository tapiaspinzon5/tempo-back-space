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
          <Avatar alt="Pepito" src="" />
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
          <Avatar alt="Pepito" src="" />
          <Typography variant="body2" fontWeight="bold" color="initial">
            Daniel Moreno Salas
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="bold" color="initial">
          489 XP
        </Typography>
      </CardRanking>
      <CardRanking>
        <Box>
          <Typography variant="body2" fontWeight="bold" marginRight={2}>
            3
          </Typography>
          <Avatar alt="Pepito" src="" />
          <Typography variant="body2" fontWeight="bold" color="initial">
            Matilde Puentes
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="bold" color="initial">
          456 XP
        </Typography>
      </CardRanking>
      <CardRanking>
        <Box>
          <Typography variant="body2" fontWeight="bold" marginRight={2}>
            4
          </Typography>
          <Avatar alt="Pepito" src="" />
          <Typography variant="body2" fontWeight="bold" color="initial">
            Juliana Cardona
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="bold" color="initial">
          431 XP
        </Typography>
      </CardRanking>
      <CardRanking>
        <Box>
          <Typography variant="body2" fontWeight="bold" marginRight={2}>
            5
          </Typography>
          <Avatar alt="Pepito" src="" />
          <Typography variant="body2" fontWeight="bold" color="initial">
            Deiby Niño
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="bold" color="initial">
          416 XP
        </Typography>
      </CardRanking>
    </BoxRanking>
  );
};

export default Ranking;
