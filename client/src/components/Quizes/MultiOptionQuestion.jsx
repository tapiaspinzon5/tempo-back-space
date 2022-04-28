import React from "react";
import { InputText } from "../../assets/styled/muistyled";
import Typography from "@mui/material/Typography";
import { InputAdornment } from "@mui/material";
import { Box } from "@mui/system";

const MultiOptionQuestion = ({ question, setQuestion, steep }) => {
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
          //onChange={handleQuizSetup}
          //value={dataQuiz.quizName}
          required
        />

        <Typography variant="h6" color="initial">
          Answer
        </Typography>

        {[1, 2, 3, 4].map((q) => (
          <InputText
            key={q}
            fullWidth
            name="Answer1"
            label={`Answer ${q}`}
            variant="outlined"
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

export default MultiOptionQuestion;
