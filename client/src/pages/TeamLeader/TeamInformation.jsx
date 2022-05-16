import React, { useState, useEffect } from "react";
import { Grid, Typography, styled, Box } from "@mui/material";
import {
  ButtonAction,
  ButtonActionBlue,
  InputText,
  MainPage,
} from "../../assets/styled/muistyled";
import { FiEdit3 } from "react-icons/fi";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import ShowUser from "../../components/teamLeader/ShowUser";
import avatar from "../../assets/temp-image/avatar.png";
import ChallengeCard from "../../components/teamLeader/ChallengeCard";
import { getTeamAgents } from "../../utils/api";

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

const userData = [
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 4712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 1712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 2712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 3712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 5712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 6712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 7712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 8712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 9712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 712377,
  },
  {
    Agent: "Deiby Niño",
    Level: 2,
    Experiences: 123,
    avatar: avatar,
    idccms: 2377,
  },
];

const TeamInformation = () => {
  const [nameCard, setNameCard] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const getAgents = async () => {
      const getData = await getTeamAgents({ context: 1 });
      console.log(getData.data);
    };

    getAgents();
  }, []);

  const handleUser = (idccms) => {};
  const handleClick = () => {
    console.log("cambiando nombre por:", newName);
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
                  <ButtonActionBlue onClick={handleClick} disabled={!newName}>
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
              <ShowUser user={user} key={index} handleUser={handleUser} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
          </Item>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default TeamInformation;
