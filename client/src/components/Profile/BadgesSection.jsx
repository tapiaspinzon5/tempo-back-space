import { Box, Typography, styled } from "@mui/material";
import React from "react";
import TPVSection from "./TPVSection";

const BoxBadgeUser = styled(Box)(() => ({
  color: "#3047b0",
  display: "flex",
  minHeight: "70vh",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1rem",
}));

const BoxBages = styled(Box)(() => ({
  height: "34.3rem",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));
const BadgesSection = () => {
  return (
    <BoxBadgeUser>
      <Box>
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "white",
            width: "5rem",
            boxShadow: "0px 3px 3px #00000029",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          Badges
        </Typography>
      </Box>
      <BoxBages>imagenes de los badges ...pendiente por definir</BoxBages>
    </BoxBadgeUser>
  );
};

export default BadgesSection;
