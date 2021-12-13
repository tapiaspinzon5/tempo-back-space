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

export const OneAnswer = ({ el, answer, setAnswer }) => {
  const handleChange = (e) => {
    setAnswer({ ...answer, [el.id]: e.target.value });
  };
  return (
    <div>
      <Card sx={{ margin: "15px", backgroundColor: "#CCCCCC" }}>
        <CardContent>
          <Typography variant="h2">
            Question multiple option with unique answer
          </Typography>
          <Typography variant="h4">{el.title}</Typography>
          <br />
          <Typography variant="p">{el.question}</Typography>
        </CardContent>
        <CardActions>
          <FormControl component="fieldset">
            <RadioGroup onChange={handleChange} name="row-radio-buttons-group">
              <FormControlLabel
                checked={answer[el.id] === el.options.optionA}
                value={el.options.optionA}
                label={el.options.optionA}
                control={<Radio />}
              />
              <FormControlLabel
                checked={answer[el.id] === el.options.optionB}
                value={el.options.optionB}
                control={<Radio />}
                label={el.options.optionB}
              />
              <FormControlLabel
                checked={answer[el.id] === el.options.optionC}
                value={el.options.optionC}
                control={<Radio />}
                label={el.options.optionC}
              />
              <FormControlLabel
                checked={answer[el.id] === el.options.optionD}
                value={el.options.optionD}
                control={<Radio />}
                label={el.options.optionD}
              />
            </RadioGroup>
          </FormControl>
        </CardActions>
      </Card>
    </div>
  );
};
