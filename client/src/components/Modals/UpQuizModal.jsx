import React from "react";
import { Typography, Box, styled, Button } from "@mui/material";
import instructions from "../../assets/images/instructions.png";
import Quiz_template from "../../assets/filesTemplatesCSV/Quiz_template.csv";

const MainModal = styled(Box)(() => ({
  height: "50vh",
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

const UpQuizModal = ({ handleClose }) => {
  //Funcion para descargar archivos locales
  const downloadFile = () => {
    var link = document.createElement("a");
    link.setAttribute("download", "Quiz_Template");
    link.href = Quiz_template;
    document.body.appendChild(link);
    link.click();
    link.remove();
    handleClose();
  };

  return (
    <MainModal>
      <img src={instructions} alt="instructions" />
      <Box>
        <Typography variant="h5" color="initial">
          Instructions for downloading the quiz template
        </Typography>
        <Typography variant="body1" color="initial">
          Below you will find the instructions that you must attend and carry
          out to download the quizzes template
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
