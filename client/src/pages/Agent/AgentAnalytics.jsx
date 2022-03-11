import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import KpiCardUserAnalytics from "../../components/Analytics/KpiCardUserAnalytics";
import LineChartGP from "../../components/progressCharts/LineChartGP";
import { getDataAnalytics } from "../../utils/api";
import LoadingComponent from "../../components/LoadingComponent";
import { useSelector, useDispatch } from "react-redux";
import { dataGraphics } from "../../helpers/helpers";
import { logoutAction } from "../../redux/loginDuck";

const BoxContain = styled(Box)(() => ({
  background: "#f9f9f9",
  padding: "1rem",
  height: "60vh",
  borderRadius: "10px",
  color: "#3047B0",

  "&::-webkit-scrollbar": {
    width: "6px" /* width of the entire scrollbar */,
  },

  "&::-webkit-scrollbar-track": {
    background: "white" /* color of the tracking area */,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8" /* color of the scroll thumb */,
    borderRadius: "20px" /* roundness of the scroll thumb */,
    marginRight: "1rem",
    //border: "3px solid transparent" /* creates padding around scroll thumb */,
  },
}));

const AgentAnalytics = ({ count }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const [changeKpi, setChangeKpi] = useState("");
  const [kpi, setKpi] = useState([]);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
  });
  const [loadingKpi, setLoadingKpi] = useState(false);
  const [loadingGraphic, setLoadingGraphic] = useState(false);

  useEffect(() => {
    setLoadingKpi(true);
    setLoadingGraphic(true);
    const getData = async () => {
      const kpiList = await getDataAnalytics(idccms, "%Abs");
      if (kpiList && kpiList.status === 200 && kpiList.data.length > 1) {
        const dataGraphic = await getDataAnalytics(
          idccms,
          kpiList.data[1].KpiDetallado[0].Kpi
        );
        if (
          dataGraphic &&
          dataGraphic.status === 200 &&
          dataGraphic.data.length > 1
        ) {
          const graphic = dataGraphics(dataGraphic.data[0].KPI);
          setSeries([graphic[0]]);
          setOptions({ ...options, xaxis: { categories: graphic[1] } });
          setKpi(kpiList.data[1].KpiDetallado);
          setLoadingKpi(false);
          setLoadingGraphic(false);
        }
      }else if(kpiList.data === 'UnauthorizedError'){
        dispatch(logoutAction());
        navigate("/");
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setLoadingGraphic(true);
    const getData = async () => {
      const dataGraphic = await getDataAnalytics(idccms, changeKpi);
      if (
        dataGraphic &&
        dataGraphic.status === 200 &&
        dataGraphic.data.length > 1
      ) {
        const graphic = dataGraphics(dataGraphic.data[0].KPI);
        setSeries([graphic[0]]);
        setOptions({ ...options, xaxis: { categories: graphic[1] } });
    
        setLoadingGraphic(false);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [changeKpi]);

  const  handleKPI =()=>{
   
  }
  
  return (
    <MainPage>
      <Header count={count} />
      <Box display="flex" color="#3047B0" alignItems="center" marginY="1rem">
        <Typography variant="h5" marginRight="1rem">
          {" "}
          KPI's
        </Typography>
        <Typography variant="body1"> Name team - AMAZON</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {loadingKpi ? (
            <LoadingComponent />
          ) : (
            <BoxContain sx={{ overflowY: "scroll" }}>
              {kpi.map((kpi, index) => (
                <KpiCardUserAnalytics
                  kpi={kpi}
                  key={index}
                  setChangeKpi={setChangeKpi}
                   handleKPI={ handleKPI}
                />
              ))}
            </BoxContain>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxContain>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Graphic data</Typography>
              <Box sx={{ minWidth: 120 }}>
           
              </Box>
            </Box>
            {loadingGraphic ? (
              <LoadingComponent />
            ) : (
              <LineChartGP series={series} options={options} />
            )}
          </BoxContain>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default AgentAnalytics;
