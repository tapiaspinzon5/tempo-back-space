import React, { useState} from "react";
import { Box } from "@mui/material";
import { styled} from "@mui/material/styles";
import { MultiAnswer } from "../components/Questions/MultiAnswer";
import { OneAnswer } from "../components/Questions/OneAnswer";
import { TrueFalse } from "../components/Questions/TrueFalse";
import data from "../components/Questions/data.json";
const ContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 5,
  height: "100%",
  width: "100%",
});

export const QuizView = () => {
  const [answer, setAnswer] = useState({});
  return (
    <div>
      <h1>Quiz</h1>
      <ContentBox>
        {data.data.map((el) =>
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
      </ContentBox>
    </div>
  );
};
