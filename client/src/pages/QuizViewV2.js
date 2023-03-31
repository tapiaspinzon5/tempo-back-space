import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { OneAnswer } from "../components/Questions/OneAnswer";
import { TrueFalse } from "../components/Questions/TrueFalse";
import Footer from "../components/Footer";
import { getExam } from "../utils/api";
import { uploadAnswers } from "../utils/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import bgmodal from "../assets/images/background_modal_quiz.png";
import { MultiAnswer } from "../components/Questions/MultiAnswer";
import { getQuizResultAction } from "../redux/quizResultDuck";

const ContentBox = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
});
const GridHead = styled(Grid)({
  minHeight: "5rem",
  backgroundColor: "#e8e8e8",
  margin: "2rem 1rem",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const MySwal = withReactContent(Swal);
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const QuizViewV2 = ({ setNavView }) => {
  const dispatch = useDispatch();
  const paramsQuiz = useParams();
  const navigate = useNavigate();
  const { idquiz } = paramsQuiz;
  const [quiz, setQuiz] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [badgeImg, setBadgeImg] = useState(null);
  const [next, setNext] = useState(0);

  useEffect(() => {
    window.history.replaceState(null, "", "homeusers");
    const getData = async () => {
      const quiz = await getExam(idquiz);
      let obj;
      quiz.data.map((q) => {
        if (q.TypeQuestion === "Multiple Respuesta") {
          obj = { ...obj, [q.Idpregunta]: { OA: "", OB: "", OC: "", OD: "" } };
          return q.Idpregunta;
        } else {
          obj = { ...obj, [q.Idpregunta]: "" };
          return q.Idpregunta;
        }
      });
      setAnswer(obj);
      setQuiz(quiz.data);
      setBadgeImg(quiz.data[0].UrlBadge);
    };

    getData();
    // eslint-disable-next-line
  }, []);

  const handleNext = () => {
    //validar que las preguntas de multiple respuesta tengan almenos dos respuestas
    if (answer[quiz[next].Idpregunta]) {
      setNext(next + 1);
    } else {
      Toast.fire({
        icon: "warning",
        title: "Check your Answer",
      });
    }
  };
  const handleBack = () => {
    setNext(next - 1);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (answer[quiz[next].Idpregunta]) {
      //submit the answers
      const data = () => {
        const table = [];
        for (let key in answer) {
          if (typeof answer[key] === "object") {
            table.push([
              `${answer[key].OA}${answer[key].OB}${answer[key].OC}${answer[key].OD}`,
              parseInt(key),
            ]);
          } else {
            table.push([answer[key], parseInt(key)]);
          }
        }

        return table;
      };
      const resp = await uploadAnswers(data(), idquiz);
      if (resp.status === 200) {
        console.log(resp.data);
        dispatch(getQuizResultAction(resp.data[0]));
        navigate(`/quizresults/${idquiz}`, { replace: true });
      }
    } else {
      Toast.fire({
        icon: "warning",
        title: "Check your Answer",
      });
    }
  };

  return (
    <ContentBox>
      <GridHead sx={{ padding: "1rem" }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {quiz[0]?.NombreExamen || <Skeleton animation="wave" />}
          </Typography>
          <Typography variant="body1" color="initial">
            {quiz[0]?.DescriptionExam || <Skeleton animation="wave" />}
          </Typography>
        </Box>
        <Box>
          <img src={badgeImg || ""} alt="" height={100} />
        </Box>
      </GridHead>

      {quiz.length > 0 &&
        (quiz[next].TypeQuestion === "Verdadero / Falso" ? (
          <TrueFalse
            question={quiz[next]}
            answer={answer}
            setAnswer={setAnswer}
          />
        ) : quiz[next].TypeQuestion === "Unica Respuesta" ? (
          <OneAnswer
            question={quiz[next]}
            answer={answer}
            setAnswer={setAnswer}
          />
        ) : (
          <MultiAnswer
            question={quiz[next]}
            answer={answer}
            setAnswer={setAnswer}
          />
        ))}

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
        {next !== 0 && (
          <Button
            onClick={handleBack}
            sx={{
              background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
              color: "#FFFFFF",
              margin: "10px",
              width: "160px",
              borderRadius: "10px",
            }}
          >
            Back
          </Button>
        )}
        {quiz && next + 1 < quiz.length && (
          <Button
            onClick={handleNext}
            sx={{
              background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
              borderRadius: "10px",
              color: "#FFFFFF",
              margin: "10px",
              width: "160px",
            }}
          >
            Next
          </Button>
        )}
        {quiz && next + 1 === quiz.length && (
          <Button
            onClick={handleSend}
            sx={{
              background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
              borderRadius: "10px",
              color: "#FFFFFF",
              margin: "10px",
              width: "160px",
            }}
          >
            Send Quiz
          </Button>
        )}
      </Box>
      <Footer />
    </ContentBox>
  );
};
