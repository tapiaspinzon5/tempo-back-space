import React, { useState, useEffect } from "react";
import { Grid, Typography, styled, Box } from "@mui/material";
import {
  ButtonAction,
  ButtonActionBlue,
  InputText,
  MainPage,
} from "../../assets/styled/muistyled";
import { FiEdit3 } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import ShowUser from "../../components/teamLeader/ShowUser";
import ChallengeCard from "../../components/teamLeader/ChallengeCard";
import { changeTeamName, getTeamAgents } from "../../utils/api";
import avatar from "../../assets/temp-image/avatar.png";

const MySwal = withReactContent(Swal);

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  background: "#f9f9f9",
  height: "50vh",
  borderRadius: "20px",
  overflowY: "scroll",
  p: {
    color: "#3047B0",
    fontWeight: 700,
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));

const BoxChangeTeamName = styled(Box)(() => ({
  position: "absolute",
  zIndex: 1000,
  border: "1px solid #3047b0",
  padding: "1rem",
  borderRadius: "10px",
  width: "250px",
  display: "flex",
  flexDirection: "column",
  marginTop: "1rem",
  backgroundColor: "#fff",
  button: {
    marginTop: "1rem",
    width: "50%",
    marginLeft: "auto",
  },
}));

const TeamInformation = () => {
  const [nameCard, setNameCard] = useState(false);
  const [newName, setNewName] = useState("");
  const [active, setActive] = useState(0);
  const [userData, setUserData] = useState([]);
  const [challengeData, setChallengeData] = useState([]);

  useEffect(() => {
    const getAgents = async () => {
      const getData = await getTeamAgents(1, 0);
      console.log(getData.data);
      setUserData(getData.data[0].Agents);
      setNewName(getData.data[0].Agents[0].Team);
    };
    getAgents();
  }, []);

  useEffect(() => {
    handleUser(userData[0]?.Ident);
  }, [userData]);

  const handleUser = async (idccms) => {
    setActive(idccms);
    const getData = await getTeamAgents(2, idccms);
    console.log(getData.data);
    setChallengeData(getData.data[0].ChallengesAgents);
  };
  const handleChangeTeamName = async () => {
    console.log("cambiando nombre por:", newName);
    const change = await changeTeamName(userData[0]?.IdEquipo, newName);
    console.log(change);
    setNameCard(false);

    if (change.status === 200) {
      MySwal.fire({
        title: <p>Your Team Name has been changed</p>,
        icon: "success",
      });
    } else {
      MySwal.fire({
        title: <p></p>,
        icon: "error",
      });
    }
  };
  return (
    <MainPage>
      <Grid>
        <Header />
        <Grid container>
          <Grid item xs={12} md={3}>
            <Typography variant="h5">Team Information</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <ButtonAction
                sx={{ width: "12rem" }}
                endIcon={<FiEdit3 />}
                onClick={() => setNameCard(!nameCard)}
              >
                Team Name
              </ButtonAction>
              {nameCard && (
                <BoxChangeTeamName>
                  <InputText
                    name="TeamName"
                    variant="outlined"
                    label="New Team Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    //                    error={!quizName && empty}
                    //                    helperText={!quizName && empty ? "Field Requiered" : ""}
                  />
                  <ButtonActionBlue
                    onClick={handleChangeTeamName}
                    disabled={!newName}
                  >
                    save
                  </ButtonActionBlue>
                </BoxChangeTeamName>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Item>
            {userData.map((user, index) => (
              <ShowUser
                user={user}
                key={index}
                handleUser={handleUser}
                active={active}
              />
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            {challengeData.map((challenge) => (
              <ChallengeCard challenge={challenge} />
            ))}
          </Item>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default TeamInformation;
