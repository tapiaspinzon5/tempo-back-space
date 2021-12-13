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
                control={<Radio />}
                label="True"
              />
              <FormControlLabel
                checked={answer[el.id] === "false"}
                value={false}
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
        </CardActions>
      </Card>
    </div>
  );
};
