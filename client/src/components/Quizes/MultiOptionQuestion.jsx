import React, { useEffect } from "react";
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
  useEffect(() => {
    console.log(pregunta);
    console.log(steep);
    console.log(ask);
    if (pregunta) {
      console.log("existe pregunta ");
      setAsk(pregunta[0]);
      setEdit(true);
    } else {
      console.log("preunta nueva");
      setEdit(false);
    }
  }, [steep]);

  return (
    <Box marginY={1}>
      <form>
        <Typography variant="h6" color="initial">
          {steep}. Question
        </Typography>
        <InputText
          name="question"
          label="Question"
          variant="outlined"
          fullWidth
          value={ask.ask || ""}
          onChange={(e) => setAsk({ ...ask, ask: e.target.value })}
          required
          error={!ask.ask && empty}
          helperText={!ask.ask && empty ? "Field Requiered" : ""}
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
