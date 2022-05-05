import React from "react";
import { InputText } from "../../assets/styled/muistyled";
import Typography from "@mui/material/Typography";
import { InputAdornment } from "@mui/material";
import { Box } from "@mui/system";

const MultiOptionQuestion = ({ ask, setAsk, steep }) => {
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
          onChange={(e) => setAsk({ ...ask, ask: e.target.value })}
          value={ask.ask}
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
            onChange={(e) => setAsk({ ...ask, [q]: e.target.value })}
            value={ask[q] || ""}
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
                    value={ask[q]}
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
