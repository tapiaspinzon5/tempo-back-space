import React from "react";
import { Link } from "react-router-dom";
import { Grid, styled } from "@mui/material";

const CardViewGame = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  background: "#fafafa",
  borderRadius: "20px",
  height: "10rem",
  width: "10rem",
  margin: ".5rem",
  boxShadow: "2px 2px 5px #bdbdbd",
  color: theme.palette.text.secondary,
  transition: "transform .4s",
  "&:hover": {
    background: "#e6e6e6",
    transform: "scale(1.04) ",
    boxShadow: "2px 2px 5px #a4a4a4",
    cursor: "pointer",
  },
  a: {
    background: "red",
  },
}));

const gameID = "e2456trerty654er";
const CardGame = () => {
  return (
    <Grid container>
      <Link to={`/description/${gameID}`}>
        <CardViewGame item xs={12}>
          <p>card 1 </p>
        </CardViewGame>
      </Link>
    </Grid>
  );
};

export default CardGame;
