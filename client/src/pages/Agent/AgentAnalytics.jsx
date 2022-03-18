import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  styled,
  Typography,
  Box,
  Divider,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import LoadingComponent from "../../components/LoadingComponent";
import Header from "../../components/homeUser/Header";

import { getKpisHome, getUsersKPI } from "../../utils/api";
import Footer from "../../components/Footer";
import LineChartGP from "../../components/progressCharts/LineChartGP";
import KpiCardUserAnalytics from "../../components/Analytics/KpiCardUserAnalytics";
import { AiOutlineLineChart, AiOutlineBarChart } from "react-icons/ai";
import { MainPage } from "../../assets/styled/muistyled";
import { ConvertMonth } from "../../helpers/helpers";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";

const UsersBox = styled(Grid)(() => ({
  borderRadius: "20px",
  padding: " 0 0 0 1rem",
  overflowY: "scroll",
  height: "65vh",
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

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  background: "#f9f9f9",
  minHeight: "50vh",
  borderRadius: "20px",
}));

const AgentAnalytics = ({ count }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const [kpi, setKpi] = useState([]);
  const [actualKpi, setActualKpi] = useState([]);
  const [usersKPI, setUsersKPI] = useState([]);
  const [graph, setGraph] = useState([]);
  const [loadingGraph, setLoadingGraph] = useState(false);
  const [loadingKpi, setLoadingKpi] = useState(false);
  const [error, setError] = useState(false);
  const [timeView, setTimeView] = useState("Day");
  const [series, setSeries] = useState([]);
  const [typeChart, setTypeChart] = useState("area");
  const [options, setOptions] = useState({
    colors: ["#03A9F4", "#D7263D"],
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: [0.35, 1],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: "10px",
        },
      },
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoadingGraph(true);
      setLoadingKpi(true);
      const data = await getKpisHome(idccms, 1);
      if (data && data.status === 200 && data.data.length > 0) {
        //console.log(data.data[0].KPI);
        setKpi(data.data[0].KPI);
        setActualKpi(data.data[0].KPI[0]);
        const listAndGraph = await getUsersKPI(
          idccms,
          data.data[0].KPI[0].IdRegistryKpi,
          timeView,
          idccms
        );
        if (
          listAndGraph &&
          listAndGraph.status === 200 &&
          listAndGraph.data.length > 1
        ) {
          setUsersKPI(listAndGraph.data[1].KpiValues);
          setGraph(listAndGraph.data[0].GraphicAverage);
          let seriesData = [];
          let categoriesData = [];
          let targetData = [];

          listAndGraph.data[0].GraphicAverage.forEach((dato) => {
            seriesData.push(dato.Actual.toFixed(2));
            targetData.push(data.data[0].KPI[0].Target);
            categoriesData.push(dato.Date.split("T")[0]);
          });
          setOptions({
            ...options,
            xaxis: { categories: categoriesData },
          });
          setSeries([
            { name: "KPI value", type: "area", data: seriesData },
            { name: "Target", type: "line", data: targetData },
          ]);
          setLoadingKpi(false);
          setLoadingGraph(false);
        } else {
          setError(true);
          setLoadingKpi(false);
        }
      } else if (data.data === "UnauthorizedError") {
        dispatch(logoutAction());
        navigate("/");
      } else {
        setError(true);
        setLoadingKpi(false);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleChart = async () => {
      let seriesData = [];
      let categoriesData = [];
      let targetData = [];
      if (timeView === "Day") {
        graph.forEach((dato) => {
          seriesData.push(dato.Actual.toFixed(2));
          targetData.push(actualKpi.Target);
          categoriesData.push(dato.Date.split("T")[0]);
        });
        setOptions({ ...options, xaxis: { categories: categoriesData } });
        setSeries([
          { name: "KPI value", type: typeChart, data: seriesData },
          { name: "Target", type: "line", data: targetData },
        ]);
      } else if (timeView === "Week") {
        const hash = {};
        let filterData = await graph.filter(function (current) {
          let exists = !hash[current.Week];
          hash[current.Week] = true;
          return exists;
        });
        filterData.forEach((dato) => {
          seriesData.push(dato.AverageWeekAgent.toFixed(2));
          targetData.push(actualKpi.Target);
          categoriesData.push(dato.Week.split("T")[0]);
        });
        setOptions({ ...options, xaxis: { categories: categoriesData } });
        setSeries([
          { name: "KPI average", type: typeChart, data: seriesData },
          { name: "Target", type: "line", data: targetData },
        ]);
      } else if (timeView === "Month") {
        const hash = {};
        let filterData = await graph.filter(function (current) {
          let exists = !hash[current.Month];
          hash[current.Month] = true;
          return exists;
        });
        filterData.forEach((dato) => {
          seriesData.push(dato.AverageMonthAgent.toFixed(2));
          targetData.push(actualKpi.Target);
          categoriesData.push(ConvertMonth(dato.Month));
        });
        setOptions({ ...options, xaxis: { categories: categoriesData } });
        setSeries([
          { name: "KPI average", type: typeChart, data: seriesData },
          { name: "Target", type: "line", data: targetData },
        ]);
      } else {
        setError(true);
      }
    };

    handleChart();
    // eslint-disable-next-line
  }, [graph, typeChart]);

  const handleTimeView = (e) => {
    e.preventDefault();
    setTypeChart("area");
    setLoadingGraph(true);

    setSeries([]);
    setOptions({
      colors: ["#03A9F4", "#D7263D"],
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "solid",
        opacity: [0.35, 1],
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: "10px",
          },
        },
      },
    });
    setTimeView(e.target.value);
    const newData = async () => {
      const listAndGraph = await getUsersKPI(
        idccms,
        actualKpi.IdRegistryKpi,
        e.target.value,
        idccms //ccms id del integrante del equipo
      );
      if (
        listAndGraph &&
        listAndGraph.status === 200 &&
        listAndGraph.data.length > 1
      ) {
        setGraph(listAndGraph.data[0].GraphicAverage);
        setLoadingGraph(false);
      } else {
        setError(true);
      }
    };
    newData();
  };

  const handleKPI = async (idKpi) => {
    setTypeChart("area");
    setLoadingGraph(true);
    setSeries([]);
    setOptions({
      colors: ["#03A9F4", "#D7263D"],
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "solid",
        opacity: [0.35, 1],
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: "10px",
          },
        },
      },
    });
    setTimeView("Day");
    const newData = async () => {
      const listAndGraph = await getUsersKPI(
        idccms,
        idKpi,
        "Day",
        idccms //ccms id del integrante del equipo
      );
      if (
        listAndGraph &&
        listAndGraph.status === 200 &&
        listAndGraph.data.length > 1
      ) {
        setGraph(listAndGraph.data[0].GraphicAverage);
        setUsersKPI(listAndGraph.data[1].KpiValues);
        setLoadingGraph(false);
      } else {
        setError(true);
      }
    };
    newData();
  };
  return (
    <MainPage>
      <Header count={count} />
      <Typography variant="h5"> KPI s</Typography>
      <Grid container>
        <UsersBox item xs={12} md={6}>
          <Item>
            <Typography variant="body1" marginBottom={2}>
              KPIs Name Team - Campaña
            </Typography>
            <Divider sx={{ borderColor: "#e8e8e8" }} />

            {!error ? (
              !loadingKpi ? (
                kpi?.map((detail, index) => (
                  <KpiCardUserAnalytics
                    key={index}
                    kpi={detail}
                    setActualKpi={setActualKpi}
                    handleKPI={handleKPI}
                  />
                ))
              ) : (
                <LoadingComponent />
              )
            ) : (
              <Typography variant="body1" marginBottom={2}>
                Game starts soon
              </Typography>
            )}
          </Item>
        </UsersBox>

        <UsersBox item xs={12} md={6}>
          <Item>
            <Box
              display="flex"
              justifyContent="space-between"
              padding="0 2rem"
              alignItems="center"
            >
              <>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="time-view-label">Time view</InputLabel>
                    <Select
                      labelId="time-view-label"
                      id="time-view"
                      value={timeView}
                      label="Time view"
                      onChange={handleTimeView}
                    >
                      <MenuItem value="Day">Day</MenuItem>
                      <MenuItem value="Week">Week</MenuItem>
                      <MenuItem value="Month">Month</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <IconButton onClick={() => setTypeChart("area")}>
                  <AiOutlineLineChart />
                </IconButton>
                <IconButton onClick={() => setTypeChart("bar")}>
                  <AiOutlineBarChart />
                </IconButton>
              </>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" marginRight="3rem">
                  {usersKPI[0]?.Kpi}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: "#e8e8e8" }} />

            {!loadingGraph ? (
              <LineChartGP
                series={series}
                options={options}
                typeChart={typeChart}
              />
            ) : (
              <LoadingComponent />
            )}
          </Item>
        </UsersBox>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default AgentAnalytics;
