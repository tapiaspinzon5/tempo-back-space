import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { DescriptionCard } from "../components/Description/DescriptionCard";
import { Navbar } from "../components/SideBar/Navbar";

export const Description = () => {
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
      <Navbar />
      <DescriptionCard />
    </Box>
  );
};
