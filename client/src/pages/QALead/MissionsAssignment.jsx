import React, { useState } from "react";
import { Grid, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { ButtonAction, MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import SearchAppBar from "../../components/Search";
import ShowUserActivity from "../../components/teamLeader/ShowUserActivity";
import MissionAssignmentCard from "../../components/Quizes/MissionAssignmentCard";
//import ShowActivity from "../../components/teamLeader/ShowActivity";
//import ChallengeAssignment from "../TeamLeader/ChallengeAssignment";

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

const dataMissions = [
  { mission: 1 },
  { mission: 2 },
  { mission: 3 },
  { mission: 4 },
  { mission: 5 },
  { mission: 6 },
  { mission: 7 },
];
const dataUsers = [
  { user: 1, Agent: "alguno1", Experiences: 231 },
  { user: 2, Agent: "alguno2", Experiences: 231 },
  { user: 3, Agent: "alguno3", Experiences: 231 },
  { user: 4, Agent: "alguno4", Experiences: 231 },
  { user: 5, Agent: "alguno5", Experiences: 231 },
  { user: 6, Agent: "alguno6", Experiences: 231 },
  { user: 7, Agent: "alguno7", Experiences: 231 },
  { user: 8, Agent: "alguno8", Experiences: 231 },
];
const MissionsAssignment = () => {
  const [select, setSelect] = useState("agents");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [missions, setMission] = useState(dataMissions);
  const [users, setUsers] = useState(dataUsers);

  //funcion de asingacion de usuarios
  const handleUser = (e) => {
    const { name, checked } = e.target;
    if (name === "selecct-all") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });

      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.Agent === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  ////////////////////////////// funcion de asingacion de Actividades
  const handleMissions = (e) => {
    const { name, checked } = e.target;
  };

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
              <ButtonAction>
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
              </ButtonAction>
              <SearchAppBar />
            </Box>
            <Boxview>
              {!error ? (
                missions?.map((mission, index) => (
                  <MissionAssignmentCard
                    key={index}
                    mission={mission}
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
        <Grid xs={12} md={6}>
          <BoxActivity>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <ButtonAction
              //sx={selectButton}
              >
                <input
                  type="checkbox"
                  name="selecct-all"
                  onChange={handleUser}
                  checked={
                    users.filter((user) => user?.isChecked !== true).length < 1
                  }
                />
                Select all
              </ButtonAction>
              <SearchAppBar />
            </Box>
            <Boxview>
              {!error ? (
                users.map((user, index) => (
                  <ShowUserActivity
                    key={index}
                    user={user}
                    handleUser={handleUser}
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
      </Grid>

      <Footer />
    </MainPage>
  );
};

export default MissionsAssignment;
