import React from "react";
import { Box } from "@mui/system";
import { InputText } from "../../assets/styled/muistyled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FormSetupQuiz = ({ handleQuizSetup, fileName, dataQuiz }) => {
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
        label="Quiz Name"
        variant="outlined"
        onChange={handleQuizSetup}
        value={dataQuiz.quizName}
        disabled
        required
      />
      <InputText
        name="quizDescription"
        label="Description"
        variant="outlined"
        onChange={handleQuizSetup}
        value={dataQuiz.quizDescription}
        disabled
        required
      />
      <FormControl fullWidth>
        <InputLabel id="quizCategory-label">Category</InputLabel>
        <Select
          labelId="quizCategory-label"
          name="quizCategory"
          value={dataQuiz.quizCategory || ""}
          label="Category"
          onChange={handleQuizSetup}
          disabled
          required
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <InputText
        name="quizTarget"
        label="Target"
        variant="outlined"
        type="number"
        onChange={handleQuizSetup}
        value={dataQuiz.quizTarget}
        disabled
        required
      />
      <InputText
        name="quizQuestions"
        label="Number of Questions"
        variant="outlined"
        type="number"
        onChange={handleQuizSetup}
        value={dataQuiz.quizQuestions}
        disabled
        required
      />
    </Box>
  );
};

export default FormSetupQuiz;
