import React from "react";
import { CgTrash } from "react-icons/cg";
import { Typography, Box, styled, IconButton } from "@mui/material";
import tpIco from "../../assets/images/tp_short.png";

const CardCount = styled(Box)(({ theme }) => ({
  height: "21.875rem",
  maxWidth: "20rem",
  boxShadow: "1px 1px 5px #A2A2A2",
  borderRadius: "10px",
  background: "#F9F9F9 0% 0% no-repeat padding-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",

  img: {
    height: "104px",
    width: "104px",
    borderRadius: "50%",
  },
  "&:hover": {
    boxShadow: " 3px 3px 5px #A2A2A2",
    opacity: 1,
  },
  div: {
    marginLeft: "auto",
    paddingRight: "1rem",
    svg: {
      color: "#3047B0",
    },
  },
}));
export const CardCountDesc = ({ count }) => {
  const { Nombre, Campaign } = count;
  return (
    <CardCount>
      <Box>
        {" "}
        <IconButton>
          <CgTrash />
        </IconButton>
      </Box>

      <img src={tpIco} alt="" />

      <Typography variant="h6" fontWeight="bold" align="center">
        {Nombre}
      </Typography>

      <Typography variant="body2" align="center">
        {Campaign}
      </Typography>
    </CardCount>
  );
};
