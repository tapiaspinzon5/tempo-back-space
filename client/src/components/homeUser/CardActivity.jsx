import React from "react";
import { Typography, Box, Grid, styled, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProgresBar from "../progressCharts/ProgresBar";

const CardCategory = styled(Grid)(({ theme }) => ({
  background: "#f2fafa",
  borderRadius: "12px",
  maxWidth: "391px",
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const BoxContent = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  margin: "1rem 0 0 1rem",
  alignContent: "center",
  img: {
    height: "4.375rem",
    width: "4.375rem",
    background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
    borderRadius: "50%",
    margin: "1px",
  },
  div: {
    width: "70%",
    padding: "5px 1rem",
    color: "#000",

    h6: {
      fontWeight: "bold",
    },
  },
}));

const BoxAction = styled(Box)(({ theme }) => ({
  height: "72px",
  borderRadius: "0 0 12px 12px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  span: {
    color: "white",
  },
  button: {
    background: "white",
    borderRadius: "18px",
    textTransform: "none",
    padding: "3px 8px",
    color: "#000",
    fontWeight: "bold",
    transition: "transform .2s",
    "&:hover": {
      background: "#e6e6e6ef",
      transform: "scale(1.01) ",
    },
  },
}));

const CardActivity = () => {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={6} lg={3} xl={3}>
      <CardCategory>
        <BoxContent>
          <img src="./imagen.jpg" alt="img" />
          <Box>
            <Typography variant="h6"> Activity 1</Typography>
            <Typography variant="caption"> 15/20</Typography>
            <ProgresBar value={75} />
          </Box>
        </BoxContent>
        <BoxAction
          sx={{
            background: theme.palette.background.primary,
            color: "text.primary",
          }}
        >
          <Typography variant="body1"> 30/50 Pts</Typography>
          <Button> Continuar</Button>
        </BoxAction>
      </CardCategory>
    </Grid>
  );
};

export default CardActivity;
