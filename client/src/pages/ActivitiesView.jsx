import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Grid, styled, Button } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import CardQuizManage from "../components/Quizes/CardQuizManage";
import { loadQuizesUser } from "../utils/api";

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

const BoxSelectBadge = styled(Grid)(() => ({
  button: {
    textTransform: "none",
    background: "#fff",
    margin: "5px",
    width: "9rem",
    fontWeight: "600",
    border: "1px solid #00000009",
  },

  margin: "2rem 0",
}));
const selectButton = {
  boxShadow: "0px 3px 6px #00000029",
  borderRadius: "10px",
  textTransform: "none",
};

const ActivitiesView = () => {
  const userData = useSelector((store) => store.loginUser.userData);

  const idccms = userData.idccms;

  const [quizUser, setQuizUser] = useState([]);
  const [activities, setActivities] = useState("Missions");

  useEffect(() => {
    const getData = async () => {
      const quizes = await loadQuizesUser(idccms);
      setQuizUser(quizes.data);
    };

    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid width="100%">
      <MainViewver>
        {/* <Header /> */}
        <Typography variant="h5" marginY={4} fontWeight="bold">
          Quiz management
        </Typography>

        <BoxSelectBadge item xs={12}>
          <Button
            sx={activities === "Missions" && selectButton}
            onClick={() => setActivities("Missions")}
          >
            Missions
          </Button>
          <Button
            sx={activities === "Challenges" && selectButton}
            onClick={() => setActivities("Challenges")}
          >
            {" "}
            Challenges{" "}
          </Button>
          <Button
            sx={activities === "Quizes" && selectButton}
            onClick={() => setActivities("Quizes")}
          >
            {" "}
            Quizes
          </Button>
          <Button
            sx={activities === "Activities" && selectButton}
            onClick={() => setActivities("Activities")}
          >
            {" "}
            Activities
          </Button>
        </BoxSelectBadge>

        <Grid container spacing={3}>
          {quizUser?.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={quiz.IdExamen}>
              <CardQuizManage
                stateActivity={quiz.EstadoExamen}
                image={quiz.image}
                nameQuiz={quiz.ExamName}
                idQuiz={quiz.IdExamen}
                progress={20}
                quizUser={quizUser}
                CantidadPreguntas={quiz.CantidadPreguntas}
                PreguntasRespondidas={quiz.PreguntasRespondidas}
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
