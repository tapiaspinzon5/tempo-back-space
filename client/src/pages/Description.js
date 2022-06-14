import React from "react";
import { useParams } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { DescriptionCard } from "../components/Description/DescriptionCard";

export const Description = () => {
  const params = useParams();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <CssBaseline />

      <DescriptionCard />
    </Box>
  );
};
