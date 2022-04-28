import { Box, InputAdornment, Typography } from "@mui/material";
import React from "react";
import { InputText } from "../../assets/styled/muistyled";

const TreuFalseQuestion = ({ steep }) => {
  return (
    <Box marginY={1} color="#3047B0">
      <form>
        <Typography variant="h6">{steep}. Question</Typography>
        <InputText
          name="question"
          label="Question"
          variant="outlined"
          fullWidth
          //onChange={handleQuizSetup}
          //value={dataQuiz.quizName}
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
