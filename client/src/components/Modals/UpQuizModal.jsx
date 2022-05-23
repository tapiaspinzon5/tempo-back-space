import React from "react";
import { Typography, Box, styled, Button } from "@mui/material";
import instructions from "../../assets/images/instructions.png";
import Quiz_template from "../../assets/filesTemplatesCSV/QuizTemplate.csv";
import OM_template from "../../assets/filesTemplatesCSV/OpsManagerTemplate.csv";
import RL_template from "../../assets/filesTemplatesCSV/ReportingTemplate.csv";
import SU_template from "../../assets/filesTemplatesCSV/SuperUserTemplate.csv";
import Kpi_template from "../../assets/filesTemplatesCSV/Load_Kpi_Template.csv";
import ExcelJS from "exceljs";

const MainModal = styled(Box)(() => ({
  minHeight: "50vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  textAlign: "center",

  h5: {
    fontWeight: 900,
    marginBottom: "2rem",
  },

  button: {
    textTransform: "none",
    color: "white",
    width: "177px",
    height: "61px",
    background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
  },
}));
const Su = () => {
  return (
    <>
      <Typography variant="h5" color="initial">
        Instructions to fill out the format for account creation for SUPER ADMIN
      </Typography>
      <Typography variant="body1" color="initial">
        Below you will find the instructions you must follow to complete the
        upload file for account creation. It is important that in each column
        you locate the values ​​given below as appropriate.
      </Typography>
      <Typography variant="body2" color="initial">
        <strong>IdentPM:</strong>Operations Manager CCMS ID (only numbers)
        <br />
        <strong>Campaign:</strong> Campaign or Account Name
        <br />
        <strong>KPI:</strong>acronym of the selected KPI (I.e.: %Abs, AHT, FCR,
        QACL)
        <br />
        <strong>Q1:</strong> Target for agents in quartile 1
        <br />
        <strong>Q2:</strong> Target for agents in quartile 2
        <br />
        <strong>Q3:</strong> Target for agents in quartile 3
        <br />
        <strong>Q4:</strong> Target for agents in quartile 4
        <br />
        <strong>CriticalPoint:</strong>minimum or critical value that the kPI
        can have.
        <br />
        <strong>OrderKpi:</strong> put the word "asc" in case higher score is
        better. or"dsc" in case lower score is better.
        <br /> <strong>TypeLoad:</strong> put the number "0" if the KPI load is
        manual or the number "1" if the KPI data comes automatically from Master
        Data .
      </Typography>
    </>
  );
};
const Om = () => {
  return (
    <>
      <Typography variant="h5" color="initial">
        Instructions to fill out the format for account creation for SUPER ADMIN
      </Typography>
      <Typography variant="body1" color="initial">
        Below you will find the instructions you must follow to complete the
        upload file for account creation. It is important that in each column
        you locate the values ​​given below as appropriate.
      </Typography>
      <Typography variant="body2" color="initial">
        Ident: CCMSID del usuario al cual se le va asignar un rol (Solo números)
        <br />
        RoleAgent: Rol que va a desempeñar el usuario. (Team Leader, Reporting
        Lead,QA Lead) <br />
        Team: Nombre del equipo al cual va a pertenecer
        <br /> Lob: Nombre de la "line of bussines"
      </Typography>
    </>
  );
};
const Rep = () => {
  return (
    <>
      <Typography variant="h5" color="initial">
        Instructions to fill out the Template for Agents Upload for Reporting
        Lead
      </Typography>
      <Typography variant="body1" color="initial">
        Bellow you Will find the instructions that you must follow to download
        and fill the Rep Lead Template
      </Typography>
      <Typography variant="body2" color="initial">
        <strong>Quartile:</strong>Agent’s quartile (Q1, Q2, Q3, Q4) <br />
        <strong>Ident:</strong> Agent’s CCMS ID (# Only)
        <br /> <strong>Team:</strong>Agent’s Team Name
        <br />
        <strong>RoleAgent:</strong> You must write the Word ‘Agent’
      </Typography>
    </>
  );
};

const Qa = () => {
  return (
    <>
      <Typography variant="h5" color="initial">
        Instructions for Downloading and Filling Out the Quizz Template
      </Typography>
      <Typography variant="body1" color="initial">
        Bellow you Will find the instructions that you must follow to download
        the Quizz Template
      </Typography>
      <Typography variant="body2" color="initial">
        <strong>Question:</strong> Field for writing the question header
        <br /> <strong>Option1:</strong> First Answer
        <br /> <strong>Option2:</strong> Seccond Answer <br />
        <strong>Option3:</strong> Third Answer (Leave the cell clear if you are
        using a true/false question) <br />
        <strong>Option4:</strong> Fourth Answer (Leave the cell clear if you are
        using a true/false question)
        <br /> <strong>Answer:</strong> Correct Answer (You must write it
        exactly like the correct answer)
        <br />
        <strong>Quartile:</strong> Agent’s quartile which you want to assign the
        question
        <br /> <strong>ExamName:</strong>Quiz Name
        <br /> <strong>DescriptionExam:</strong>Quiz description
        <br />
        <strong>ApprovalExam:</strong> Score for approval (Just # without %)
        <br />
        <strong>Topic:</strong> Category Name you want to assign to the quiz
      </Typography>
    </>
  );
};

const LoadKpis = () => {
  return (
    <>
      <Typography variant="h5" color="initial">
        Instructions For downloading and fillling out the Load KPI Template
      </Typography>
      <Typography variant="body1" color="initial">
        Bellow you Will find the instructions that you must follow to download
        the Load KPI Template
      </Typography>

      <Typography variant="body2" color="initial">
        <strong>Kpi:</strong> Cell for writing the KPI acronym
        <br /> <strong>unitKpi:</strong>KPI Measure Unit (Percentage, Seconds,
        Minutes, Avg)
        <br /> <strong>Type:</strong>Unit Type (1, 2, 4,5) <br />
        <br />
        Bellow you Will find the relationship between type and unitKpi:
        <br />
        <strong>1=</strong> Hours
        <br />
        <strong>2=</strong> Seconds
        <br />
        <strong>4=</strong>Avg
        <br />
        <strong>5=</strong>Percentage
        <br />
        <br />
        <strong>Idccms:</strong> Agent’s CCMSID (# Only)
        <br /> <strong>Date:</strong> Date of KPI score (Please use the format
        MM/DD/YYYY)
        <br /> <strong>Score:</strong> KPI SCORE (# Only)
      </Typography>
    </>
  );
};

const UpQuizModal = ({ handleClose, template, teams }) => {
  let dwounloadTemplate;
  switch (template) {
    case "Quiz Template":
      dwounloadTemplate = Quiz_template;
      break;
    case "OM Template":
      dwounloadTemplate = OM_template;
      break;
    case "Rep Lead Template":
      dwounloadTemplate = RL_template;
      break;
    case "Super User Template":
      dwounloadTemplate = SU_template;
      break;
    case "Load Kpi Template":
      dwounloadTemplate = Kpi_template;
      break;

    default:
      break;
  }

  //Funcion para descargar archivos locales
  const downloadFile = () => {
    var link = document.createElement("a");
    link.setAttribute("download", template);
    //link.href = Quiz_template;
    link.href = dwounloadTemplate;
    document.body.appendChild(link);
    link.click();
    link.remove();
    handleClose();
  };

  const downloadTeams = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("Created_Teams");
    await createdTeamsSheet(workbook);
    let fecha = new Date().toLocaleDateString();
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Created_Teams_${fecha}.xlsx`;
    a.click();
    a.remove();
  };
  const createdTeamsSheet = (workbook) => {
    const worksheet = workbook.getWorksheet("Created_Teams");
    worksheet.columns = [
      { header: "identTeamLeader", key: "identTeamLeader" },
      { header: "NameTeamLeader", key: "NameTeamLeader" },
      { header: "TeamName", key: "Team" },
    ];
    worksheet.addRows(teams);
  };
  return (
    <MainModal>
      <img src={instructions} alt="instructions" />
      <Box marginBottom={5}>
        {template === "Quiz Template" ? (
          <Qa />
        ) : template === "OM Template" ? (
          <Om />
        ) : template === "Rep Lead Template" ? (
          <Rep />
        ) : template === "Super User Template" ? (
          <Su />
        ) : template === "Load Kpi Template" ? (
          <LoadKpis />
        ) : (
          <Typography variant="body2" color="initial">
            We work
          </Typography>
        )}
      </Box>
      <Box>
        <Button sx={{ marginRight: "2rem" }} onClick={handleClose}>
          Return
        </Button>
        <Button sx={{ marginRight: "2rem" }} onClick={() => downloadFile()}>
          Download Template
        </Button>
        {template === "Rep Lead Template" && (
          <Button onClick={() => downloadTeams()}>Download Teams Info</Button>
        )}
      </Box>
    </MainModal>
  );
};

export default UpQuizModal;
