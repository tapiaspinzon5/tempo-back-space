import React from "react";
import { useParams } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { DescriptionCard } from "../components/Description/DescriptionCard";
//import { Navbar } from "../components/SideBar/Navbar";

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
