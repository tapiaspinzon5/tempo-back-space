import React, { useState, useEffect } from "react";
import { Typography, Box, styled } from "@mui/material";

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
  height: "1rem",
}));

const ProgressKPI = ({ value, target }) => {
  const [widthTarget, setWidthTarget] = useState(0);
  const [widthRed, setWidthRed] = useState(0);
  //const target = 90;

  useEffect(() => {
    setWidthTarget(100 - target);
    setWidthRed(target - 10);
  }, [target]);

  console.log(widthTarget);
  return (
    <MainProgress>
      <Box
        sx={{
          borderTop: "1rem solid #3047B0",
          borderLeft: ".5rem solid transparent",
          borderRight: ".5rem solid transparent",
          width: "1px",
          position: "relative",
          top: "10px",
          left: `${value}%`,
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
