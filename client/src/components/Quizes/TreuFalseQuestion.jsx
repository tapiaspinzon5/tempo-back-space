import React, { useEffect, useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";
import { InputText } from "../../assets/styled/muistyled";

const TreuFalseQuestion = ({
  steep,
  ask,
  setAsk,
  empty,
  question,
  setEdit,
}) => {
  const [msj, setMsj] = useState("");
  const pregunta = question[steep];
  useEffect(() => {
    if (pregunta) {
      setAsk(pregunta[0]);
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [steep]);

  const handleQuestion = (e) => {
    if (e.target.value.length <= 5000) {
      setAsk({ ...ask, ask: e.target.value });

      setMsj(`${e.target.value.length} / 5000`);
    } else {
      setMsj("Te has pasado ");
    }
  };

  return (
    <Box marginY={1} color="#3047B0">
      <form>
        <Typography variant="h6">{steep}. Question</Typography>
        <InputText
          name="question"
          label="Question"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          onChange={handleQuestion}
          value={ask.ask || pregunta?.ask || ""}
          required
          error={!ask.ask && empty}
          helperText={
            !ask.ask && empty ? (
              "Field Requiered"
            ) : (
              <p style={{ color: "#3047B0", textAlign: "end", margin: "2px" }}>
                {msj}
              </p>
            )
          }
        />

        <Typography variant="h6">Answer</Typography>
        {!ask.answer && empty && (
          <Typography variant="caption" color="red">
            Choose an answer!
          </Typography>
        )}

        {["true", "false"].map((q) => (
          <InputText
            key={q}
            fullWidth
            name={q.toUpperCase()}
            label={q}
            variant="outlined"
            disabled
            required
            sx={{ marginTop: ".5rem" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <input
                    type="radio"
                    style={{ height: "1.5rem", width: "1.5rem" }}
                    id="answer"
                    name="answer"
                    value={q || pregunta.answer}
                    checked={q === ask.answer ? true : false}
                    onChange={(e) => setAsk({ ...ask, answer: e.target.value })}
                  />
                </InputAdornment>
              ),
            }}
          />
        ))}
      </form>
    </Box>
  );
};

export default TreuFalseQuestion;
