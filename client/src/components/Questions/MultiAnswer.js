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

export const MultiAnswer = ({ el, answer, setAnswer }) => {
  /*   const handleChangeA = (e) => {
    setAnswer({ ...answer, [el.id]: {OA: e.target.checked ? e.target.value : "" }});
  }; */

  return (
    <div>
      <Card sx={{ margin: "15px", backgroundColor: "#CCCCCC" }}>
        <CardContent>
          <Typography variant="h2">
            Question multiple option with multiple answer
          </Typography>
          <Typography variant="h4">{el.title}</Typography>
          <br />
          <Typography variant="p">{el.question}</Typography>
        </CardContent>
        <CardActions>
          <FormGroup>
            <FormControlLabel
              checked={answer[el.id] && answer[el.id].OA !== ""}
              control={<Checkbox />}
              value={el.options.optionA}
              label={el.options.optionA}
              onChange={(e) =>
                setAnswer({
                  ...answer,
                  [el.id]: {
                    ...answer[el.id],
                    OA: e.target.checked ? e.target.value : "",
                  },
                })
              }
            />
            <FormControlLabel
              checked={answer[el.id] && answer[el.id].OB !== ""}
              control={<Checkbox />}
              value={el.options.optionB}
              label={el.options.optionB}
              onChange={(e) =>
                setAnswer({
                  ...answer,
                  [el.id]: {
                    ...answer[el.id],
                    OB: e.target.checked ? e.target.value : "",
                  },
                })
              }
            />
            <FormControlLabel
              checked={answer[el.id] && answer[el.id].OC !== ""}
              control={<Checkbox />}
              value={el.options.optionC}
              label={el.options.optionC}
              onChange={(e) =>
                setAnswer({
                  ...answer,
                  [el.id]: {
                    ...answer[el.id],
                    OC: e.target.checked ? e.target.value : "",
                  },
                })
              }
            />
            <FormControlLabel
              checked={answer[el.id] && answer[el.id].OD !== ""}
              control={<Checkbox />}
              value={el.options.optionD}
              label={el.options.optionD}
              onChange={(e) =>
                setAnswer({
                  ...answer,
                  [el.id]: {
                    ...answer[el.id],
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
