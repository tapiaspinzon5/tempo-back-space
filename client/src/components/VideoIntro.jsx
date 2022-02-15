import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ReactPlayer from "react-player";
import { useTheme } from "@mui/material/styles";
import Agent from "../assets/video/video1.mp4";
import TeamLead from "../assets/video/video2.mp4";
import QALead from "../assets/video/video3.mp4";
import OpsM from "../assets/video/video4.mp4";
import Super from "../assets/video/video5.mp4";
import Reporting from "../assets/video/video6.mp4";
export const VideoIntro = ({ setNext, rol }) => {
  const theme = useTheme();
  const [video, setvideo] = useState();
  useEffect(() => {
    switch (rol) {
      case "Agent":
        setvideo(Agent);
        break;
      case "Team Leader":
        setvideo(TeamLead);
        break;
      case "QA Lead":
        setvideo(QALead);
        break;
      case "Operation Manager":
        setvideo(OpsM);
        break;
      case "Super Admin":
        setvideo(Super);
        break;
      case "Reporting Lead":
        setvideo(Reporting);
        break;
      default:
        break;
    }
  }, [rol]);
  return (
    <>
      <Box
        sx={{
          background: theme.palette.background.primary,
          width: "65%",
          height: "90%",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <ReactPlayer
          style={{ borderRadius: "10px" }}
          width="100%"
          height="100%"
          controls
          //url="https://www.youtube.com/watch?v=JfIxOMbA30Y"
          url={video}
          onEnded={() => setNext(false)}
        />
      </Box>
    </>
  );
};
