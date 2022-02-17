import React, { useState } from "react";
import { Typography, Box, styled } from "@mui/material";

const MainProgress = styled(Box)(() => ({
  background: "#f0f9f9",
  padding: "1rem 0",
}));

const BoxProgress = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  display: "flex",
  margin: ".5rem 0",
  overflow: "hidden",
}));

const BoxChart = styled(Box)(() => ({
  height: "1rem",
  width: "33.33333333%",
}));

const ProgressKPI = () => {
  const value = 10;
  const target = 90;

  return (
    <MainProgress>
      <Box
        sx={{
          width: "5px",
          height: "2rem",
          background: "blue",
          zIndex: "1000",
          position: "relative",
          top: "2rem",
          left: `${value}%`,
        }}
      />
      <BoxProgress>
        <BoxChart
          sx={{
            backgroundColor: "red",
          }}
        ></BoxChart>
        <BoxChart
          sx={{
            backgroundColor: "yellow",
          }}
        ></BoxChart>
        <BoxChart
          sx={{
            backgroundColor: "#0f0",
            width: `(${100 - target})%`,
          }}
        ></BoxChart>
      </BoxProgress>
    </MainProgress>
  );
};

export default ProgressKPI;
