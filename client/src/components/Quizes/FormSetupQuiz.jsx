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
  const [errorMSJ, setErrorMsj] = useState({ target: "", question: "" });
  const { quizCategory, quizDescription, quizName, quizQuestions, quizTarget } =
    dataQuiz;
  useEffect(() => {
    if (fileName) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [fileName]);

  const handleTarget = (e) => {
    if (e.target.value >= 0 && e.target.value <= 100) {
      setErrorMsj({
        ...errorMSJ,
        target: "",
      });
      handleQuizSetup(e);
    } else {
      setErrorMsj({
        ...errorMSJ,
        target: "The target must contain a value between 0 and 100",
      });
    }
  };

  const handleQuestion = (e) => {
    if (e.target.value >= 0 && e.target.value <= 10) {
      setErrorMsj({
        ...errorMSJ,
        question: "",
      });
      handleQuizSetup(e);
    } else {
      setErrorMsj({
        ...errorMSJ,
        question: "Max 10 questions",
      });
    }
  };
  const handleName = (e) => {
    if (e.target.value.length <= 50) {
      setErrorMsj({
        ...errorMSJ,
        name: e.target.value.length + " / 50",
      });
      handleQuizSetup(e);
    } else {
      setErrorMsj({
        ...errorMSJ,
        name: "The name must have max 50 characters",
      });
    }
  };
  const handleDesc = (e) => {
    if (e.target.value.length <= 200) {
      setErrorMsj({
        ...errorMSJ,
        desc: e.target.value.length + " / 200",
      });
      handleQuizSetup(e);
    } else {
      setErrorMsj({
        ...errorMSJ,
        desc: "The description must have max 200 characters",
      });
    }
  };

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
        maxLength={10}
        variant="outlined"
        onChange={handleName}
        value={quizName}
        disabled={disabled}
        required
        size="small"
        error={!quizName && empty}
        helperText={
          !quizName && empty ? (
            "Field Requiered"
          ) : (
            <p style={{ color: "#3047B0", textAlign: "end", margin: "2px" }}>
              {errorMSJ.name}
            </p>
          )
        }
      />
      <InputText
        name="quizDescription"
        label="Description"
        variant="outlined"
        onChange={handleDesc}
        value={quizDescription}
        disabled={disabled}
        size="small"
        required
        error={!quizDescription && empty}
        helperText={
          !quizDescription && empty ? (
            "Field Requiered"
          ) : (
            <p style={{ color: "#3047B0", textAlign: "end", margin: "2px" }}>
              {errorMSJ.desc}
            </p>
          )
        }
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
        onChange={handleTarget}
        value={quizTarget}
        disabled={disabled}
        size="small"
        required
        error={!quizTarget && empty}
        helperText={!quizTarget && empty ? "Field Requiered" : errorMSJ.target}
      />
      <InputText
        name="quizQuestions"
        label="Number of Questions"
        variant="outlined"
        type="number"
        onChange={handleQuestion}
        value={quizQuestions}
        size="small"
        disabled={disabled}
        required
        error={!quizQuestions && empty}
        helperText={
          !quizQuestions && empty ? "Field Requiered" : errorMSJ.question
        }
      />
    </Box>
  );
};

export default FormSetupQuiz;
