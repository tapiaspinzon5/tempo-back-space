import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MultiAnswer } from "../components/Questions/MultiAnswer";
import { OneAnswer } from "../components/Questions/OneAnswer";
import { TrueFalse } from "../components/Questions/TrueFalse";
import DB from "../components/Questions/data.json";

const ContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  //gridTemplateColumns: "3fr 1fr",
  height: "100%",
  width: "100%",
  marginTop: "15px",
});

export const QuizViewV2 = () => {
  const [answer, setAnswer] = useState({});
  const [data, setData] = useState(null);
  const [next, setNext] = useState(0);

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
        <Typography variant="h2">Titulo del Quiz</Typography>
        <Typography variant="p">Descripcion del quiz</Typography>
        {data &&
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {data && next + 1 < data.length && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {next !== 0 && <Button onClick={handleBack}>Back</Button>}
          {data && next + 1 === data.length && (
            <Button onClick={handleFin}>Finalizar</Button>
          )}
        </Box>
      </ContentBox>
    </div>
  );
};
