import React from "react";
import { Typography, Grid, styled } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import CardQuizManage from "../components/Quizes/CardQuizManage";

const MainViewver = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "90vh",
  width: "100%",
  padding: "0 2rem 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const dataQuiz = [
  {
    id: 1,
    stateActivity: 1,
    image: "../image",
    nameQuiz: "Quiz N° 1",
    progress: 0,
  },
  {
    id: 2,
    stateActivity: 2,
    image: "../image",
    nameQuiz: "Quiz N° 2",
    progress: 23,
  },
  {
    id: 3,
    stateActivity: 3,
    image: "../image",
    nameQuiz: "Quiz N° 3",
    progress: 69,
  },
  {
    id: 4,
    stateActivity: 3,
    image: "../image",
    nameQuiz: "Quiz N° 4",
    progress: 90,
  },
  {
    id: 5,
    stateActivity: 1,
    image: "../image",
    nameQuiz: "Quiz N° 5",
    progress: 100,
  },
  {
    id: 6,
    stateActivity: 4,
    image: "../image",
    nameQuiz: "Quiz N° 6",
    progress: 1,
  },
  {
    id: 7,
    stateActivity: 4,
    image: "../image",
    nameQuiz: "Quiz N° 7",
    progress: 56,
  },
  {
    id: 8,
    stateActivity: 2,
    image: "../image",
    nameQuiz: "Quiz N° 8",
    progress: 22,
  },
];

const ActivitiesView = () => {
  return (
    <Grid width="100%">
      <MainViewver>
        <Header />
        <Typography variant="h5" marginY={4} fontWeight="bold">
          Quiz management
        </Typography>
        <Grid container spacing={3}>
          {dataQuiz.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={quiz.id}>
              <CardQuizManage
                stateActivity={quiz.stateActivity}
                image={quiz.image}
                nameQuiz={quiz.nameQuiz}
                progress={quiz.progress}
              />
            </Grid>
          ))}
        </Grid>
      </MainViewver>
      <Footer />
    </Grid>
  );
};

export default ActivitiesView;
