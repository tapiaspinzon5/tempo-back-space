import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import Header from "../components/homeUser/Header";
import CardQuizDesc from "../components/Quizes/CardQuizDesc";
import UploadQuiz from "../components/Quizes/UploadQuiz";
import Footer from "../components/Footer";
import { loadQuizes } from "../utils/api";

const MainUpQuiz = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "90vh",
  width: "100%",
  padding: "0 2rem 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const UpQuiz = () => {
  const userData = useSelector((store) => store.loginUser.userData);

  const idccms = userData.idccms;

  const [misQuizes, setMisQuizes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const quizes = await loadQuizes(idccms);
      setMisQuizes(quizes.data);
    };

    getData();
  }, []);

  console.log(misQuizes);
  return (
    <Grid width="100%">
      <MainUpQuiz>
        <Typography variant="h5" fontWeight="bold" mt={4}>
          Acquire new skills to strengthen your progress
        </Typography>
        <Typography variant="body1" mt={2}>
          Acquire new skills to strengthen your progress
        </Typography>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <UploadQuiz idccms={idccms} />
          </Grid>
          {misQuizes?.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={quiz.IdExamen}>
              <CardQuizDesc quiz={quiz} />
            </Grid>
          ))}
        </Grid>
      </MainUpQuiz>
      <Footer />
    </Grid>
  );
};

export default UpQuiz;
