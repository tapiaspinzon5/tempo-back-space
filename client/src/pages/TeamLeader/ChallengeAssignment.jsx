import React, { useState } from "react";
import { Grid, styled, Typography, Button, Box, Input } from "@mui/material";

import Header from "../../components/homeUser/Header";
import ShowActivity from "../../components/teamLeader/ShowActivity";
import ShowUserActivity from "../../components/teamLeader/ShowUserActivity";
import Footer from "../../components/Footer";
import SearchAppBar from "../../components/Search";

const MainCA = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  color: "#3047b0",

  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const BoxSelectBadge = styled(Grid)(() => ({
  button: {
    textTransform: "none",
    background: "#fff",
    margin: "5px",
    width: "9rem",
    fontWeight: "600",
    border: "1px solid #00000009",
  },

  margin: "2rem 0",
}));

const Search = styled(Input)(() => ({
  border: "1px solid #3047b0",
  borderRadius: "10px",
  background: "white",
}));

const BoxActivity = styled(Grid)(() => ({
  background: "#f2f2f2",
  padding: "1rem",
  borderRadius: "20px",
}));

const Boxview = styled(Box)(() => ({
  overflowY: "scroll",
  height: "50vh",
}));

const BoxAssingment = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  margin: "2rem 0 ",
  button: {
    padding: ".5rem",
    background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
    color: "#fff",
    width: "10rem",
    textTransform: "none",
    fontWeight: "600",
    marginRight: "2rem",
  },
}));
const selectButton = {
  boxShadow: "0px 3px 6px #00000029",
  borderRadius: "10px",
  textTransform: "none",
};

const ChallengeAssignment = () => {
  const [activity, setActivity] = useState("");
  return (
    <MainCA>
      <Header />
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={500}>
            Challenge Assignment
          </Typography>
        </Grid>

        <BoxSelectBadge item xs={12}>
          <Button
            sx={activity === "Getting Started" && selectButton}
            onClick={() => setActivity("Getting Started")}
          >
            Getting Started{" "}
          </Button>
          <Button
            sx={activity === "Battle" && selectButton}
            onClick={() => setActivity("Battle")}
          >
            {" "}
            Battle{" "}
          </Button>
          <Button
            sx={activity === "Being Awarded" && selectButton}
            onClick={() => setActivity("Being Awarded")}
          >
            {" "}
            Being Awarded
          </Button>
          <Button
            sx={activity === "Developing Skills" && selectButton}
            onClick={() => setActivity("Developing Skills")}
          >
            {" "}
            Developing Skills
          </Button>
          <Button
            sx={activity === "Getting Stronger" && selectButton}
            onClick={() => setActivity("Getting Stronger")}
          >
            {" "}
            Getting Stronger
          </Button>
        </BoxSelectBadge>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} padding={1}>
          <BoxActivity>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Button sx={selectButton}>
                <input type="checkbox" />
                Select all
              </Button>
              <SearchAppBar />
            </Box>
            <Boxview>
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
              <ShowActivity />
            </Boxview>
          </BoxActivity>
        </Grid>
        <Grid item xs={12} md={5} padding={1}>
          <BoxActivity>
            <Box marginBottom={2}>
              <Button sx={selectButton}>
                <input type="checkbox" />
                Select all
              </Button>
            </Box>
            <Boxview>
              <ShowUserActivity />
              <ShowUserActivity />
              <ShowUserActivity />
              <ShowUserActivity />
              <ShowUserActivity />
            </Boxview>
          </BoxActivity>
        </Grid>
      </Grid>
      <BoxAssingment>
        <Button>Assignement</Button>
      </BoxAssingment>
      <Footer />
    </MainCA>
  );
};

export default ChallengeAssignment;
