import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Button, Grid } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { MultiAnswer } from "../components/Questions/MultiAnswer";
import { OneAnswer } from "../components/Questions/OneAnswer";
import { TrueFalse } from "../components/Questions/TrueFalse";
import DB from "../components/Questions/data.json";
import Footer from "../components/Footer";
import { getExam } from "../utils/api";

const ContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
});

export const QuizViewV2 = () => {
  const paramsQuiz = useParams();
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.idccms;
  const { idquiz } = paramsQuiz;
  const [quiz, setQuiz] = useState([]);
  const [answer, setAnswer] = useState({});
  const [data, setData] = useState(null);
  const [next, setNext] = useState(0);
  const theme = useTheme();

  console.log(idquiz);

  useEffect(() => {
    const getData = async () => {
      const quiz = await getExam(idccms, idquiz);
      setQuiz(quiz.data);
    };

    getData();
  }, []);

  useEffect(() => {
    setData(DB.data);
    setAnswer(() => {
      const d = {};
      DB.data.forEach((el) => {
        el.type !== "MA"
          ? (d[el.id] = "")
          : (d[el.id] = { OA: "", OB: "", OC: "", OD: "" });
      });
      return d;
    });
  }, []);
  //console.log(data[next]);
  const handleNext = () => {
    setNext(next + 1);
  };
  const handleBack = () => {
    setNext(next - 1);
  };

  const handleFin = () => {
    //submit the answers
  };

  return (
    <div>
      <ContentBox>
        <Grid sx={{ padding: "1rem" }}>
          <Typography variant="h3" sx={{ width: "70vh" }} fontWeight={500}>
            Acquire new skills to strengthen your progress
          </Typography>
          <Typography
            sx={{ width: "70vh" }}
            mt={4}
            fontWeight={500}
            fontSize="20px"
          >
            Learn to create, know and spread the knowledge acquired with the
            games, to make your progress grow.
          </Typography>
        </Grid>
        {/* {data &&
          [data[next]].map((el) =>
            el.type === "TF" ? (
              <TrueFalse
                key={el.id}
                el={el}
                answer={answer}
                setAnswer={setAnswer}
              />
            ) : el.type === "OA" ? (
              <OneAnswer
                key={el.id}
                el={el}
                answer={answer}
                setAnswer={setAnswer}
              />
            ) : (
              <MultiAnswer
                key={el.id}
                el={el}
                answer={answer}
                setAnswer={setAnswer}
              />
            )
          )}
        <Box
          sx={{
            margin: "0 15px 0 15px",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "#E8E8E8",
            padding: "0 2rem 2rem 0",
          }}
        >
          {data && next + 1 < data.length && (
            <Button
              onClick={handleNext}
              sx={{
                background: theme.palette.background.primary,
                color: "#FFFFFF",
                margin: "10px",
                width: "160px",
              }}
            >
              Next
            </Button>
          )}
          {next !== 0 && (
            <Button
              onClick={handleBack}
              sx={{
                background: theme.palette.background.primary,
                color: "#FFFFFF",
                margin: "10px",
                width: "160px",
              }}
            >
              Back
            </Button>
          )}
          {data && next + 1 === data.length && (
            <Button
              onClick={handleFin}
              sx={{
                background: theme.palette.background.primary,
                color: "#FFFFFF",
                margin: "10px",
                width: "160px",
              }}
            >
              Finalizar
            </Button>
          )}
        </Box> */}
        <Footer />
      </ContentBox>
    </div>
  );
};
