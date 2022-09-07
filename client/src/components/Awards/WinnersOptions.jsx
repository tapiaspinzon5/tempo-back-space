import React from "react";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import general from "../../assets/images/awards/general.png";
import sub from "../../assets/images/awards/sub.png";
import mini from "../../assets/images/awards/mini.png";

const ButtonCard = styled(Button)(() => ({
  width: "65%",
  img: {
    width: "100%",
    "&:hover": {
      boxShadow: "5px 5px 10px #3047B0",
      borderRadius: "10px",
      transform: "scale(1.01)",
    },
  },
}));

const WinnersOptions = ({ setSection }) => {
  return (
    <Grid>
      <Box marginY={5}>
        <Typography
          variant="h3"
          fontWeight={700}
          color="#fff"
          textAlign="center"
        >
          Winners of the month
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={4} textAlign="right">
          <ButtonCard onClick={() => setSection("general")}>
            {" "}
            <img src={general} all="" />{" "}
          </ButtonCard>
        </Grid>
        <Grid item xs={12} md={4} textAlign="center">
          <ButtonCard onClick={() => setSection("sub")}>
            <img src={sub} all="" />{" "}
          </ButtonCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <ButtonCard onClick={() => setSection("mini")}>
            {" "}
            <img src={mini} all="" />{" "}
          </ButtonCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WinnersOptions;
