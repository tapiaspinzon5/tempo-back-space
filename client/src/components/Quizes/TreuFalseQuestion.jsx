import { Box, InputAdornment, Typography } from "@mui/material";
import React from "react";
import { InputText } from "../../assets/styled/muistyled";

const TreuFalseQuestion = ({ steep, ask, setAsk }) => {
  return (
    <Box marginY={1} color="#3047B0">
      <form>
        <Typography variant="h6">{steep}. Question</Typography>
        <InputText
          name="question"
          label="Question"
          variant="outlined"
          fullWidth
          onChange={(e) => setAsk({ ...ask, ask: e.target.value })}
          value={ask.ask || ""}
          required
        />

        <Typography variant="h6">Answer</Typography>

        {["True", "False"].map((q) => (
          <InputText
            key={q}
            fullWidth
            name={q}
            label={q}
            variant="outlined"
            disabled
            //onChange={handleQuizSetup}
            //value={dataQuiz.quizName}
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
                    value={q}
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
