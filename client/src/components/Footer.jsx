import React from "react";
import { Typography, Box, styled } from "@mui/material";
import logoTP from "../assets/images/logo-tp-blue.svg";
import tpMAR from "../assets/images/tp-mar-blue.svg";

const BoxFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem 0",
  flexWrap: "wrap",
  img: {
    marginRight: "2rem",
  },
  p: {
    color: "#b2b2b2",
    font: "normal normal normal 16px/29px SancoaleSoftened 4",
  },
}));

const Footer = () => {
  return (
    <BoxFooter>
      <img src={logoTP} alt="Teleperformance" height={30} />
      <img src={tpMAR} alt="TP-MAR" />
      <Typography variant="body1">COPYRIGHT 2021 - TP MAR / TMS </Typography>
    </BoxFooter>
  );
};

export default Footer;
