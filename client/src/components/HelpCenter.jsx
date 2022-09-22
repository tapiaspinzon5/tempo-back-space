import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { ButtonActionBlue } from "../assets/styled/muistyled";
import Agent from "../assets/video/video1.mp4";
import TeamLead from "../assets/video/video2.mp4";
import QALead from "../assets/video/video3.mp4";
import OpsM from "../assets/video/video4.mp4";
import Super from "../assets/video/video5.mp4";
import Reporting from "../assets/video/video6.mp4";

const HelpCenter = ({ rol, setHelpCenter }) => {
  const [video, setvideo] = React.useState();

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
    <div>
      <video
        src={video}
        autoPlay={true}
        controls
        width="100%"
        onEnded={() => setHelpCenter(false)}
        style={{ objectFit: "contain" }}
      ></video>
      <Box display="flex" justifyContent="center" marginY={2}>
        <ButtonActionBlue
          sx={{ width: "12rem" }}
          onClick={() => setHelpCenter(false)}
        >
          Close
        </ButtonActionBlue>
      </Box>
    </div>
  );
};

export default HelpCenter;
