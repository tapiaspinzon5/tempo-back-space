import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  ButtonAction,
  ButtonActionBlue,
  InputText,
} from "../../assets/styled/muistyled";
import {
  Button,
  ButtonBase,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const FormSetupQuiz = ({
  handleQuizSetup,
  fileName,
  dataQuiz,
  topics,
  empty,
}) => {
  const [disabled, setDisabled] = useState(false);
  const { quizCategory, quizDescription, quizName, quizQuestions, quizTarget } =
    dataQuiz;
  useEffect(() => {
    if (fileName) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [fileName]);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "97%" },
      }}
      noValidate
      autoComplete="off"
    >
      <InputText
        name="quizName"
        label="Mission Name"
        variant="outlined"
        onChange={handleQuizSetup}
        value={quizName}
        disabled={disabled}
        required
        error={!quizName && empty}
        helperText={!quizName && empty ? "Field Requiered" : ""}
      />
      <InputText
        name="quizDescription"
        label="Description"
        variant="outlined"
        onChange={handleQuizSetup}
        value={quizDescription}
        disabled={disabled}
        required
        error={!quizDescription && empty}
        helperText={!quizDescription && empty ? "Field Requiered" : ""}
      />
      <FormControl fullWidth error={!quizCategory && empty}>
        <InputLabel id="quizCategory-label">Category</InputLabel>
        <Select
          labelId="quizCategory-label"
          name="quizCategory"
          value={quizCategory || ""}
          label="Category"
          onChange={handleQuizSetup}
          disabled={disabled}
          required
        >
          {topics.map((cat, index) => (
            <MenuItem value={cat} key={index}>
              {cat}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText color="red">
          {!quizCategory && empty ? "Field Requiered" : ""}
        </FormHelperText>
      </FormControl>
      <InputText
        name="quizTarget"
        label="Target"
        variant="outlined"
        type="number"
        onChange={handleQuizSetup}
        value={quizTarget}
        disabled={disabled}
        required
        error={!quizTarget && empty}
        helperText={!quizTarget && empty ? "Field Requiered" : ""}
      />
      <InputText
        name="quizQuestions"
        label="Number of Questions"
        variant="outlined"
        type="number"
        onChange={handleQuizSetup}
        value={quizQuestions}
        disabled={disabled}
        required
        error={!quizQuestions && empty}
        helperText={!quizQuestions && empty ? "Field Requiered" : ""}
      />
    </Box>
  );
};

export default FormSetupQuiz;
