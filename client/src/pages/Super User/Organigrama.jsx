import React, { useEffect, useReducer, useState } from "react";
import { InputText, MainPage, BoxContain } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { Grid, Typography, Box, styled, Avatar, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import {
  TYPES,
  organigramaInitialState,
  organigramaReducer,
} from "../../reducers/organigramaReducer";
import {
  MdOutlineFontDownload,
  MdArrowForward,
  MdArrowForwardIos,
} from "react-icons/md";
import { RiMarkdownLine } from "react-icons/ri";

import bgNoData from "../../assets/images/bg2.png";
import { requestWithData } from "../../utils/api";

const BoxNoData = styled(Box)(() => ({
  height: "67vh",
  width: "100%",
  backgroundImage: `url(${bgNoData})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  borderRadius: "10px 10px 0 0",
  boxShadow: "0px 0px 15px #3047B0",
  opacity: "0.3",
}));

const BoxSection = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  marginRight: "0.31rem",
  padding: ".31rem",
  minWidth: "25vw",
}));

const BoxCard = styled(Box)(() => ({
  height: "4rem",
  width: "24vw",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: ".5rem",
  marginRight: ".5rem",
  paddingLeft: ".5rem",
  borderRadius: "10px",
  padding: "0 1rem",
  p: {
    color: "#3047B0",
  },
}));

const GridScroll = styled(Grid)(() => ({
  overflowX: "scroll",
  display: "flex",
  padding: "2rem 0",
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
const ButtonCard = styled(Button)(() => ({
  height: "4rem",
  width: "25vw",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  marginTop: ".5rem",
  marginRight: ".5rem",
  paddingLeft: ".5rem",
  borderRadius: "10px",
  textTransform: "none",
  p: {
    color: "#3047B0",
  },
}));

const Organigrama = () => {
  const navigate = useNavigate();
  const rxDispatch = useDispatch();
  const [state, dispatch] = useReducer(
    organigramaReducer,
    organigramaInitialState
  );
  const [error, setError] = useState(false);
  const [errorDB, setErrorDB] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [noDataAdmins, setNoDataAdmins] = useState(false);
  const [noDataKPIs, setNoDataKPIs] = useState(false);
  const [noDataLobs, setNoDataLobs] = useState(false);
  const [noDataTeams, setNoDataTeams] = useState(false);
  const [noDataAgents, setNoDataAgents] = useState(false);
  const [showAgents, setsShowAgents] = useState(false);
  const [kpisLoading, setKpisLoading] = useState(false);
  const [lobsLoading, setLobsLoading] = useState(false);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const { campaign, dataCampaign, QA, OM, RL, agents, lobs, teams, kpis } =
    state;

  const defaultProps = {
    options: dataCampaign,
    getOptionLabel: (option) => option.label,
  };
  const getData = async () => {
    setError(false);
    const allCampaigns = await requestWithData("getorganizationalunit", {
      context: 1,
      idcampaign: 0,
      idLob: 0,
      idTeam: 0,
    });
    if (
      allCampaigns.data[0].Campaign &&
      allCampaigns.status === 200 &&
      allCampaigns.data[0].Campaign.length > 0
    ) {
      dispatch({
        type: TYPES.GET_DATA_CAMPAIGN,
        payload: {
          dataCampaign: allCampaigns.data[0].Campaign,
        },
      });
    } else if (allCampaigns && allCampaigns.data === "UnauthorizedError") {
      rxDispatch(logoutAction());
      navigate("/");
    } else {
      setAdminLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const handleInput = async (newValue) => {
    setError(false);
    setNoDataAdmins(false);
    setNoDataKPIs(false);
    setNoDataLobs(false);
    setAdminLoading(true);
    setLobsLoading(true);
    setKpisLoading(true);
    setErrorDB(false);
    setsShowAgents(false);
    dispatch({
      type: TYPES.SELECT_CAMPAIGN,
      payload: {
        campaign: newValue,
      },
    });
    const dataCampaignSel = await requestWithData("getorganizationalunit", {
      context: 2,
      idcampaign: newValue.IdCampaign,
      idLob: 0,
      idTeam: 0,
    });
    if (
      dataCampaignSel.data &&
      dataCampaignSel.status === 200 &&
      dataCampaignSel.data.length > 0
    ) {
      if (!dataCampaignSel.data[0].Result) {
        if (dataCampaignSel.data[0].RoleAdm[0].NameOP === "0") {
          setNoDataAdmins(true);
        } else if (dataCampaignSel.data[1].Lobs[0].NameLob === "0") {
          setNoDataLobs(true);
        } else if (dataCampaignSel.data[3].kpi[0].Kpi === "0") {
          setNoDataKPIs(true);
        }
        dispatch({
          type: TYPES.SHOW_DATA_CAMPAIGN,
          payload: {
            admins: dataCampaignSel.data[0].RoleAdm,
            lobs: dataCampaignSel.data[1].Lobs,
            kpis: dataCampaignSel.data[3].kpi,
          },
        });
        setAdminLoading(false);
        setLobsLoading(false);
        setKpisLoading(false);
      } else {
        setAdminLoading(false);
        setLobsLoading(false);
        setKpisLoading(false);
        setErrorDB(true);
        //error en base de datos
      }
    } else if (
      dataCampaignSel &&
      dataCampaignSel.data === "UnauthorizedError"
    ) {
      rxDispatch(logoutAction());
      navigate("/");
    } else {
      setLobsLoading(false);
      setKpisLoading(false);
      setAdminLoading(false);
      setError(true);
    }
  };

  const handleLob = async (idLob) => {
    setError(false);
    setNoDataTeams(false);
    setTeamsLoading(true);
    setsShowAgents(false);
    setErrorDB(false);
    const dataLobSel = await requestWithData("getorganizationalunit", {
      context: 3,
      idcampaign: 0,
      idLob: idLob,
      idTeam: 0,
    });
    if (
      dataLobSel.data &&
      dataLobSel.status === 200 &&
      dataLobSel.data.length > 0
    ) {
      if (!dataLobSel.data[0].Result) {
        if (dataLobSel.data[0].Teams[0].NameTeam === "0") {
          setTeamsLoading(false);
          setNoDataTeams(true);
        } else {
          dispatch({
            type: TYPES.SHOW_DATA_LOB,
            payload: {
              teams: dataLobSel.data[0].Teams,
            },
          });
          setTeamsLoading(false);
          setNoDataTeams(false);
        }
      } else {
        setTeamsLoading(false);
        setErrorDB(true);
        //error en base de datos
      }
    } else if (dataLobSel && dataLobSel.data === "UnauthorizedError") {
      rxDispatch(logoutAction());
      navigate("/");
    } else {
      setTeamsLoading(false);
      setError(true);
    }
  };

  const handleTeam = async (idTeam) => {
    setError(false);
    setNoDataAgents(false);
    setAgentsLoading(true);
    setsShowAgents(true);
    setErrorDB(false);
    const dataTeamSel = await requestWithData("getorganizationalunit", {
      context: 4,
      idcampaign: 0,
      idLob: 0,
      idTeam,
    });
    if (
      dataTeamSel.data &&
      dataTeamSel.status === 200 &&
      dataTeamSel.data.length > 0
    ) {
      if (!dataTeamSel.data[0].Result) {
        if (dataTeamSel.data[0].Agents[0].Agent === "0") {
          setAgentsLoading(false);
          setNoDataAgents(true);
        } else {
          dispatch({
            type: TYPES.SHOW_DATA_TEAM,
            payload: {
              agents: dataTeamSel.data[0].Agents,
            },
          });
          setAgentsLoading(false);
          setNoDataAgents(false);
        }
      } else {
        setAgentsLoading(false);
        setErrorDB(true);
        //error en base de datos
      }
    } else if (dataTeamSel && dataTeamSel.data === "UnauthorizedError") {
      rxDispatch(logoutAction());
      navigate("/");
    } else {
      setAgentsLoading(false);
      setError(true);
    }
  };
  return (
    <MainPage
      sx={{
        h6: {
          color: "#3047B0",
          textAlign: "center",
          fontWeight: 700,
        },
      }}
    >
      <Grid>
        <Header />
        <Grid container>
          <Grid
            Grid
            item
            xs={12}
            md={6}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" marginRight={4}>
              Organizational Units
            </Typography>

            <Autocomplete
              {...defaultProps}
              disablePortal
              id="combo-box-demo"
              options={dataCampaign}
              getOptionLabel={(option) => option.nameCampaign}
              value={campaign}
              onChange={(e, newValue) => handleInput(newValue)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <InputText
                  {...params}
                  label="Campaign"
                  //onChange={handleInput}
                  //onClick={handleInput}
                />
              )}
            />
          </Grid>
        </Grid>

        {campaign ? (
          <GridScroll>
            <Grid item xs={12} sm={6} lg={3}>
              <Typography variant="h6" color="initial">
                Admin Roles
              </Typography>
              <BoxSection>
                {error ? (
                  <Typography variant="body1">Server Problems</Typography>
                ) : adminLoading ? (
                  <LoadingComponent />
                ) : noDataAdmins ? (
                  <Typography variant="body1">
                    Have not been assigned
                  </Typography>
                ) : errorDB ? (
                  <Typography variant="body1">Database Problems</Typography>
                ) : (
                  <BoxContain
                    sx={{
                      height: "14.4rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <BoxCard>
                      <Avatar>OM</Avatar>
                      <Typography
                        variant="body1"
                        color="initial"
                        marginLeft={3}
                      >
                        {OM[0]?.NameUser}
                      </Typography>
                    </BoxCard>
                    <BoxCard>
                      <Avatar>QA</Avatar>
                      <Typography
                        variant="body1"
                        color="initial"
                        marginLeft={3}
                      >
                        {QA[0]?.NameUser}
                      </Typography>
                    </BoxCard>
                    <BoxCard>
                      <Avatar>RL</Avatar>
                      <Typography
                        variant="body1"
                        color="initial"
                        marginLeft={3}
                      >
                        {RL[0]?.NameUser}
                      </Typography>
                    </BoxCard>
                  </BoxContain>
                )}
              </BoxSection>

              <Typography variant="h6" color="initial">
                KPIS
              </Typography>
              <BoxSection>
                <BoxContain sx={{ height: "15rem" }}>
                  {error ? (
                    <Typography variant="body1">Server Problems</Typography>
                  ) : kpisLoading ? (
                    <LoadingComponent />
                  ) : noDataKPIs ? (
                    <Typography variant="body1">
                      KPIs have not been assigned
                    </Typography>
                  ) : errorDB ? (
                    <Typography variant="body1">Database Problems</Typography>
                  ) : (
                    kpis.map((kpi) => (
                      <BoxCard>
                        <Typography
                          variant="body"
                          sx={{
                            fontSize: "18px",
                            fontWeight: "700",
                            color: "#3047B0",
                          }}
                        >
                          {kpi.Kpi}
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          width="200px"
                        >
                          <Typography variant="body1" marginLeft={3}>
                            {kpi.unitKpi}
                          </Typography>
                          {kpi.LoadType === 1 ? (
                            <MdOutlineFontDownload size={25} color="3047B0" />
                          ) : (
                            <RiMarkdownLine size={25} color="3047B0" />
                          )}
                        </Box>
                      </BoxCard>
                    ))
                  )}
                </BoxContain>
              </BoxSection>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Typography variant="h6" color="initial">
                LOBS
              </Typography>
              <BoxSection>
                <BoxContain>
                  {error ? (
                    <Typography variant="body1">Server Problems</Typography>
                  ) : lobsLoading ? (
                    <LoadingComponent />
                  ) : noDataLobs ? (
                    <Typography variant="body1">
                      Have not been created Lob´s
                    </Typography>
                  ) : errorDB ? (
                    <Typography variant="body1">Database Problems</Typography>
                  ) : (
                    lobs.map((lob) => (
                      <ButtonCard
                        sx={{ justifyContent: "space-between" }}
                        onClick={() => handleLob(lob.idLob)}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          marginLeft={3}
                        >
                          {lob.NameLob}
                        </Typography>
                        <MdArrowForwardIos size={25} color="3047B0" />
                      </ButtonCard>
                    ))
                  )}
                </BoxContain>
              </BoxSection>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Typography variant="h6" color="initial">
                Teams
              </Typography>
              <BoxSection>
                <BoxContain>
                  {error ? (
                    <Typography variant="body1">Server Problems</Typography>
                  ) : teamsLoading ? (
                    <LoadingComponent />
                  ) : noDataTeams ? (
                    <Typography variant="body1">
                      Have not been created Teams
                    </Typography>
                  ) : errorDB ? (
                    <Typography variant="body1">Database Problems</Typography>
                  ) : teams.length > 0 ? (
                    teams.map((team) => (
                      <ButtonCard
                        sx={{ justifyContent: "space-between" }}
                        onClick={() => handleTeam(team.idTeam)}
                      >
                        <Box>
                          <Typography variant="body1" color="initial">
                            {team.NameTeam}
                          </Typography>
                          <Typography variant="caption" color="initial">
                            {team.NameTL}
                          </Typography>
                        </Box>
                        <MdArrowForwardIos size={25} color="3047B0" />
                      </ButtonCard>
                    ))
                  ) : (
                    <Typography variant="body1" color="initial">
                      Select one Lob
                    </Typography>
                  )}
                </BoxContain>
              </BoxSection>
            </Grid>
            {showAgents && (
              <Grid item xs={12} sm={6} lg={3}>
                <Typography variant="h6" color="initial">
                  Agents
                </Typography>
                <BoxSection>
                  <BoxContain>
                    {error ? (
                      <Typography variant="body1">Server Problems</Typography>
                    ) : agentsLoading ? (
                      <LoadingComponent />
                    ) : noDataAgents ? (
                      <Typography variant="body1">
                        No agents have been assigned to this team
                      </Typography>
                    ) : errorDB ? (
                      <Typography variant="body1">Database Problems</Typography>
                    ) : (
                      agents.map((agent) => (
                        <BoxCard>
                          <Avatar alt="Reporting Lead" />
                          <Typography
                            variant="body1"
                            color="initial"
                            marginLeft={3}
                          >
                            {agent.Agent}
                          </Typography>
                        </BoxCard>
                      ))
                    )}
                  </BoxContain>
                </BoxSection>
              </Grid>
            )}
          </GridScroll>
        ) : (
          <BoxNoData />
        )}
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default Organigrama;
