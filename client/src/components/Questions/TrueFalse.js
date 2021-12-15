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
  width: 16,
  height: 16,
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
    width: 16,
    height: 16,
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

export const TrueFalse = ({ el, answer, setAnswer }) => {
  const handleChange = (e) => {
    setAnswer({ ...answer, [el.id]: e.target.value });
  };
  return (
    <div>
      <Card sx={{ margin: "15px", backgroundColor: "#CCCCCC" }}>
        <CardContent>
          <Typography variant="h2">Question True or False</Typography>
          <Typography variant="h4">{el.title}</Typography>
          <br />
          <Typography variant="p">{el.question}</Typography>
        </CardContent>
        <CardActions>
          <FormControl component="fieldset">
            <RadioGroup
              row
              name="row-radio-buttons-group"
              onChange={handleChange}
            >
              <FormControlLabel
                sx={{ ml: "10px" }}
                checked={answer[el.id] === "true"}
                value={true}
                control={<BpRadio />}
                label="True"
              />
              <FormControlLabel
                checked={answer[el.id] === "false"}
                value={false}
                control={<BpRadio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
        </CardActions>
      </Card>
    </div>
  );
};
