import React from "react";
import { Typography, Grid, styled } from "@mui/material";

const SummaryBox = styled(Grid)`
  border: 1px solid #f2f2f2;
  height: 452px;

  border-radius: 10px;
`;

const ChallengeSummary = () => {
  return (
    <>
      <Typography variant="h6">Resumen de desafios</Typography>
      <SummaryBox>estadisticas</SummaryBox>
    </>
  );
};

export default ChallengeSummary;
