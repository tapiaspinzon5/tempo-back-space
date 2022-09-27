import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";
import ButtonsTopAnalytics from "./ButtonsTopAnalytics";
import NavChartsAnalytics from "./NavChartsAnalytics";
import HeaderCharts from "./HeaderCharts";
import BasicColumnChart from "./BasicColumnChart";
import MultipleCharsPareto from "./MultipleCharsPareto";
import { requestWithData } from "../../utils/api";
import bgData from "../../assets/images/bg1.png";
import {
  helperDataChartCat,
  helperDataChartData,
  helperKpi,
} from "../../helpers/helperDataChart";

const AnalyticsCharts = ({ setShowCharts, showCharts }) => {
  const dataUser = useSelector((store) => store.loginUser.userData);
  const { Role, IdCampaign, IdTeam } = dataUser;
  const [caso, setCaso] = useState(1);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [kpiData, setKpiData] = useState([]);
  const [missionsData, setMissionsData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [LOBs, setLOBs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState([]);
  const [idcampaign, setIdcampaign] = useState(0);
  const [idExam, setIdExam] = useState([]);
  const [idLob, setIdLob] = useState(0);
  const [idTeam, setIdTeam] = useState(0);
  const [selectKpi, setSelectKpi] = useState("");
  const [data, setData] = useState([]);
  const [context, setContext] = useState(0);
  const [categories, setCategories] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [dataHead, setDataHead] = useState([]);
  const [questionsHead, setQuestionsHead] = useState([]);
  const [group, setGroup] = useState("Group");

  useEffect(() => {
    getDataAccounts();
  }, []);

  useEffect(() => {
    if (Role === "Super Admin" || Role !== "Cluster Director") {
      setIdcampaign(0);
      setIdLob(0);
      setIdTeam(0);
      setSelectKpi("");
      setAgent([]);
      setAgents([]);
    }
    setGroup("Group");
  }, [context]);

  useEffect(() => {
    // console.log("cambio de camapaña");
    getDataLOB();
    getDataKPI();
    handleConsulta();
    setSelectKpi("");
    setIdLob(0);
    setIdTeam(0);
    setAgent([]);
    setAgents([]);
    setGroup("Group");
  }, [idcampaign]);

  useEffect(() => {
    if (idLob > 0) {
      getDataTeams();
      if (caso === 1 || caso === 2) {
        getDataKPI();
        handleConsulta();
      }
    }
  }, [idLob]);

  useEffect(() => {
    if (Role === "Team Leader") {
      setCaso(3);
      handleConsulta();
    } else {
      handleConsulta();
      if (idTeam > 0) {
        getDataAgents();
      }
    }
  }, [idTeam]);

  useEffect(() => {
    handleConsulta();
    if (Role === "Team Leader") {
      getDataAgents();
    }
  }, [caso, selectKpi, agent?.Ident, idExam, date1, date2]);

  //Trae la lista de campañas disponibles de suario
  const getDataAccounts = async () => {
    const data = await requestWithData("getorganizationalunit", {
      context: 1,
    });
    setAccounts(data.data[0].Campaign);
  };

  //Trae la lista de LOBs de una campaña
  const getDataLOB = async () => {
    const data = await requestWithData("getorganizationalunit", {
      context: 2,
      idcampaign: idcampaign || IdCampaign,
    });
    setLOBs(data.data[1].Lobs);
  };

  //Trae la lista de Equipos perteneciente a una LOB de una campaña
  const getDataTeams = async () => {
    const data = await requestWithData("getorganizationalunit", {
      context: 3,
      idLob: idLob,
    });
    setTeams(data.data[0].Teams);
  };

  //Trae la lista de Agentes perteneciente a un Equipo
  const getDataAgents = async () => {
    const data = await requestWithData("getorganizationalunit", {
      context: 4,
      idTeam,
    });

    const agentes = data.data[0].Agents;
    const agentesFiltrados = agentes.filter(
      (agent) => agent.RoleAgent === "Agent"
    );

    setAgents(agentesFiltrados);
  };

  //Trae la lista de KPI de una campaña
  const getDataKPI = async () => {
    const data = await requestWithData("getAnalyticsClusterDirector", {
      context: 6,
      idLob: idLob,
      idCampaign: idcampaign || IdCampaign,
      idTeam: 0,
      initDate: date1,
      endDate: date2,
      kpi: "0",
      idccmsUser: 0,
      idExam: 0,
      idQuestion: 0,
      idChallenge: 0,
      caso,
    });
    //console.log("Consultando KPI y misiones ", data);
    setDataHead(data.data);
    const filtrador = helperKpi(data?.data[0]?.ListKpi);

    setKpiData(filtrador);

    setMissionsData(data.data[1]?.Missions || []);
  };

  const handleConsulta = async () => {
    let team = IdTeam;
    const dataChart = await requestWithData("getAnalyticsClusterDirector", {
      context,
      caso,
      idCampaign: idcampaign || IdCampaign,
      idLob,
      idTeam: idTeam || team,
      initDate: date1,
      endDate: date2,
      kpi: selectKpi || "0",
      idccmsUser: agent.Ident || 0,
      idExam: idExam.Id || 0,
      idQuestion: 0,
      idChallenge: 0,
    });
    setQuestionsHead(dataChart.data);

    setData(dataChart.data[0]);
    setCategories(helperDataChartCat(dataChart.data, context));
    setDataChart(helperDataChartData(dataChart.data, context));
    console.log(dataChart.data);
    //const fittedData = helperDataChartData(dataChart.data[0], context);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4} lg={3}>
        <Box padding={1}>
          <ButtonsTopAnalytics Role={Role} setShowCharts={setShowCharts} />
          <NavChartsAnalytics
            Role={Role}
            kpiData={kpiData}
            missionsData={missionsData}
            accounts={accounts}
            idcampaign={idcampaign}
            setIdcampaign={setIdcampaign}
            LOBs={LOBs}
            idLob={idLob}
            setIdLob={setIdLob}
            teams={teams}
            idTeam={idTeam}
            setIdTeam={setIdTeam}
            date1={date1}
            setDate1={setDate1}
            date2={date2}
            setDate2={setDate2}
            setAgents={setAgents}
            agents={agents}
            setAgent={setAgent}
            agent={agent}
            setSelectKpi={setSelectKpi}
            handleConsulta={handleConsulta}
            setContext={setContext}
            setCaso={setCaso}
            setIdMission={setIdExam}
            idMission={idExam}
            selectKpi={selectKpi}
            group={group}
            setGroup={setGroup}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Box padding={1}>
          <HeaderCharts
            dato={selectKpi?.Kpi}
            dataHead={dataHead}
            context={context}
            questionsHead={questionsHead}
          />
        </Box>
        <Box padding={1}>
          {dataChart[0]?.length > 0 ? (
            <BasicColumnChart
              categories={categories}
              nameChart1={data?.Kpi || (dataChart[3] && dataChart[3][0])}
              nameChart2={dataChart[3] && dataChart[3][1]}
              nameChart3={dataChart[3] && dataChart[3][2]}
              nameChart4={dataChart[3] && dataChart[3][3]}
              dataChart1={dataChart[0] && dataChart[0]}
              dataChart2={dataChart[1] && dataChart[1]}
              dataChart3={dataChart[2] && dataChart[2]}
              dataChart4={dataChart[4] && dataChart[4]}
            />
          ) : (
            <Box
              height={450}
              sx={{
                backgroundImage: `url(${bgData})`,
                backgroundPosition: "50%",
                backgroundSize: "cover",
                opacity: "0.3",
              }}
            >
              ...
            </Box>
          )}
          {/* <MultipleCharsPareto /> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AnalyticsCharts;
