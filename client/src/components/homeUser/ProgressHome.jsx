import React from "react";
import { Box, Typography, Divider, Button, styled } from "@mui/material";
import { ImFire } from "react-icons/im";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ProgresBar from "../progressCharts/ProgresBar";
//import { LinearGauge } from "../LinearGauge/LinearGauge";

const CardProgressSection = styled(Box)(({ theme }) => ({
  height: "40vh",
  padding: "1rem",
  backgroundColor: "#f9f9f9",
  margin: "1rem 0",
  borderRadius: "5px",
  overflowY: "scroll",
  scrollbarWidth: "thin",
  scrollbarColor: "blue green",
  color: "#3047B0",
  button: {
    textTransform: "none",
    color: "#000",
    background: "#3047B0",
    borderRadius: 0,
    "&:hover": {
      background: "#3047B0",
    },
  },
}));

const Arrow = styled(Box)(() => ({
  width: "25px",
  borderLeft: "15px solid #3047B0",
  borderTop: "19px solid transparent",
  borderBottom: "18px solid transparent",
}));

/* const dataP = {
  name: "PPH",
  unit: "Seconds",
  value: 2.31,
  good: 5,
  warning: 2,
  bad: 1,
  target: 3.5,
}; */

const dataKPI = [
  {
    nombre: "PPH",
    unit: "Seconds",
    valor: "3.31",
  },
  {
    nombre: "SAR",
    unit: "%",
    valor: "100",
  },
  {
    nombre: "Solved",
    unit: "Hours",
    valor: "22.5",
  },
  {
    nombre: "SHK",
    unit: "%",
    valor: "0.7",
  },
  {
    nombre: "%Csat",
    unit: "%",
    valor: "68.18",
  },
  {
    nombre: "Escalation",
    unit: "%",
    valor: "25.65",
  },
  {
    nombre: "TPH",
    unit: "Seconds",
    valor: "4.36",
  },
  {
    nombre: "FTR",
    unit: "%",
    valor: "0.9",
  },
  {
    nombre: "SLA",
    unit: "%",
    valor: "96.02",
  },
  {
    nombre: "Surveys",
    unit: "%",
    valor: "5.3",
  },
];

const ProgressHome = () => {
  return (
    <CardProgressSection>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Gain more points today
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" mr={1}>
            Start
          </Typography>

          <Button>
            <ImFire size={25} color="#fff" />
          </Button>
          <Arrow />
        </Box>
      </Box>
      <Divider variant="fullWidth" light />

      {/* Card Progress section */}

      {dataKPI.map((kpi, index) => (
        <Box key={index}>
          <Box
            display="flex"
            py={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="60%">
              <Typography variant="body1" fontWeight="bold">
                {kpi.nombre}
              </Typography>
              <Typography variant="caption">
                {kpi.valor} {kpi.unit}
              </Typography>
              <ProgresBar value={kpi.valor} />
            </Box>
            <Box>
              {/* <Button size="small" endIcon={<MdOutlineArrowForwardIos />}>
                See more
              </Button> */}
            </Box>
          </Box>
          <Divider variant="fullWidth" light />
        </Box>
      ))}
      {/* END Card Progress*/}
    </CardProgressSection>
  );
};

export default ProgressHome;
