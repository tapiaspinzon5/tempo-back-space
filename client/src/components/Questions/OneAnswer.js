import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

/* is defined radio icon styled*/
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 20,
  height: 20,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

/* is defined radio icon styled when is checked*/
const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

/* the component is created*/
function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export const OneAnswer = ({ question, answer, setAnswer }) => {
  const handleChange = (e) => {
    setAnswer({ ...answer, [question.Idpregunta]: e.target.value });
  };

  return (
    <div>
      <Card
        sx={{
          margin: "15px 15px 0 15px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          padding: "1rem 2rem 0 2rem",
          minHeight: "50vh",
          backgroundColor: "#E8E8E8",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight={500}>
            Quiz {question.IdExamen} - {question.NombreExamen}
          </Typography>
          <Typography variant="body1" fontSize={20} mt={2}>
            {question.title}
          </Typography>
          <br />
          <Typography variant="body1" fontSize={20} whiteSpace="pre">
            {question.Pregunta}
          </Typography>
        </CardContent>
        <CardActions>
          <FormControl component="fieldset">
            <RadioGroup onChange={handleChange} name="row-radio-buttons-group">
              <FormControlLabel
                checked={answer[question.Idpregunta] === question.Respuesta1}
                value={question.Respuesta1}
                label={question.Respuesta1}
                control={<BpRadio />}
                sx={{ marginBottom: "1rem" }}
              />
              <FormControlLabel
                checked={answer[question.Idpregunta] === question.Respuesta2}
                value={question.Respuesta2}
                control={<BpRadio />}
                label={question.Respuesta2}
                sx={{ marginBottom: "1rem" }}
              />
              <FormControlLabel
                checked={answer[question.Idpregunta] === question.Respuesta3}
                value={question.Respuesta3}
                control={<BpRadio />}
                label={question.Respuesta3}
                sx={{ marginBottom: "1rem" }}
              />
              <FormControlLabel
                checked={answer[question.Idpregunta] === question.Respuesta4}
                value={question.Respuesta4}
                control={<BpRadio />}
                label={question.Respuesta4}
              />
            </RadioGroup>
          </FormControl>
        </CardActions>
      </Card>
    </div>
  );
};
