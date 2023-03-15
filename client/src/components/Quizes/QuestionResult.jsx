import { Box, styled, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import React from "react";

const Item = styled(Box)({
  background: "linear-gradient(#3047B0, #0087FF)",
  height: "2.3rem",
  width: "2.3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  p: {
    color: "#fff",
    fontWeight: "bold",
    padding: 0,
    margin: 0,
  },
});
const BoxAnswer = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "5px 0",
  padding: "5px",
  borderRadius: "10px",
});
const BoxCheck = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: "2rem",
  height: "2rem",
  border: "1px solid #3047B0",
});

const Check = styled(Box)({
  display: "flex",
  borderRadius: "50%",
  width: "1.42rem",
  height: "1.42rem",
  background: "linear-gradient(#3047B0, #0087FF)",
});

const failValidation = (
  respuesta,
  Answer1,
  Answer2,
  Answer3,
  Answer4,
  AnswerUser1,
  AnswerUser2,
  AnswerUser3,
  AnswerUser4
) => {
  let fail = false;
  if (respuesta === AnswerUser1 && AnswerUser1 !== Answer1) {
    fail = true;
  }
  if (respuesta === AnswerUser2 && AnswerUser2 !== Answer2) {
    fail = true;
  }
  if (respuesta === AnswerUser3 && AnswerUser3 !== Answer3) {
    fail = true;
  }
  if (respuesta === AnswerUser4 && AnswerUser4 !== Answer4) {
    fail = true;
  }
  return fail;
};

const QuestionResult = ({ question, index }) => {
  const {
    Respuesta1,
    Respuesta2,
    Respuesta3,
    Respuesta4,
    Answer,
    Answer1,
    Answer2,
    Answer3,
    Answer4,
    AnswerUser,
    AnswerUser1,
    AnswerUser2,
    AnswerUser3,
    AnswerUser4,
    TypeQuestionId,
  } = question;

  return (
    <Box mb={4}>
      <Box display="flex">
        <Item>
          <Typography variant="body1">{index}</Typography>
        </Item>
        <Box ml={3} flex={1}>
          <Typography variant="h6" color="initial" fontWeight={700}>
            {question.Pregunta}
          </Typography>
        </Box>
      </Box>
      {TypeQuestionId === 3
        ? [Respuesta1, Respuesta2, Respuesta3, Respuesta4].map(
            (respuesta, index) => (
              <Box
                key={index}
                sx={
                  failValidation(
                    respuesta,
                    Answer1,
                    Answer2,
                    Answer3,
                    Answer4,
                    AnswerUser1,
                    AnswerUser2,
                    AnswerUser3,
                    AnswerUser4
                  )
                    ? { background: "#FF0082", borderRadius: "10px" }
                    : {}
                }
              >
                <BoxAnswer
                  sx={
                    respuesta === Answer1 ||
                    respuesta === Answer2 ||
                    respuesta === Answer3 ||
                    respuesta === Answer4
                      ? { background: "#00AF9B" }
                      : {}
                  }
                >
                  <BoxCheck>
                    {respuesta === AnswerUser1 ||
                    respuesta === AnswerUser2 ||
                    respuesta === AnswerUser3 ||
                    respuesta === AnswerUser4 ? (
                      <Check />
                    ) : (
                      ""
                    )}
                  </BoxCheck>
                  <Box ml={3} flex={1}>
                    <Typography variant="body2" color="initial">
                      {respuesta}
                    </Typography>
                  </Box>
                </BoxAnswer>
              </Box>
            )
          )
        : [Respuesta1, Respuesta2, Respuesta3, Respuesta4].map(
            (respuesta, index) =>
              respuesta && (
                <Box
                  key={index}
                  sx={
                    respuesta === AnswerUser && AnswerUser !== Answer
                      ? { background: "#FF0082", borderRadius: "10px" }
                      : {}
                  }
                >
                  <BoxAnswer
                    sx={respuesta === Answer ? { background: "#00AF9B" } : {}}
                  >
                    <BoxCheck>{respuesta === AnswerUser && <Check />}</BoxCheck>
                    <Box ml={3} flex={1}>
                      <Typography variant="body2" color="initial">
                        {respuesta}
                      </Typography>
                    </Box>
                  </BoxAnswer>
                </Box>
              )
          )}
    </Box>
  );
};

export default QuestionResult;
