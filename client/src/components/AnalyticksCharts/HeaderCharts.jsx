import React, { useState, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import {
  MdOutlineBarChart,
  MdOutlineAssignment,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";
//import { IoMedalOutline } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
import { BsDoorOpen } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaMedal } from "react-icons/fa";
import { GiStairsGoal, GiTrophyCup } from "react-icons/gi";
import { helperPercentage } from "../../helpers/helperDataChart";

const BoxHeaderCharts = styled(Box)(() => ({
  height: "5rem",
  background: "#f9f9f9",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "5px",
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));

const BoxCard = styled(Box)(() => ({
  display: "flex",
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "space-evenly",
  minWidth: "13rem",
  height: "80%",
  borderRadius: "10px",
  boxShadow: "0px 3px 6px #00000029",
  color: "#3047b0",
  marginRight: "1rem",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const HeaderCharts = ({ dataHead, context, questionsHead }) => {
  const [renderKPI, setRenderKPI] = useState([]);
  const [renderMissions, setRenderMissions] = useState([]);
  const [renderChallenges, setRenderChallenges] = useState([]);
  const [renderUsage, setRenderUsage] = useState([]);

  useEffect(() => {
    switch (context) {
      case 1:
        setRenderKPI(dataHead[2]?.KpiValues || []);
        break;
      case 2:
        setRenderMissions(dataHead[3]?.MissionsBoxInfo[0] || []);
        break;
      case 4:
        setRenderChallenges(dataHead[5]?.ChallengesBoxInfo[0] || []);
        break;
      case 5:
        setRenderUsage(dataHead[6]?.UsageDataBoxInfo[0] || []);
        break;
      default:
        break;
    }
  }, [context, dataHead]);

  return (
    <BoxHeaderCharts>
      {context === 1 &&
        renderKPI?.map((render, index) => (
          <Card
            key={index}
            titulo={render?.Kpi}
            valor={render.Score?.toFixed(2)}
            icon="kpi"
            units={render.unitKpi}
          />
        ))}
      {context === 2 && (
        <>
          <Card titulo="Approved" valor={renderMissions?.Approved} />
          <Card titulo="Failed" valor={renderMissions?.Failed} />
          <Card titulo="Score" valor={renderMissions?.Score} />
        </>
      )}
      {context === 3 &&
        questionsHead?.map((render, index) => (
          <Card
            key={index}
            icon="question"
            titulo={`Question  ${index + 1}`}
            valor={helperPercentage(render).toFixed(1) + "%" || 0}
          />
        ))}
      {context === 4 && (
        <>
          <Card titulo="Created" valor={renderChallenges?.ChallengesCreated} />
          <Card
            titulo="Assigned"
            valor={renderChallenges?.ChallengesAssigned}
          />
          <Card
            titulo="Completed"
            valor={renderChallenges?.ChallengesCompleted}
          />
          <Card titulo="Failed" valor={renderChallenges?.ChallengesFailed} />
        </>
      )}
      {context === 5 && (
        <>
          <Card titulo="# Users" valor={renderUsage?.NroUsers} />
          <Card titulo="Logins" valor={renderUsage?.LoginsUser} />
          <Card titulo="Challenges" valor={renderUsage?.NroChallenges} />
          <Card titulo="Missions" valor={renderUsage?.NroQuizzes} />
        </>
      )}
    </BoxHeaderCharts>
  );
};

export const Card = ({ titulo, valor, icon, units }) => {
  return (
    <BoxCard>
      {titulo === "Assigned" && <MdOutlineAssignment size={20} />}
      {titulo === "Created" && <GiStairsGoal size={20} />}
      {titulo === "Approved" && <MdOutlineAssignmentTurnedIn size={20} />}
      {titulo === "Challenges" && <GiTrophyCup size={20} />}
      {titulo === "Completed" && <GiTrophyCup size={20} />}
      {titulo === "Score" && <FaMedal size={20} />}
      {titulo === "Failed" && <TbFaceIdError size={20} />}
      {titulo === "Missions" && <FaGraduationCap size={20} />}
      {titulo === "Logins" && <BsDoorOpen size={20} />}
      {titulo === "# Users" && <HiOutlineUserGroup size={20} />}
      {icon === "question" && <FaGraduationCap size={20} />}
      {icon === "kpi" && <MdOutlineBarChart size={20} />}
      <Typography variant="body1" fontWeight={700}>
        {titulo}
      </Typography>
      <Typography variant="h6">
        {valor} {units === "Percentage" && "%"}
        {units === "Seconds" && "s"}
        {units === "Average" && "Avg"}
      </Typography>
      <Typography variant="h6"></Typography>
    </BoxCard>
  );
};

export default HeaderCharts;
