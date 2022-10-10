import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { positionValue } from "../../helpers/helpers";
import { GoArrowSmallUp, GoArrowSmallDown } from "react-icons/go";
import Astronaut from "../../assets/images/awards/astronaut.png";

const MainProgress = styled(Box)(() => ({
  overflow: "hidden",
  width: "95%",
}));

const BoxProgress = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  display: "flex",
  overflow: "hidden",
}));

const BoxChart = styled(Box)(() => ({
  height: ".6rem",
}));

const ProgressKPI = ({ kpi }) => {
  const [arrowPos, setArrowPos] = useState(0);
  const { OrderKpi } = kpi;

  useEffect(() => {
    const pos = positionValue(kpi);
    setArrowPos(pos);

    // eslint-disable-next-line
  }, []);

  return (
    <Box display="flex" alignItems="center">
      <MainProgress>
        {/* <Box
          sx={{
            borderTop: ".7rem solid #3047B0",
            borderLeft: ".5rem solid transparent",
            borderRight: ".5rem solid transparent",
            width: "1px",
            position: "relative",
            top: "5px",
            left: `${arrowPos}%`,
          }}
        /> */}
        <Box
          sx={{
            position: "relative",
            top: "10px",
            left: `${arrowPos}%`,
          }}
        >
          <img src={Astronaut} alt="Astronaut" height={25} />
        </Box>
        <BoxProgress>
          <BoxChart
            sx={{
              backgroundColor: "#ff5c00",
              width: "33.333%",
            }}
          ></BoxChart>

          <BoxChart
            sx={{
              backgroundColor: "#f5d200",
              width: "33.333%",
            }}
          ></BoxChart>

          <BoxChart
            sx={{
              background: "linear-gradient(270deg, #00af9b 0%, #00d769 100%)",
              width: "33.333%",
            }}
          ></BoxChart>
        </BoxProgress>
      </MainProgress>
      {OrderKpi === "asc" ? (
        <GoArrowSmallUp color=" #00d769" size={25} />
      ) : (
        <GoArrowSmallDown color=" #00d769" size={25} />
      )}
    </Box>
  );
};

export default ProgressKPI;
