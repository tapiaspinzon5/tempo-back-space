import React, { useState, useEffect } from "react";
import { Typography, Box, styled } from "@mui/material";
import { positionValue } from "../../helpers/helpers";

const MainProgress = styled(Box)(() => ({
  overflow: "hidden",
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

const ProgressKPI = ({ value, target, kpi }) => {
  const [arrowPos, setArrowPos] = useState(0);

  useEffect(() => {
    const pos = positionValue(kpi);
    setArrowPos(pos);
  }, []);

  //console.log(kpi);
  return (
    <MainProgress>
      <Box
        sx={{
          borderTop: ".7rem solid #3047B0",
          borderLeft: ".5rem solid transparent",
          borderRight: ".5rem solid transparent",
          width: "1px",
          position: "relative",
          top: "5px",
          left: `${arrowPos}%`,
        }}
      />
      <BoxProgress>
        <BoxChart
          sx={{
            backgroundColor: "#ff5c00",
            // width: `${widthRed}%`,
            width: "33.333%",
          }}
        ></BoxChart>
        <BoxChart
          sx={{
            backgroundColor: "#f5d200",
            width: "33.333%",
            // width: "10%",
          }}
        ></BoxChart>
        <BoxChart
          sx={{
            background: "linear-gradient(270deg, #00af9b 0%, #00d769 100%)",
            width: "33.333%",
            // width: `${widthTarget}%`,
          }}
        ></BoxChart>
      </BoxProgress>
    </MainProgress>
  );
};

export default ProgressKPI;
