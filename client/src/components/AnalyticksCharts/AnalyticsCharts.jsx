import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import ButtonsTopAnalytics from "./ButtonsTopAnalytics";
import NavChartsAnalytics from "./NavChartsAnalytics";
import HeaderCharts from "./HeaderCharts";
import BasicColumnChart from "./BasicColumnChart";
import MultipleCharsPareto from "./MultipleCharsPareto";
import { requestWithData } from "../../utils/api";
import {
  helperDataChartCat,
  helperDataChartData,
} from "../../helpers/helperDataChart";

const AnalyticsCharts = ({ setShowCharts, showCharts }) => {
  const [kpiData, setKpiData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [LOBs, setLOBs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState([]);
  const [idcampaign, setIdcampaign] = useState("");
  const [idLob, setIdLob] = useState("");
  const [idTeam, setIdTeam] = useState("");
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [selectKpi, setSelectKpi] = useState([]);
  const [data, setData] = useState([]);
  const [context, setContext] = useState(0);
  const [caso, setCaso] = useState(0);
  const [categories, setCategories] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const handleCharts = () => {
    setShowCharts(false);
  };

  useEffect(() => {
    //getDataKPI();
    getDataAccounts();
  }, []);

  useEffect(() => {
    getDataLOB();
  }, [idcampaign]);
  useEffect(() => {
    getDataTeams();
    getDataKPI();
  }, [idLob]);
  useEffect(() => {
    getDataAgents();
  }, [idTeam]);

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
      idcampaign: idcampaign,
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
    const dataKPI = await requestWithData("getAnalyticsClusterDirector", {
      context: 6,
      idLob: idLob,
      idCampaign: 0,
      idTeam: 0,
      initDate: "01-01-2022",
      endDate: "01-01-2022",
      kpi: "0",
      idccmsUser: 0,
      idExam: 0,
      idQuestion: 0,
      idChallenge: 0,
    });

    setKpiData(dataKPI.data[0].ListKpi);
  };

  const handleConsulta = async () => {
    const dataChart = await requestWithData("getAnalyticsClusterDirector", {
      context,
      caso,
      idcampaign,
      idLob,
      idTeam,
      initDate: date1,
      endDate: date2,
      kpi: selectKpi.Kpi,
      idccmsUser: agent.Ident,
      idExam: 0,
      idQuestion: 0,
      idChallenge: 0,
    });

    setData(dataChart.data[0]);
    setCategories(helperDataChartCat(dataChart.data[0], context));
    setDataChart(helperDataChartData(dataChart.data[0], context));
    //const fittedData = helperDataChartData(dataChart.data[0], context);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4} lg={3}>
        <Box padding={1}>
          <ButtonsTopAnalytics
            showCharts={showCharts}
            handleCharts={handleCharts}
          />
          <NavChartsAnalytics
            kpiData={kpiData}
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
            agents={agents}
            setAgent={setAgent}
            setSelectKpi={setSelectKpi}
            handleConsulta={handleConsulta}
            setContext={setContext}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Box padding={1}>
          <HeaderCharts dato={selectKpi.Kpi} />
        </Box>
        <Box padding={1}>
          <BasicColumnChart
            categories={categories}
            nameChart="AHT"
            dataChart={dataChart}
          />
          {/* <MultipleCharsPareto /> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AnalyticsCharts;
