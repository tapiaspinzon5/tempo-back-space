import React from "react";
import { Box, Typography, Divider, Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ProgresBar from "../progressCharts/ProgresBar";

const CardProgressSection = styled(Box)(({ theme }) => ({
  height: "40vh",
  padding: "1rem",
  backgroundColor: "#f9f9f9",
  margin: "1rem 0",
  borderRadius: "5px",
  overflowY: "scroll",
  scrollbarWidth: "thin",
  scrollbarColor: "blue green",
  button: {
    textTransform: "none",
    color: "#000",
  },
}));

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
      <Box display="flex" alignItems="center" py={2}>
        <Typography variant="h6" fontWeight="bold">
          KPI - Microsoft
        </Typography>
        <Typography variant="caption" color="initial" ml={5}>
          LOB - Account
        </Typography>
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
