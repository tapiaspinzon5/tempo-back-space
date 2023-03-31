import { center } from "@antv/g2plot/lib/plots/sankey/sankey";
import { Box, Grid, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { BoxContain, MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
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

const QuizResults = ({ count }) => {
  const navigate = useNavigate();
  const myQuiz = useSelector((store) => store.quizResult.myQuiz);
  return (
    <MainPage sx={{ height: { xl: "80vh" } }}>
      <Grid>
        <Header count={count} />
        {/* contenido  */}
        <BoxContain margin="2rem 0">
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
            <BoxTitle
              sx={
                myQuiz.EstadoExamen === "APROBADO"
                  ? { background: "linear-gradient(#3047B0, #0087FF)" }
                  : {
                      background: "linear-gradient(#FF0082, #780096)",
                    }
              }
            >
              <Typography
                variant="body1"
                sx={{
                  textTransform: "uppercase",
                }}
              >
                {myQuiz.EstadoExamen === "APROBADO" ? "Approved" : "Failed"}
              </Typography>
            </BoxTitle>
          </BoxDetails>
          <Box display="flex" marginY={2} alignItems="center">
            <BoxTitle
              width="3rem"
              sx={{
                background: "linear-gradient(#3047B0, #0087FF)",
              }}
            >
              <Typography variant="body1" color="initial">
                {myQuiz?.Calificación?.toFixed(1)}%
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
              <QuestionResult
                key={index}
                index={index + 1}
                question={question}
              />
            ))}
          </Grid>
        </BoxContain>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default QuizResults;
