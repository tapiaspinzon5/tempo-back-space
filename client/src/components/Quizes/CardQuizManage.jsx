import React from "react";
import { Typography, Grid, Box, Button, styled, css } from "@mui/material";
import ProgresBar from "../progressCharts/ProgresBar";

const CardViewer = styled(Box)(({ theme }) => ({
  height: "14rem",
  maxWidth: "20rem",
  boxShadow: "1px 1px 5px #A2A2A2",
  borderRadius: "10px 10px 0 0 ",
  background: "#F9F9F9 0% 0% no-repeat padding-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  boxSizing: "border-box",
  img: {
    background: "blue",
    height: "90px",
    width: "90px",
    borderRadius: "50%",
  },
  "&:hover": {
    boxShadow: " 3px 3px 5px #A2A2A2",
    opacity: 1,
  },
}));

const DownSection = styled(Box)(({ theme }) => ({
  boxShadow: "1px 1px 5px #A2A2A2",
  maxWidth: "20rem",
  height: "4rem",
  background: "red",
  borderRadius: "0 0  10px 10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  button: {
    color: "#000",
    background: "#fff",
    textTransform: "none",
    fontWeight: "bold",
    width: "111px",
    padding: 0,
    borderRadius: "10px",
    "&:hover": {
      background: "#e6e6e6e0",
    },
  },
}));

const CardQuizManage = ({ stateActivity, image, nameQuiz, progress }) => {
  let background;
  let state;
  switch (stateActivity) {
    case 1:
      background = "FF0000 0% 0% no-repeat padding-box";
      state = "Failed";
      break;
    case 2:
      background = "#F5D200 0% 0% no-repeat padding-box";
      state = "Pending";
      break;
    case 3:
      background =
        "transparent linear-gradient(180deg, #3047B0 0%, #0087FF 100%) 0% 0% no-repeat padding-box";
      state = "Start";
      break;
    case 4:
      background = "#00D769 0% 0% no-repeat padding-box";
      state = "Complete";
      break;
    default:
      break;
  }

  return (
    <>
      <CardViewer>
        <img src={image} alt="img" />
        <Typography variant="h6" fontWeight="bold">
          {nameQuiz}
        </Typography>
        <Box width={185}>
          <ProgresBar value={progress} />
        </Box>
      </CardViewer>
      <DownSection sx={{ background }}>
        <Button>{state}</Button>
      </DownSection>
    </>
  );
};

export default CardQuizManage;
