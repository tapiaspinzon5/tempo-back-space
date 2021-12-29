import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, styled, Button, Box } from "@mui/material";
import quizdesc from "../../assets/images/quizdesc.png";

const MainDatailsQuiz = styled(Grid)(({ theme }) => ({
  width: "100%",
}));

const QuizDetails = () => {
  const navigate = useNavigate();
  return (
    <MainDatailsQuiz container>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" color="initial" fontWeight={500}>
          Acquire new skills to strengthen your progress
        </Typography>
        <Typography variant="body1" color="initial">
          Learn to create, know and spread the knowledge acquired with the
          games, to make your progress grow.
        </Typography>
        <Button onClick={() => navigate("/quiz")}>Start the test</Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <img src={quizdesc} alt="quiz description" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" color="initial" fontWeight="bold">
                Quiz details
              </Typography>
              <Typography variant="body1" color="initial">
                Multiple answer
              </Typography>
              <Typography variant="body1" color="initial">
                Easy to apply tips
              </Typography>
              <Typography variant="body1" color="initial">
                Evaluation at the end
              </Typography>
              <Typography variant="body1" color="initial">
                Unlimited access
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" color="initial" fontWeight={500}>
                {" "}
                Quiz details
              </Typography>
              <Typography variant="body1" color="initial">
                Multiple answer
              </Typography>
              <Typography variant="body1" color="initial">
                Easy to apply tips
              </Typography>
              <Typography variant="body1" color="initial">
                Evaluation at the end
              </Typography>
              <Typography variant="body1" color="initial">
                Unlimited access
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" color="initial" fontWeight={500}>
          About this course
        </Typography>
        <Typography variant="body1" color="initial">
          With the right knowledge and tools, everyone can land their dream job.
          In this quiz you will learn to strengethen your knowledge and expand
          your skill.
        </Typography>
      </Grid>
    </MainDatailsQuiz>
  );
};

export default QuizDetails;
