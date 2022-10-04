import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";

/* is defined radio icon styled*/
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
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
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

/* the component is created*/
function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

export const MultiAnswer = ({ question, answer, setAnswer }) => {
  return (
    <div>
      <Card
        sx={{
          margin: "15px 15px 0 15px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          padding: "1rem 2rem 0 2rem",
          height: "50vh",
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
          <FormGroup>
            <FormControlLabel
              checked={
                answer[question.Idpregunta] &&
                answer[question.Idpregunta].OA !== ""
              }
              control={<BpCheckbox />}
              value={"A"}
              label={question.Respuesta1}
              onChange={(e) => {
                // console.log({
                // 	...answer,
                // 	[question.Idpregunta]: {
                // 		...answer[question.Idpregunta],
                // 		OA: e.target.checked ? e.target.value : "",
                // 	},
                // });
                setAnswer({
                  ...answer,
                  [question.Idpregunta]: {
                    ...answer[question.Idpregunta],
                    OA: e.target.checked ? e.target.value : "",
                  },
                });
              }}
            />
            <FormControlLabel
              checked={
                answer[question.Idpregunta] &&
                answer[question.Idpregunta].OB !== ""
              }
              control={<BpCheckbox />}
              value={"B"}
              label={question.Respuesta2}
              onChange={(e) =>
                setAnswer({
                  ...answer,
                  [question.Idpregunta]: {
                    ...answer[question.Idpregunta],
                    OB: e.target.checked ? e.target.value : "",
                  },
                })
              }
            />
            <FormControlLabel
              checked={
                answer[question.Idpregunta] &&
                answer[question.Idpregunta].OC !== ""
              }
              control={<BpCheckbox />}
              value={"C"}
              label={question.Respuesta3}
              onChange={(e) =>
                setAnswer({
                  ...answer,
                  [question.Idpregunta]: {
                    ...answer[question.Idpregunta],
                    OC: e.target.checked ? e.target.value : "",
                  },
                })
              }
            />
            <FormControlLabel
              checked={
                answer[question.Idpregunta] &&
                answer[question.Idpregunta].OD !== ""
              }
              control={<BpCheckbox />}
              value={"D"}
              label={question.Respuesta4}
              onChange={(e) =>
                setAnswer({
                  ...answer,
                  [question.Idpregunta]: {
                    ...answer[question.Idpregunta],
                    OD: e.target.checked ? e.target.value : "",
                  },
                })
              }
            />
          </FormGroup>
        </CardActions>
      </Card>
    </div>
  );
};
