import React, { useState } from "react";
import { Button, Grid, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { ButtonAction, MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import ChallengeAssignment from "../TeamLeader/ChallengeAssignment";
import SearchAppBar from "../../components/Search";
import ShowActivity from "../../components/teamLeader/ShowActivity";

const BoxActivity = styled(Grid)(() => ({
  background: "#f2f2f2",
  padding: "1rem",
  borderRadius: "20px",
}));

const Boxview = styled(Grid)(() => ({
  overflowY: "scroll",
  height: "50vh",
}));

const active = {
  boxShadow: "1px 1px 5px #A2A2A2",
  transform: "scale(1.01)",
};
const MissionsAssignment = () => {
  const [select, setSelect] = useState("agents");
  const [error, setError] = useState(false);

  const [missions, setMission] = useState([]);

  ////////////////////////////// funcion de asingacion de Actividades
  const handleMissions = (e) => {
    // setValidator(true);
    // const { name, checked } = e.target;
    // if (name === "selecct-all") {
    //   if (activity[stage] !== undefined) {
    //     let tempUser = activity[stage].map((badge) => {
    //       return { ...badge, isChecked: checked };
    //     });
    //     setActivity(tempUser);
    //   } else {
    //     let tempUser = activity.map((badge) => {
    //       return { ...badge, isChecked: checked };
    //     });
    //     setActivity(tempUser);
    //   }
    // } else {
    //   if (activity[stage] !== undefined) {
    //     let tempUser = activity[stage].map((badge, index) =>
    //       badge.Name === name ? { ...badge, isChecked: checked } : badge
    //     );
    //     setActivity(tempUser);
    //   } else {
    //     let tempUser = activity.map((badge, index) =>
    //       badge.Name === name ? { ...badge, isChecked: checked } : badge
    //     );
    //     setActivity(tempUser);
    //   }
    //  }
  };
  console.log(error);

  return (
    <MainPage>
      <Header />
      <Grid container spacing={1}>
        <Grid xs={12} md={6}>
          {" "}
          <Typography variant="h5">Challenge Assignment</Typography>
        </Grid>
        <Grid xs={12} md={6}>
          <Box margin="2rem 0">
            <ButtonAction
              onClick={() => setSelect("agents")}
              sx={select === "agents" && active}
            >
              Agents
            </ButtonAction>
            <ButtonAction
              onClick={() => setSelect("lob")}
              sx={select === "lob" && active}
            >
              LOB's
            </ButtonAction>
            <ButtonAction
              onClick={() => setSelect("teams")}
              sx={select === "teams" && active}
            >
              Teams
            </ButtonAction>
          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <BoxActivity>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Button
              //sx={selectButton}
              >
                <input
                  type="checkbox"
                  name="selecct-all"
                  onChange={handleMissions}
                  checked={
                    missions.filter((mission) => mission?.isChecked !== true)
                      .length < 1
                  }
                />
                Select all
              </Button>
              <SearchAppBar />
            </Box>
            <Boxview>
              {!error ? (
                missions?.map((act, index) => (
                  <ShowActivity
                    key={index}
                    data={act}
                    handleMissions={handleMissions}
                  />
                ))
              ) : (
                <Typography variant="h5" fontWeight={500}>
                  The Game Starts Soon
                </Typography>
              )}
            </Boxview>
          </BoxActivity>
        </Grid>
        <Grid xs={12} md={6}></Grid>
      </Grid>
      {/* <ChallengeAssignment /> */}

      <Footer />
    </MainPage>
  );
};

export default MissionsAssignment;
