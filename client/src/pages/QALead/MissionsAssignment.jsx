import React, { useEffect, useReducer, useState } from "react";
import { Grid, Typography, styled, Button } from "@mui/material";
import { Box } from "@mui/system";
import {
  ButtonAction,
  MainPage,
  ScrollContainer,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import SearchAssign from "../../components/QALead/searchMissionAssign/SearchAssign";
import SearchMission from "../../components/QALead/searchMissionAssign/SearchMission";
import ShowUserActivity from "../../components/teamLeader/ShowUserActivity";
import MissionAssignmentCard from "../../components/Quizes/MissionAssignmentCard";
import LoadingComponent from "../../components/LoadingComponent";
import ShowLobAssign from "../../components/Quizes/ShowLobAssign";
import ShowTeamAssign from "../../components/Quizes/ShowTeamAssign";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import { ModalLoading } from "../../components/ModalLoading";
import {
  missionsAssignmentInitialState,
  missionsAssignmentReducer,
  TYPES,
} from "../../reducers/missionsAssignmentReducer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { dataToSend } from "../../helpers/helperMissionAssignment";
import { requestWithData } from "../../utils/api";
const MySwal = withReactContent(Swal);

const BoxActivity = styled(Grid)(() => ({
  background: "#f2f2f2",
  padding: "1rem",
  borderRadius: "20px",
}));

const active = {
  boxShadow: "1px 1px 5px #A2A2A2",
  transform: "scale(1.01)",
};

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

const MissionsAssignment = () => {
  const navigate = useNavigate();
  const rxDispatch = useDispatch();
  const userData = useSelector((store) => store.loginUser.userData);
  const userName = userData.Nombre;
  const [select, setSelect] = useState("agents");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loadingMission, setLoadingMission] = useState(false);
  const [loadingAssigns, setLoadingAssigns] = useState(false);
  const [noDataMissions, setNoDataMissions] = useState(false);
  const [noDataAssigns, setNoDataAssigns] = useState(false);
  const [loadingfull, setLoadingfull] = useState(false);
  const [state, dispatch] = useReducer(
    missionsAssignmentReducer,
    missionsAssignmentInitialState
  );
  const {
    missions,
    dbMissions,
    users,
    dbUsers,
    lobs,
    dbLobs,
    teams,
    dbTeams,
    searchM,
    searchA,
  } = state;

  const getData = async () => {
    setLoadingAssigns(true);
    setLoadingMission(true);
    const allMissions = await requestWithData("getmissionsassignmentinfo", {
      context: 1,
      caso: 1,
    });
    if (
      allMissions &&
      allMissions.status === 200 &&
      allMissions.data.length > 0
    ) {
      const allAgents = await requestWithData("getmissionsassignmentinfo", {
        context: 2,
        caso: 1,
      });
      if (allAgents && allAgents.status === 200 && allAgents.data.length > 0) {
        if (
          allAgents.data[0].Agents[0].Ident !== "0" &&
          allAgents.data[0].Agents[0].Agent !== "0"
        ) {
          dispatch({
            type: TYPES.GET_DATA_AGENTS,
            payload: {
              agents: allAgents.data[0].Agents,
            },
          });
          setLoadingAssigns(false);
          setLoadingMission(false);
        } else {
          setLoadingAssigns(false);
          setLoadingMission(false);
          setNoDataAssigns(true);
        }
      } else if (allAgents && allAgents.data === "UnauthorizedError") {
        rxDispatch(logoutAction());
        navigate("/");
      } else {
        setLoadingAssigns(false);
        setLoadingMission(false);
        setError(true);
      }
      if (
        allMissions.data[0].Missions[0].Id !== "0" &&
        allMissions.data[0].Missions[0].Topic !== "0"
      ) {
        dispatch({
          type: TYPES.GET_DATA_MISSIONS,
          payload: {
            missions: allMissions.data[0].Missions,
          },
        });
      } else {
        setLoadingAssigns(false);
        setLoadingMission(false);
        setNoDataMissions(true);
      }
    } else if (allMissions && allMissions.data === "UnauthorizedError") {
      rxDispatch(logoutAction());
      navigate("/");
    } else {
      setLoadingAssigns(false);
      setLoadingMission(false);
      setError(true);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const handleSelectAgents = async () => {
    setSelect("agents");
    setNoDataAssigns(false);
    setLoadingAssigns(true);
    const allAgents = await requestWithData("getmissionsassignmentinfo", {
      context: 2,
      caso: 1,
    });
    if (allAgents && allAgents.status === 200 && allAgents.data.length > 0) {
      if (
        allAgents.data[0].Agents[0].Ident !== "0" &&
        allAgents.data[0].Agents[0].Agent !== "0"
      ) {
        dispatch({
          type: TYPES.GET_DATA_AGENTS,
          payload: {
            agents: allAgents.data[0].Agents,
          },
        });
        setLoadingAssigns(false);
        setLoadingMission(false);
      } else {
        setLoadingAssigns(false);
        setLoadingMission(false);
        setNoDataAssigns(true);
      }
    } else if (allAgents && allAgents.data === "UnauthorizedError") {
      rxDispatch(logoutAction());
      navigate("/");
    } else {
      setLoadingAssigns(false);
      setLoadingMission(false);
      setError(true);
    }
  };

  const handleSelectLobs = async () => {
    setSelect("lobs");
    setNoDataAssigns(false);
    setLoadingAssigns(true);
    const allLobs = await requestWithData("getmissionsassignmentinfo", {
      context: 2,
      caso: 3,
    });
    if (allLobs && allLobs.status === 200 && allLobs.data.length > 0) {
      if (
        allLobs.data[0].Lobs[0].idLob !== "0" &&
        allLobs.data[0].Lobs[0].NameLob !== "0"
      ) {
        dispatch({
          type: TYPES.GET_DATA_LOBS,
          payload: {
            lobs: allLobs.data[0].Lobs,
          },
        });
        setLoadingAssigns(false);
        setLoadingMission(false);
      } else {
        setLoadingAssigns(false);
        setLoadingMission(false);
        setNoDataAssigns(true);
      }
    } else if (allLobs && allLobs.data === "UnauthorizedError") {
      rxDispatch(logoutAction());
      navigate("/");
    } else {
      setLoadingAssigns(false);
      setLoadingMission(false);
      //setError(true);
    }
  };
  const handleSelectTeams = async () => {
    setSelect("teams");
    setNoDataAssigns(false);
    setLoadingAssigns(true);
    const allTeams = await requestWithData("getmissionsassignmentinfo", {
      context: 2,
      caso: 2,
    });
    if (allTeams && allTeams.status === 200 && allTeams.data.length > 0) {
      if (
        allTeams.data[0].Teams[0].Id !== "0" &&
        allTeams.data[0].Teams[0].Team !== "0"
      ) {
        dispatch({
          type: TYPES.GET_DATA_TEAMS,
          payload: {
            teams: allTeams.data[0].Teams,
          },
        });
        setLoadingAssigns(false);
        setLoadingMission(false);
      } else {
        setLoadingAssigns(false);
        setLoadingMission(false);
        setNoDataAssigns(true);
      }
    } else if (allTeams && allTeams.data === "UnauthorizedError") {
      rxDispatch(logoutAction());
      navigate("/");
    } else {
      setLoadingAssigns(false);
      setLoadingMission(false);
      setError(true);
    }
  };

  //funcion de asingacion de usuarios
  const handleUser = (e) => {
    const { name, checked } = e.target;
    dispatch({ type: TYPES.SELECT_AGENTS, payload: { name, checked } });
  };

  ////////////////////////////// funcion de asingacion de Misiones
  const handleMissions = (e) => {
    const { name, checked } = e.target;
    dispatch({ type: TYPES.SELECT_MISSIONS, payload: { name, checked } });
  };

  //////////////////////////////funcion que  asigna el Tiempo de duraCION
  const handleTime = (time, value, name, fecha) => {
    dispatch({
      type: TYPES.SELECT_TIME,
      payload: { time, value, name, fecha },
    });
  };

  ////////////////////////////// funcion de asingacion de Lobs
  const handleLob = (e) => {
    const { name, checked } = e.target;
    dispatch({ type: TYPES.SELECT_LOBS, payload: { name, checked } });
  };

  ////////////////////////////// funcion de asingacion de Teams
  const handleTeam = (e) => {
    const { name, checked } = e.target;
    dispatch({ type: TYPES.SELECT_TEAMS, payload: { name, checked } });
  };

  ////////
  const handleSearchMissions = (e) => {
    let word = e.target.value;
    dispatch({
      type: TYPES.SEARCH_MISSION,
      payload: word,
    });
  };
  const handleSearchAssigns = (e) => {
    let word = e.target.value;
    dispatch({
      type: TYPES.SEARCH_ASSIGN,
      payload: { word, select },
    });
  };

  ///// funcion de envio de asignación
  const submit = async (data) => {
    const cqa = await requestWithData("postassignmission", data);
    if (cqa && cqa.status === 200) {
      MySwal.fire({
        title: <p>{"Mission Assigned!"}</p>,
        icon: "success",
        confirmButtonText: "Accept",
        allowOutsideClick: false,
      }).then((resultado) => {
        if (resultado.value) {
          //window.location.reload();
          getData();
          setDisabled(false);
          setLoadingfull(false);
        }
      });
    } else {
      MySwal.fire({
        title: <p>Send Error!</p>,
        icon: "error",
        confirmButtonText: "Accept",
        allowOutsideClick: false,
      }).then((resultado) => {
        if (resultado.value) {
          //window.location.reload();
          getData();
          setDisabled(false);
          setLoadingfull(false);
        }
      });
    }
  };

  /////////////////////////funcion de envio de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataMissions = missions.filter(
      (miss) => miss.isChecked && miss.start && miss.end
    );
    if (select === "agents") {
      const dataAgents = users.filter((us) => us.isChecked);
      if (dataMissions.length > 0) {
        if (dataAgents.length > 0) {
          setDisabled(true);
          setLoadingfull(true);
          const dts = await dataToSend(dataMissions, dataAgents, userName, 1);
          await submit(dts); //funcion de envio
        } else {
          MySwal.fire({
            title: <p>{"Check your Agents selection"}</p>,
            icon: "info",
            confirmButtonText: "Accept",
            allowOutsideClick: false,
          });
        }
      } else {
        MySwal.fire({
          title: (
            <p>{"Check your mission selection or mission time selection."}</p>
          ),
          icon: "info",
          confirmButtonText: "Accept",
          allowOutsideClick: false,
        });
      }
    } else if (select === "lobs") {
      const dataLobs = lobs.filter((lob) => lob.isChecked);
      if (dataMissions.length > 0) {
        if (dataLobs.length > 0) {
          setDisabled(true);
          setLoadingfull(true);
          const dts = await dataToSend(dataMissions, dataLobs, userName, 3);
          await submit(dts);
          //funcion de envio
        } else {
          MySwal.fire({
            title: <p>{"Check your Lobs selection"}</p>,
            icon: "info",
            confirmButtonText: "Accept",
            allowOutsideClick: false,
          });
        }
      } else {
        MySwal.fire({
          title: (
            <p>{"Check your mission selection or mission time selection."}</p>
          ),
          icon: "info",
          confirmButtonText: "Accept",
          allowOutsideClick: false,
        });
      }
    } else {
      const dataTeams = teams.filter((tm) => tm.isChecked);
      if (dataMissions.length > 0) {
        if (dataTeams.length > 0) {
          setDisabled(true);
          setLoadingfull(true);
          const dts = await dataToSend(dataMissions, dataTeams, userName, 2);
          await submit(dts); //funcion de envio
        } else {
          MySwal.fire({
            title: <p>{"Check your Teams selection"}</p>,
            icon: "info",
            confirmButtonText: "Accept",
            allowOutsideClick: false,
          });
        }
      } else {
        MySwal.fire({
          title: (
            <p>{"Check your mission selection or mission time selection."}</p>
          ),
          icon: "info",
          confirmButtonText: "Accept",
          allowOutsideClick: false,
        });
      }
    }
  };

  return (
    <MainPage>
      {loadingfull && <ModalLoading />}
      <Header />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          {" "}
          <Typography variant="h5">Mission Assignment</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box margin="2rem 0">
            <ButtonAction
              onClick={handleSelectAgents}
              sx={select === "agents" && active}
            >
              Agents
            </ButtonAction>
            <ButtonAction
              onClick={handleSelectLobs}
              sx={select === "lobs" && active}
            >
              LOB's
            </ButtonAction>
            <ButtonAction
              onClick={handleSelectTeams}
              sx={select === "teams" && active}
            >
              Teams
            </ButtonAction>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box padding={1}>
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
                      dbMissions.filter(
                        (mission) => mission?.isChecked !== true
                      ).length < 1
                    }
                  />
                  Select all
                </ButtonAction>
                <SearchMission
                  search={searchM}
                  handleSearchMissions={handleSearchMissions}
                />
              </Box>

              <ScrollContainer sx={{ height: "50vh" }}>
                {error ? (
                  <Typography variant="body1">Server Problems</Typography>
                ) : noDataMissions ? (
                  <Typography variant="body1">Create a new mission</Typography>
                ) : loadingMission ? (
                  <LoadingComponent />
                ) : (
                  missions?.map((mission, index) => (
                    <MissionAssignmentCard
                      key={index + 7}
                      mission={mission}
                      handleMissions={handleMissions}
                      handleTime={handleTime}
                    />
                  ))
                )}
              </ScrollContainer>
            </BoxActivity>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box padding={1}>
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
                    onChange={
                      select === "agents"
                        ? handleUser
                        : select === "lobs"
                        ? handleLob
                        : handleTeam
                    }
                    checked={
                      select === "agents"
                        ? dbUsers.filter((user) => user?.isChecked !== true)
                            .length < 1
                        : select === "lobs"
                        ? dbLobs.filter((lob) => lob?.isChecked !== true)
                            .length < 1
                        : dbTeams.filter((team) => team?.isChecked !== true)
                            .length < 1
                    }
                  />
                  Select all
                </ButtonAction>
                <SearchAssign
                  search={searchA}
                  handleSearchAssigns={handleSearchAssigns}
                />
              </Box>
              <ScrollContainer sx={{ height: "50vh" }}>
                {error ? (
                  <Typography variant="body1">Server Problems</Typography>
                ) : noDataAssigns ? (
                  <Typography variant="body1">Agents are not loaded</Typography>
                ) : loadingAssigns ? (
                  <LoadingComponent />
                ) : select === "agents" ? (
                  users.map((user, index) => (
                    <ShowUserActivity
                      key={index}
                      user={user}
                      handleUser={handleUser}
                    />
                  ))
                ) : select === "lobs" ? (
                  lobs.map((lob, index) => (
                    <ShowLobAssign
                      key={index}
                      lob={lob}
                      handleLob={handleLob}
                    />
                  ))
                ) : select === "teams" ? (
                  teams.map((team, index) => (
                    <ShowTeamAssign
                      key={index}
                      team={team}
                      handleTeam={handleTeam}
                    />
                  ))
                ) : (
                  <Typography variant="body1">Server Problems</Typography>
                )}
              </ScrollContainer>
            </BoxActivity>
          </Box>
        </Grid>
      </Grid>
      <BoxAssingment>
        <Button disabled={disabled} onClick={handleSubmit}>
          Assignement
        </Button>
      </BoxAssingment>
      <Footer />
    </MainPage>
  );
};

export default MissionsAssignment;
