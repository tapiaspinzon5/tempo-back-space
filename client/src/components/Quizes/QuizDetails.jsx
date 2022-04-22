import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Grid, Button, Box } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import quizdesc from "../../assets/images/quizdesc.png";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import { indigo } from "@mui/material/colors";
import Header from "../homeUser/Header";
import quizDescIMG from "../../assets/temp-image/quizDesc.png";
import { FaDatabase, FaRegClock } from "react-icons/fa";
import Footer from "../Footer";
import { MainPage } from "../../assets/styled/muistyled";
//import Footer from "../../components/Footer";

const GridContent = styled(Grid)(({ theme }) => ({
  background: "#E8E8E8",
  borderBottomLeftRadius: "20px",
  // backgroundPosition: "center center",

  width: "100%",
  borderRadius: "20px",
  margin: "20px 0",
  minHeight: "40vh",
  display: "flex",
  justifyContent: "space-around",
  // img: {
  //   height: "90%",
  // },
}));

const QuizDetails = () => {
  const navigate = useNavigate();
  const paramsQuiz = useParams();
  const { idquiz, quizName } = paramsQuiz;

  return (
    <MainPage>
      <Box>
        <Header />
      </Box>
      <Grid container>
        <GridContent item xs={12}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            borderRadius={5}
            sx={{
              //padding: { xs: "0.1rem 3rem", xl: "5rem 0rem" },
              backgroundImage: `url(${quizDescIMG})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              width: "100%",
              padding: "2rem",
            }}
          >
            <Box marginY={3}>
              <Typography variant="h4" color="white" fontWeight={700}>
                {quizName}
              </Typography>
            </Box>
            <Button
              onClick={() => navigate(`/quiz/${idquiz}`)}
              sx={{
                background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
                color: "#FFFFFF",
                width: "240px",
                textTransform: "none",
                fontSize: "20px",
                borderRadius: "10px",
              }}
            >
              Start the test
            </Button>
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
                  Mission details
                </Typography>
                <Box display="flex" alignItems="center" mt={3}>
                  <WarningAmberRoundedIcon
                    sx={{ color: indigo[500], mr: "5px" }}
                  />
                  <Typography variant="body1" color="initial" fontSize="20px">
                    Multiple answer
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={3}>
                  <FaRegClock color={indigo[500]} />
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize="20px"
                    marginLeft="5px"
                  >
                    No time to replay
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={3}>
                  <FaDatabase color={indigo[500]} />
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize="20px"
                    marginLeft="5px"
                  >
                    Answer at the end
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={3}>
                  <SignalCellularAltRoundedIcon
                    sx={{ color: indigo[500], mr: "5px" }}
                  />
                  <Typography variant="body1" color="initial" fontSize="20px">
                    If you need help
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" color="initial" fontWeight={600}>
                  {" "}
                  Mission features
                </Typography>

                <Box display="flex" alignItems="center" mt={3}>
                  <CheckCircleRoundedIcon
                    sx={{ mr: "5px", color: "#00AF9B" }}
                  />
                  <Typography variant="body1" color="initial" fontSize="20px">
                    Multiple answer
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={3}>
                  <CheckCircleRoundedIcon
                    sx={{ mr: "5px", color: "#00AF9B" }}
                  />
                  <Typography variant="body1" color="initial" fontSize="20px">
                    True or False questions
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={3}>
                  <CheckCircleRoundedIcon
                    sx={{ mr: "5px", color: "#00AF9B" }}
                  />
                  <Typography variant="body1" color="initial" fontSize="20px">
                    Evaluation at the end
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={3}>
                  <CheckCircleRoundedIcon
                    sx={{ mr: "5px", color: "#00AF9B" }}
                  />
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
            With the right knowledge and tools, everyone can land their dream
            job. In this quiz you will learn to strengethen your knowledge and
            expand your skill.
          </Typography>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default QuizDetails;
