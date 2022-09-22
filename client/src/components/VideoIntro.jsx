import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Agent from "../assets/video/video1.mp4";
import TeamLead from "../assets/video/video2.mp4";
import QALead from "../assets/video/video3.mp4";
import OpsM from "../assets/video/video4.mp4";
import Super from "../assets/video/video5.mp4";
import Reporting from "../assets/video/video6.mp4";
export const VideoIntro = ({ setNext, rol }) => {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          video: {
            width: { xs: "380px", md: "500px", lg: "780px", xl: "1100px" },
          },
        }}
      >
        <video
          src={video}
          autoPlay={true}
          controls
          onEnded={() => setNext(false)}
          style={{ objectFit: "contain" }}
        ></video>
      </Box>
    </>
  );
};
