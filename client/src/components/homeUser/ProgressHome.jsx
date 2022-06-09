import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Divider, Button, styled } from "@mui/material";
import { ImFire } from "react-icons/im";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsClock, BsPercent } from "react-icons/bs";
import ProgressKPI from "../progressCharts/ProgressKPI";
import { targetKPI } from "../../helpers/helpers";

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
}));

const BoxDataKPI = styled(Box)(() => ({
  button: {
    textTransform: "none",
    color: "#3047B0",
    marginLeft: ".5rem",
    borderRadius: 10,
    "&:hover": {
      background: "#f4f4f4",
    },
  },
}));

const BoxStar = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  button: {
    textTransform: "none",
    background: "#3047B0",
    borderRadius: "1px",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(90deg, #0087FF, #3047B0)",
      borderRadius: "5px 0 0 5px",
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
  const userData = useSelector((store) => store.loginUser.userData);
  const role = userData.Role;
  const navigate = useNavigate();

  const handleDirection = () => {
    if (role === "Agent") {
      navigate("/activitiesview");
    } else {
      navigate("/challengeasignment");
    }
  };
  return (
    <CardProgressSection>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={2}
      >
        <Typography variant="h6" fontWeight="bold">
          {role === "Agent"
            ? "Gain more points today"
            : "Assign more challenges today"}
        </Typography>
        <BoxStar>
          <Typography variant="h6" mr={1}>
            Start
          </Typography>
          <Button onClick={handleDirection}>
            <ImFire size={25} />
          </Button>
          <Arrow />
        </BoxStar>
      </Box>
      <Divider variant="fullWidth" light />

      {/* Card Progress section */}

      {dataKPI.length > 0 ? (
        dataKPI.map((kpi, index) => (
          <BoxDataKPI key={index}>
            <Box
              display="flex"
              py={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box width="100%">
                <Box
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">{kpi.Kpi}</Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box width="60%" paddingRight="1rem">
                    <ProgressKPI value={kpi.Actual} kpi={kpi} />
                  </Box>
                  <Box width="5rem">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      fontSize="12px"
                    >
                      
                      {`${kpi.Actual?.toFixed(2)} / ${targetKPI(kpi)}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      fontSize="10px"
                    >
                      {`${kpi.unitKpi}`}
                    </Typography>
                  </Box>
                  {kpi.unitKpi === "Percentage" || kpi.unitKpi === "Avg" ? (
                    <BsPercent />
                  ) : (
                    <BsClock />
                  )}
                  <Box>
                    <Button
                      size="small"
                      endIcon={<MdOutlineArrowForwardIos />}
                      onClick={() => {
                        role === "Agent"
                          ? navigate("/useranalytics")
                          : navigate("/followingteams");
                      }}
                    >
                      See more
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider variant="fullWidth" light />
          </BoxDataKPI>
        ))
      ) : (
        <Box>
          <Box
            display="flex"
            py={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              width="150%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                {"The Game Starts Soon"}
              </Typography>
            </Box>
          </Box>
          <Divider variant="fullWidth" light />
        </Box>
      )}
      {/* END Card Progress*/}
    </CardProgressSection>
  );
};

export default ProgressHome;
