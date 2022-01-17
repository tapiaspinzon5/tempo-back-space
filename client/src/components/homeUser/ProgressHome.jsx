import React from "react";
import { Box, Typography, Divider, Button, styled } from "@mui/material";
import { ImFire } from "react-icons/im";
import ProgresBar from "../progressCharts/ProgresBar";
//import { MdOutlineArrowForwardIos } from "react-icons/md";
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

const ProgressHome = ({ dataKPI }) => {
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

      {dataKPI[1] &&
        dataKPI[1].KPI.map((kpi, index) => (
          <Box key={index}>
            <Box
              display="flex"
              py={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box width="60%">
                <Box
                  width="150%"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" fontWeight="bold">
                    {kpi.Kpi}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" fontSize="12px">
                    {`Up: ${new Date(kpi.Date).toDateString()}`}
                  </Typography>
                </Box>
                <Typography variant="caption">
                  {"Your Score: " + kpi.ACTUAL} {kpi.unitKpi}
                </Typography>
                {kpi.unitKpi === "Percentage" ? (
                  <ProgresBar value={kpi.ACTUAL} />
                ) : kpi.TargetQ1 - kpi.TargetQ4 > 0 ? (
                  <ProgresBar value={(kpi.ACTUAL * 100) / kpi.TargetQ1} />
                ) : (
                  <ProgresBar value={(kpi.ACTUAL * 100) / kpi.TargetQ4} />
                )}
                <Typography variant="body1" fontWeight="bold" fontSize="12px">
                  {`Target: ${kpi.Target}`}
                </Typography>
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
