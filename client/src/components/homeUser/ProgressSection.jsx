import React from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid, Box, styled } from "@mui/material";
import CardActivity from "./CardActivity";

const TitleProgress = styled(Box)((theme) => ({
  padding: "1rem ",
  display: "flex",
  justifyContent: "space-between",
  button: {
    fontWeight: "bold",
    textTransform: "none",
  },
}));

const ProgressSection = () => {
  return (
    <>
      <TitleProgress>
        <Typography variant="h6" color="#0087FF" mt={1}>
          Continua tu progreso
        </Typography>
        <Button> Ver más </Button>
      </TitleProgress>
      <Grid container spacing={3} sx={{ height: "240px", overflow: "hidden" }}>
        <CardActivity />
        <CardActivity />
        <CardActivity />
        <CardActivity />
      </Grid>
    </>
  );
};

export default ProgressSection;
