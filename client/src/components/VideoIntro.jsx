import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
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
      <ReactPlayer
        style={{ border: "solid 10px blue", borderRadius: "10px" }}
        width="70%"
        height="90%"
        controls
        //url="https://www.youtube.com/watch?v=JfIxOMbA30Y"
        url={video}
        onEnded={() => setNext(false)}
      />
    </>
  );
};
