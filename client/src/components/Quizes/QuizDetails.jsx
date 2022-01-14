import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Grid, Button, Box, Hidden } from "@mui/material";
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
const GridContent = styled(Grid)(({ theme }) => ({
  background: "#E8E8E8",
  borderBottomLeftRadius: "20px",
  borderRadius: "20px",
  marginBottom: "20px",
  height: "50vh",
  display: "flex",
  justifyContent: "space-around",
  img: {
    height: "90%",
  },
}));

const QuizDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const paramsQuiz = useParams();
  const { idquiz, stateActivity } = paramsQuiz;
  console.log(idquiz);
  return (
    <MainDatailsQuiz container>
      <GridContent item xs={12}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          sx={{ padding: { xs: "0.1rem 3rem", xl: "5rem 0rem" } }}
        >
          <Typography variant="h4" color="initial" fontWeight={500}>
            Acquire new skills to strengthen your progress
          </Typography>
          <Typography variant="body1" color="initial" fontSize={20}>
            Learn to create, know and spread the knowledge acquired with the
            games, to make your progress grow.
          </Typography>
          <Button
            onClick={() => navigate(`/quiz/${idquiz}`)}
            sx={{
              background: theme.palette.background.primary,
              color: "#FFFFFF",
              width: "240px",
              textTransform: "none",
              fontSize: "20px",
            }}
          >
            Start the test
          </Button>
        </Box>
        <Box
          component="div"
          sx={{ padding: "0.5rem", display: { xs: "none", lg: "block" } }}
        >
          <img src={quizdesc} alt="quiz description" />
        </Box>
      </GridContent>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          bgcolor: "#F9F9F9",
          borderBottomLeftRadius: "20px",
          borderTopLeftRadius: "20px",
          padding: "2rem 3rem",
          minHeight: "35vh",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" color="initial" fontWeight="bold">
                Quiz details
              </Typography>
              <Box display="flex" alignItems="center" mt={3}>
                <WarningAmberRoundedIcon
                  sx={{ color: indigo[500], mr: "5px" }}
                />
                <Typography variant="body1" color="initial" fontSize="20px">
                  Easy to apply tips
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={3}>
                <StorageRoundedIcon sx={{ color: indigo[500], mr: "5px" }} />
                <Typography variant="body1" color="initial" fontSize="20px">
                  Evaluation at the end
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={3}>
                <SignalCellularAltRoundedIcon
                  sx={{ color: indigo[500], mr: "5px" }}
                />
                <Typography variant="body1" color="initial" fontSize="20px">
                  Unlimited access
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" color="initial" fontWeight={600}>
                {" "}
                Quiz details
              </Typography>
              {/* <Box display="flex" alignItems="center" mt={3}>
                <CheckCircleRoundedIcon sx={{ mr: "5px", color: "#00AF9B" }} />
                <Typography variant="body1" color="initial" fontSize="20px">
                  Multiple answer
                </Typography>
              </Box> */}
              <Box display="flex" alignItems="center" mt={3}>
                <CheckCircleRoundedIcon sx={{ mr: "5px", color: "#00AF9B" }} />
                <Typography variant="body1" color="initial" fontSize="20px">
                  Easy to apply tips
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={3}>
                <CheckCircleRoundedIcon sx={{ mr: "5px", color: "#00AF9B" }} />
                <Typography variant="body1" color="initial" fontSize="20px">
                  Evaluation at the end
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={3}>
                <CheckCircleRoundedIcon sx={{ mr: "5px", color: "#00AF9B" }} />
                <Typography variant="body1" color="initial" fontSize="20px">
                  Unlimited access
                </Typography>
              </Box>
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
        <Typography variant="h4" color="initial" fontWeight={500}>
          About this course
        </Typography>
        <Typography variant="body1" color="initial" fontSize={20} mt={4}>
          With the right knowledge and tools, everyone can land their dream job.
          In this quiz you will learn to strengethen your knowledge and expand
          your skill.
        </Typography>
      </Grid>
    </MainDatailsQuiz>
  );
};

export default QuizDetails;
