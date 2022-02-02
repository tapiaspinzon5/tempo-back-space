import React from "react";
import { CircularProgress, Box, styled } from "@mui/material";

const LoadingBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  height: "100%",
  width: "100%",
  background: "#97969669",
  zIndex: "1000",
}));

export const ModalLoading = () => {
  return (
    <LoadingBox>
      <CircularProgress size={100} />
    </LoadingBox>
  );
};
