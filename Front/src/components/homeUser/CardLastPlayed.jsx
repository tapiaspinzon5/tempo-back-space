import React from "react";
import { Grid, Typography, Box, styled } from "@mui/material";

const CardPlayed = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    borderRadius: "5px",
    background: "#f3f3f2",
  },
}));

const BoxImage = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  background: "#fafafa",
  borderRadius: "10px",
  height: "5rem",
  width: "5rem",
  margin: ".5rem",
  boxShadow: "2px 2px 5px #bdbdbd",
  color: theme.palette.text.secondary,
  transition: "transform .4s",
  "&:hover": {
    background: "#e6e6e6",
    transform: "scale(1.01) ",
    boxShadow: "2px 2px 5px #a4a4a4",
  },
}));

const CardLastPlayed = () => {
  return (
    <CardPlayed>
      <BoxImage>
        <img src="./" alt="" />
      </BoxImage>
      <Box>
        <Typography variant="body1" color="initial" sx={{ fontWeight: "bold" }}>
          Apex legends
        </Typography>
        <Typography variant="body2" color="initial">
          Lv. 158
        </Typography>
      </Box>
    </CardPlayed>
  );
};

export default CardLastPlayed;
