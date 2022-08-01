import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Grid, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Header from "../homeUser/Header";
import quizDescIMG from "../../assets/temp-image/quizDesc.png";
import Footer from "../Footer";
import { MainPage } from "../../assets/styled/muistyled";
import { useCountdown } from "../../Hooks/useCountdown";
import { getExam } from "../../utils/api";
import epicoins from "../../assets/Icons/epicoin-ico.svg";
import xpIco from "../../assets/Icons/start-icon.svg";

const GridContent = styled(Grid)(({ theme }) => ({
  background: "#E8E8E8",
  borderBottomLeftRadius: "20px",
  width: "100%",
  borderRadius: "20px",
  margin: "20px 0",
  minHeight: "40vh",
  display: "flex",
  justifyContent: "space-around",
}));

const QuizDetails = () => {
  const navigate = useNavigate();
  const paramsQuiz = useParams();
  const { idquiz, quizName } = paramsQuiz;
  const [mission, setMission] = useState([]);
  const {
    InitialDate,
    FinalDate,
    DescriptionImage,
    UrlBadge,
    Epicoins,
    ExPoint,
  } = mission;
  const [days, hours, minutes, seconds] = useCountdown(InitialDate, FinalDate);

  useEffect(() => {
    const getData = async () => {
      const quiz = await getExam(idquiz);
      setMission(quiz.data[0]);
    };

    getData();
    // eslint-disable-next-line
  }, []);

 
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
              backgroundImage: `url(${DescriptionImage || quizDescIMG})`,
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
              <Box marginRight={3}>
                <Typography
                  variant="h6"
                  color="initial"
                  fontWeight="bold"
                  marginBottom={1}
                >
                  Mission details
                </Typography>

                <Typography variant="body1" color="initial" marginBottom={1}>
                  You were assigned with the mission of completing the next
                  Quiz.
                </Typography>
                <Typography variant="body1" color="initial" marginBottom={1}>
                  Remember you have limited time to complete it:
                </Typography>

                <Typography
                  variant="body1"
                  color="#3047b0"
                  mt={3}
                  fontSize={20}
                >
                  {days}D-{hours}h:{minutes}m:{seconds}s
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h6"
                  color="initial"
                  fontWeight={600}
                  marginBottom={1}
                >
                  Mission features
                </Typography>

                <Typography variant="body1" color="initial">
                  In this quiz you will find TWO types of questions:
                </Typography>

                <Box display="flex" alignItems="center" mt={3}>
                  <CheckCircleRoundedIcon
                    sx={{ mr: "5px", color: "#00AF9B" }}
                  />
                  <Typography variant="body1" color="initial">
                    Multiple answer
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1}>
                  <CheckCircleRoundedIcon
                    sx={{ mr: "5px", color: "#00AF9B" }}
                  />
                  <Typography variant="body1" color="initial">
                    True or False questions
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
          <Box display="flex">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              paddingRight={2}
            >
              <img src={UrlBadge} alt="badge image" width={180} />
              <Box display="flex" marginTop={2} sx={{ color: "#3047b0" }}>
                <Box marginRight="1rem">
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      marginRight="5px"
                    >
                      {ExPoint || 0}
                    </Typography>
                    <img src={xpIco} alt="" height={25} />
                  </Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    textAlign="center"
                  >
                    XP
                  </Typography>
                </Box>
                <Box>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      marginRight="5px"
                    >
                      {Epicoins || 0}
                    </Typography>
                    <img src={epicoins} alt="" height={25} />
                  </Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    textAlign="center"
                  >
                    Epicoins
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography variant="body1" color="initial" marginBottom={2}>
                {" "}
                Get a "Mercury", a "Venus" or an "Earth".
              </Typography>
              <Typography variant="body2" color="initial" marginBottom={2}>
                <b>
                  "Good, Better, Best. Never let it rest. until your good is
                  better and your better is best".{" "}
                </b>{" "}
                <br />- Tim Duncan.
              </Typography>
              <Typography variant="body2" color="initial" marginBottom={2}>
                If you approve it, you will earn some prizes and you´ll also
                contribute whith tour team goals.
              </Typography>
              <Typography variant="body2" color="initial" marginBottom={2}>
                <b>Many successes!</b>{" "}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default QuizDetails;
