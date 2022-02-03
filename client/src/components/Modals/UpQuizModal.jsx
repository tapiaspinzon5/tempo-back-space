import React from "react";
import { Typography, Box, styled, Button } from "@mui/material";
import instructions from "../../assets/images/instructions.png";
import Quiz_template from "../../assets/filesTemplatesCSV/QuizTemplate.csv";
import OM_template from "../../assets/filesTemplatesCSV/OpsManagerTemplate.csv";
import RL_template from "../../assets/filesTemplatesCSV/ReportingTemplate.csv";
import SU_template from "../../assets/filesTemplatesCSV/SuperUserTemplate.csv";

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

const UpQuizModal = ({ handleClose, template }) => {
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

  return (
    <MainModal>
      <img src={instructions} alt="instructions" />
      <Box marginBottom={5}>
        <Typography variant="h5" color="initial">
          Instructions for downloading the {template}
        </Typography>
        <Typography variant="body1" color="initial">
          Below you will find the instructions that you must attend and carry
          out to download the {template}
        </Typography>
      </Box>
      <Box>
        <Button sx={{ marginRight: "2rem" }} onClick={handleClose}>
          Return
        </Button>
        <Button onClick={() => downloadFile()}>Download</Button>
      </Box>
    </MainModal>
  );
};

export default UpQuizModal;
