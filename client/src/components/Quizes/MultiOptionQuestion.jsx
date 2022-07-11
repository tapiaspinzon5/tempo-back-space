import React, { useEffect, useState } from "react";
import { InputText } from "../../assets/styled/muistyled";
import Typography from "@mui/material/Typography";
import { InputAdornment } from "@mui/material";
import { Box } from "@mui/system";

const MultiOptionQuestion = ({
  ask,
  setAsk,
  steep,
  empty,
  question,
  setEdit,
}) => {
  const pregunta = question[steep];
  const [msj, setMsj] = useState("");
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
      setMsj(``);
    }
  };

  return (
    <Box marginY={1}>
      <form>
        <Typography variant="h6" color="initial">
          {steep}. Question
        </Typography>
        <InputText
          sx={{
            whiteSpace: "pre-line",
          }}
          name="question"
          label="Question"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          value={ask.ask || ""}
          onChange={handleQuestion}
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

        <Typography variant="h6" color="initial">
          Answer
        </Typography>
        {!ask.answer && empty && (
          <Typography variant="caption" color="red">
            Choose an answer!
          </Typography>
        )}

        {[1, 2, 3, 4].map((q) => (
          <InputText
            key={q}
            fullWidth
            name="Answer1"
            label={`Answer ${q}`}
            variant="outlined"
            onChange={(e) => setAsk({ ...ask, [q]: e.target.value })}
            value={ask[q] || ""}
            required
            size="small"
            sx={{ marginTop: ".5rem" }}
            error={!ask[q] && empty}
            helperText={!ask[q] && empty ? "Field Requiered" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <input
                    type="radio"
                    style={{ height: "1.5rem", width: "1.5rem" }}
                    id="answer"
                    name="answer"
                    value={ask[q]}
                    //checked={ask[q] === ask.answer ? true : false}
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

export default MultiOptionQuestion;
