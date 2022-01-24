import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, styled, Typography, Button, Box } from "@mui/material";
import Header from "../../components/homeUser/Header";
import ShowActivity from "../../components/teamLeader/ShowActivity";
import ShowUserActivity from "../../components/teamLeader/ShowUserActivity";
import Footer from "../../components/Footer";
import SearchAppBar from "../../components/Search";
import { downloadActivities, downloadUsers } from "../../utils/api";

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

const BoxActivity = styled(Grid)(() => ({
  background: "#f2f2f2",
  padding: "1rem",
  borderRadius: "20px",
}));

const Boxview = styled(Grid)(() => ({
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
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.idccms;
  const [activity, setActivity] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [stage, setStage] = useState("Getting started");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const activities = await downloadActivities();
      setActivity(activities.data);
      setAssignment(activities.data);
      const user = await downloadUsers(idccms);
      setUsers(user.data);
    };

    getData();

    //asignacion de usuarios
    //setUsers(userData);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activity[stage] === undefined && activity.length > 0) {
      console.log("asginando ");
      setActivity(assignment[stage]);
    }
    // eslint-disable-next-line
  }, [stage]);

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
  const handleBadge = (e) => {
    const { name, checked } = e.target;

    console.log(name, checked);
    if (name === "selecct-all") {
      if (activity[stage] !== undefined) {
        let tempUser = activity[stage].map((badge) => {
          return { ...badge, isChecked: checked };
        });

        console.log(tempUser);
        setActivity(tempUser);
      } else {
        let tempUser = activity.map((badge) => {
          return { ...badge, isChecked: checked };
        });
        console.log(tempUser);
        setActivity(tempUser);
      }
    } else {
      if (activity[stage] !== undefined) {
        let tempUser = activity[stage].map((badge, index) =>
          badge.Name === name ? { ...badge, isChecked: checked } : badge
        );
        setActivity(tempUser);
      } else {
        let tempUser = activity.map((badge, index) =>
          badge.Name === name ? { ...badge, isChecked: checked } : badge
        );
        setActivity(tempUser);
      }
    }
  };

  console.log(users);

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
            sx={stage === "Getting started" && selectButton}
            onClick={() => setStage("Getting started")}
          >
            Getting Started{" "}
          </Button>
          <Button
            sx={stage === "Battle" && selectButton}
            onClick={() => setStage("Battle")}
          >
            {" "}
            Battle{" "}
          </Button>
          <Button
            sx={stage === "Being Awarded" && selectButton}
            onClick={() => setStage("Being Awarded")}
          >
            {" "}
            Being Awarded
          </Button>
          <Button
            sx={stage === "Developing skills" && selectButton}
            onClick={() => setStage("Developing skills")}
          >
            {" "}
            Developing Skills
          </Button>
          <Button
            sx={stage === "Getting stronger" && selectButton}
            onClick={() => setStage("Getting stronger")}
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
                <input
                  type="checkbox"
                  name="selecct-all"
                  onChange={handleBadge}
                  checked={
                    activity[stage] !== undefined
                      ? activity[stage].filter(
                          (actividad) => actividad?.isChecked !== true
                        ).length < 1
                      : activity.filter(
                          (actividad) => actividad?.isChecked !== true
                        ).length < 1
                  }
                />
                Select all
              </Button>
              <SearchAppBar />
            </Box>
            <Boxview>
              {activity[stage] !== undefined
                ? activity[stage]?.map((act, index) => (
                    <ShowActivity
                      key={index}
                      data={act}
                      handleBadge={handleBadge}
                    />
                  ))
                : activity?.map((act, index) => (
                    <ShowActivity
                      key={index}
                      data={act}
                      handleBadge={handleBadge}
                    />
                  ))}
            </Boxview>
          </BoxActivity>
        </Grid>
        <Grid item xs={12} md={5} padding={1}>
          <BoxActivity>
            <Box marginBottom={2}>
              <Button sx={selectButton}>
                <input
                  type="checkbox"
                  name="selecct-all"
                  onChange={handleUser}
                  checked={
                    users.filter((user) => user?.isChecked !== true).length < 1
                  }
                />
                Select all
              </Button>
            </Box>
            <Boxview>
              {users.map((user, index) => (
                <ShowUserActivity
                  key={index}
                  user={user}
                  handleUser={handleUser}
                />
              ))}
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
