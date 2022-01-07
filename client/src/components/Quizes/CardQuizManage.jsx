import React, { useState, useEffect } from "react";
import { Typography, Box, Button, styled } from "@mui/material";
import ProgresBar from "../progressCharts/ProgresBar";
import { useNavigate } from "react-router-dom";

const CardViewer = styled(Box)(({ theme }) => ({
  //height: "14rem",
  height: "7rem",
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

const CardQuizManage = ({
  stateActivity,
  image,
  nameQuiz,
  progress,
  idQuiz,
  CantidadPreguntas,
  PreguntasRespondidas,
}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [valueProgress, setValueProgress] = useState(0);
  const [background, setbackground] = useState(false);

  useEffect(() => {
    if (PreguntasRespondidas !== 0) {
      const result = parseInt((PreguntasRespondidas * 100) / CantidadPreguntas);
      console.log(result);
      setValueProgress(result);
    } else {
      setValueProgress(0);
    }

    switch (stateActivity) {
      case "Failed":
        setbackground("FF0000 0% 0% no-repeat padding-box");
        setActive(true);
        break;
      case "Pending":
        setbackground("#F5D200 0% 0% no-repeat padding-box");

        break;
      case "Start":
        setbackground(
          "transparent linear-gradient(180deg, #3047B0 0%, #0087FF 100%) 0% 0% no-repeat padding-box"
        );
        break;
      case "Approved":
        setbackground("#00D769 0% 0% no-repeat padding-box");
        setActive(true);
        break;
      default:
        break;
    }
  }, [stateActivity]);
  console.log(stateActivity);
  console.log(valueProgress);
  return (
    <>
      <CardViewer>
        {/* <img src={image} alt="img" /> */}
        <Typography variant="h6" fontWeight="bold">
          {nameQuiz}
        </Typography>
        <Typography variant="body1">Quiz id: {idQuiz}</Typography>
        <Box width={185}>
          <ProgresBar value={valueProgress} />
        </Box>
      </CardViewer>
      <DownSection sx={{ background }}>
        <Button
          onClick={() => navigate(`/quizdetails/${idQuiz}`)}
          disabled={active}
        >
          {stateActivity}
        </Button>
      </DownSection>
    </>
  );
};

export default CardQuizManage;
