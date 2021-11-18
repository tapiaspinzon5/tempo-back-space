import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  styled,
} from "@mui/material";

const CardCategory = styled(Card)(({ theme }) => ({
  background: "#fafafa",
  borderRadius: "20px",
  maxWidth: "18rem",
  margin: "1rem",
  overFlow: "hidden",
  div: {
    background: "#e6e6e6",
    position: "relative",
    top: "10rem",
    transition: "top  ease-in-out .3s",
  },
  "&:hover": {
    div: {
      top: "0rem",
    },
  },
}));
const CardGameCategory = () => {
  return (
    <CardCategory>
      <CardActionArea>
        <CardMedia component="img" height="140" image="./halo.jpg" alt="Halo" />
        <CardContent className="contentCard">
          <Typography gutterBottom variant="h5" component="div" align="center">
            Halo
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardCategory>
  );
};

export default CardGameCategory;
