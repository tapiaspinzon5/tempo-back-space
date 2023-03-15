import { center } from "@antv/g2plot/lib/plots/sankey/sankey";
import { Box, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { BoxContain, MainPage } from "../../assets/styled/muistyled";
import Header from "../../components/homeUser/Header";
import QuestionResult from "../../components/Quizes/QuestionResult";

const BoxDetails = styled(Box)({
  display: "flex",
  minHeight: "5rem",
  justifyContent: "space-between",
  alignItems: "center",
  paddingY: "2rem",
});
const BoxTitle = styled(Box)({
  background: "linear-gradient(#3047B0, #0087FF)",
  height: "5rem",
  padding: "0 2rem",
  display: "flex",
  borderRadius: "10px",
  justifyContent: "center",
  alignItems: "center",
  p: {
    color: "#fff",
    fontWeight: "semibold",
    fontSize: "24px",
  },
});

const myQuiz = {
  PreguntasCorrectas: 1,
  TotalPreguntas: 2,
  Calificación: 50,
  EstadoExamen: "REPROBADO",
  IdExamen: 58,
  NombreExamen: "Mision Pruebas 07022023",
  DescriptionExam: "Mision Pruebas 07022023",
  UrlBadge:
    "https://firebasestorage.googleapis.com/v0/b/storage-296723/o/Gamification%2FbadgesImages%2F46%20-%20Testing%20badgeImage?alt=media&token=69a15bd3-b8f3-4f0b-a201-360c05298a8a",
  Respuestas: [
    {
      Pregunta: "Pregunta 1 Pruebas ",
      Respuesta1: "true",
      Respuesta2: "false",
      Answer: "false",
      AnswerUser: "true",
      Respuesta3: null,
      Respuesta4: null,
      Idpregunta: 1,
      TypeQuestionId: 2,
      TypeQuestion: "Verdadero / Falso",
    },
    {
      IdExamen: 58,

      Pregunta: "Pregunta 2 Pruebas",
      Respuesta1: "Respuesta 1",
      Respuesta2: "Respuesta 2",
      Respuesta3: "Respuesta 3",
      Respuesta4: "Respuesta 4",
      Answer: "Respuesta 1",
      AnswerUser: "Respuesta 3",
      Idpregunta: 5,
      TypeQuestionId: 1,
      TypeQuestion: "Unica Respuesta",
    },
    {
      Pregunta: "Como se sienten trabajando con nosotros ",
      Respuesta1: "Super",
      Respuesta2: "Bien",
      Respuesta3: "Excelente",
      Respuesta4: "DPM",
      Idpregunta: 1,
      Answer1: "Super",
      Answer2: "Excelente",
      Answer3: "DPM",
      AnswerUser1: "Excelente",
      AnswerUser2: "Super",
      AnswerUser3: "DPM",
      TypeQuestionId: 3,
      TypeQuestion: "Multiple Respuesta",
    },
    {
      Pregunta: "Que tal todo",
      Respuesta1: "super",
      Respuesta2: "bien",
      Respuesta3: "excelente",
      Respuesta4: "mejor",
      Answer: "excelente",
      AnswerUser: "excelente",
      Idpregunta: 5,
      TypeQuestionId: 1,
      TypeQuestion: "Unica Respuesta",
    },
    {
      Pregunta: "quedo todo super",
      Respuesta1: "true",
      Respuesta2: "false",
      Respuesta3: null,
      Respuesta4: null,
      Answer: "false",
      AnswerUser: "false",
      Idpregunta: 9,
      TypeQuestionId: 2,
      TypeQuestion: "Verdadero / Falso",
    },
  ],
};

const QuizResults = ({ count }) => {
  return (
    <MainPage>
      <Grid>
        <Header count={count} />
      </Grid>
      {/* contenido  */}
      <BoxContain margin="1rem 0">
        <BoxDetails>
          <Box display="flex" alignItems="center">
            <Box>
              <img
                src={myQuiz.UrlBadge}
                alt={myQuiz.NombreExamen}
                width={120}
              />
            </Box>
            <Box textAlign="left" ml={4}>
              <Typography variant="h6" fontWeight="bold">
                {myQuiz.NombreExamen}
              </Typography>
              <Typography align="left" variant="body1">
                {myQuiz.DescriptionExam}
              </Typography>
            </Box>
          </Box>
          <BoxTitle>
            <Typography variant="body1">Results</Typography>
          </BoxTitle>
        </BoxDetails>
        <Box display="flex" marginY={2} alignItems="center">
          <BoxTitle width="3rem">
            <Typography variant="body1" color="initial">
              {myQuiz.Calificación}%
            </Typography>
          </BoxTitle>
          <Box marginLeft={4}>
            <Typography variant="h6" fontWeight="bold">
              {myQuiz.PreguntasCorrectas} of {myQuiz.TotalPreguntas} correct
              answers
            </Typography>
          </Box>
        </Box>
        <Grid item xs={12}>
          {myQuiz.Respuestas.map((question, index) => (
            <QuestionResult key={index} index={index + 1} question={question} />
          ))}
        </Grid>
      </BoxContain>
    </MainPage>
  );
};

export default QuizResults;
