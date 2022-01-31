import React from "react";
import { PongSpinner } from "react-spinners-kit";
import { Typography, Box, styled } from "@mui/material";

const BoxLoading = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  h6: {
    color: "#3047B0",
  },
}));

const LoadingComponent = ({ theme }) => {
  return (
    <BoxLoading>
      <Typography variant="h6" color="initial">
        loading {theme}...
      </Typography>
      <PongSpinner size={100} color="#FF00FF" />
    </BoxLoading>
  );
};

export default LoadingComponent;
