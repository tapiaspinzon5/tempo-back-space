import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  styled,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import KpiCardUserAnalytics from "../../components/Analytics/KpiCardUserAnalytics";
import LineChartGP from "../../components/progressCharts/LineChartGP";

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

const kpiData = [
  {
    idccms: 4472074,
    Kpi: "1 Stars",
    Lob: "LOB1",
    Type: 1,
    unitKpi: "Hours",
    Date: "2022-02-22T01:00:02.403",
    ACTUAL: 8,
    Id: 142,
    Nombre: "Wapps Test 2",
    IdEquipo: 142,
    Quartile: "Q1",
    Target: 8,
    TargetQ1: 8,
    TargetQ2: 10,
    TargetQ3: 15,
    TargetQ4: 20,
    OrderKpi: "dsc",
  },
  {
    idccms: 4472074,
    Kpi: "AHT",
    Lob: "LOB1",
    Type: 2,
    unitKpi: "Seconds",
    Date: "2022-02-22T01:00:02.403",
    ACTUAL: 968.067873,
    Id: 142,
    Nombre: "Wapps Test 2",
    IdEquipo: 142,
    Quartile: "Q1",
    Target: 1260,
    TargetQ1: 1260,
    TargetQ2: 572,
    TargetQ3: 352,
    TargetQ4: 85,
    OrderKpi: "asc",
  },
  {
    idccms: 4472074,
    Kpi: "AHT_In",
    Lob: "LOB1",
    Type: 2,
    unitKpi: "Seconds",
    Date: "2022-02-22T01:00:02.403",
    ACTUAL: 379.085106,
    Id: 142,
    Nombre: "Wapps Test 2",
    IdEquipo: 142,
    Quartile: "Q1",
    Target: 106,
    TargetQ1: 106,
    TargetQ2: 391,
    TargetQ3: 715,
    TargetQ4: 1316,
    OrderKpi: "dsc",
  },
  {
    idccms: 4472074,
    Kpi: "AgentSat%",
    Lob: "LOB1",
    Type: 4,
    unitKpi: "Avg",
    Date: "2022-02-22T01:00:02.403",
    ACTUAL: 50,
    Id: 142,
    Nombre: "Wapps Test 2",
    IdEquipo: 142,
    Quartile: "Q1",
    Target: 100,
    TargetQ1: 100,
    TargetQ2: 80,
    TargetQ3: 60,
    TargetQ4: 50,
    OrderKpi: "asc",
  },
  {
    idccms: 4472074,
    Kpi: "%ACW",
    Lob: "LOB1",
    Type: 5,
    unitKpi: "Percentage",
    Date: "2022-01-10T12:28:00.567",
    ACTUAL: 0.0652,
    Id: 142,
    Nombre: "Wapps Test 2",
    IdEquipo: 142,
    Quartile: "Q1",
    Target: 1,
    TargetQ1: 1,
    TargetQ2: 100,
    TargetQ3: 800,
    TargetQ4: 1000,
    OrderKpi: "dsc",
  },
];

const AgentAnalytics = () => {
  const [timeView, setTimeView] = useState("");
  return (
    <MainPage>
      <Header />
      <Box display="flex" color="#3047B0" alignItems="center" marginY="1rem">
        <Typography variant="h5" marginRight="1rem">
          {" "}
          KPI's
        </Typography>
        <Typography variant="body1"> Name team - AMAZON</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BoxContain sx={{ overflowY: "scroll" }}>
            {kpiData.map((kpi, index) => (
              <KpiCardUserAnalytics kpi={kpi} key={index} />
            ))}
          </BoxContain>
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
                <FormControl fullWidth>
                  <InputLabel id="time-view-label">Time view</InputLabel>
                  <Select
                    labelId="time-view-label"
                    id="time-view"
                    value={timeView}
                    label="Time view"
                    onChange={(e) => setTimeView(e.target.value)}
                  >
                    <MenuItem value="Day">Day</MenuItem>
                    <MenuItem value="Month">Month</MenuItem>
                    <MenuItem value="Week">Week</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <LineChartGP />
          </BoxContain>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default AgentAnalytics;
