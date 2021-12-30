import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Button, Box } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import quizdesc from "../../assets/images/quizdesc.png";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import { indigo } from "@mui/material/colors";
import Footer from "../../components/Footer";

const MainDatailsQuiz = styled(Grid)(({ theme }) => ({
  width: "95%",
  margin: "20px",
}));

const QuizDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <MainDatailsQuiz container>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          bgcolor: "#E8E8E8",
          borderBottomLeftRadius: "20px",
          borderTopLeftRadius: "20px",
          marginTop: "20px",
          padding: "5rem",
          minHeight: "450px",
          height: "50vh",
        }}
      >
        <Typography variant="h3" color="initial" fontWeight={500}>
          Acquire new skills to strengthen your progress
        </Typography>
        <Typography variant="body1" color="initial">
          Learn to create, know and spread the knowledge acquired with the
          games, to make your progress grow.
        </Typography>
        <Button
          onClick={() => navigate("/quiz")}
          sx={{
            background: theme.palette.background.primary,
            color: "#FFFFFF",
            width: "240px",
            marginTop: "20px",
          }}
        >
          Start the test
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          bgcolor: "#E8E8E8",
          borderBottomRightRadius: "20px",
          borderTopRightRadius: "20px",
          marginTop: "20px",
          padding: "2rem",
          minHeight: "450px",
          height: "50vh",
        }}
      >
        <img
          src={quizdesc}
          alt="quiz description"
          width={"550"}
          height={"380"}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          bgcolor: "#F9F9F9",
          borderBottomLeftRadius: "20px",
          borderTopLeftRadius: "20px",
          padding: "3rem",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" color="initial" fontWeight="bold">
                Quiz details
              </Typography>
              <Typography variant="body1" color="initial">
                <AccessTimeRoundedIcon sx={{ color: indigo[500], mr: "5px" }} />
                Multiple answer
              </Typography>
              <Typography variant="body1" color="initial">
                <WarningAmberRoundedIcon
                  sx={{ color: indigo[500], mr: "5px" }}
                />
                Easy to apply tips
              </Typography>
              <Typography variant="body1" color="initial">
                <StorageRoundedIcon sx={{ color: indigo[500], mr: "5px" }} />
                Evaluation at the end
              </Typography>
              <Typography variant="body1" color="initial">
                <SignalCellularAltRoundedIcon
                  sx={{ color: indigo[500], mr: "5px" }}
                />
                Unlimited access
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" color="initial" fontWeight={600}>
                {" "}
                Quiz details
              </Typography>
              <Typography variant="body1" color="initial">
                <CheckCircleRoundedIcon color="success" sx={{ mr: "5px" }} />
                Multiple answer
              </Typography>
              <Typography variant="body1" color="initial">
                <CheckCircleRoundedIcon color="success" sx={{ mr: "5px" }} />
                Easy to apply tips
              </Typography>
              <Typography variant="body1" color="initial">
                <CheckCircleRoundedIcon color="success" sx={{ mr: "5px" }} />
                Evaluation at the end
              </Typography>
              <Typography variant="body1" color="initial">
                <CheckCircleRoundedIcon color="success" sx={{ mr: "5px" }} />
                Unlimited access
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          bgcolor: "#E8E8E8",
          borderBottomLeftRadius: "5px",
          borderTopLeftRadius: "5px",
          borderBottomRightRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "3rem",
        }}
      >
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
