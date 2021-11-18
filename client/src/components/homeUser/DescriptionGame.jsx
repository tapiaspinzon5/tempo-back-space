import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  CircularProgress,
  styled,
} from "@mui/material";

const MainDescriptionGame = styled(Grid)(({ theme }) => ({
  background: "#F3F3F2",
  width: "25rem",
  margin: ".5rem",
  Height: "97vh",
  borderRadius: "20px",
  padding: "2rem",
  boxShadow: "2px 2px 5px #bdbdbd",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
}));

const DescriptionGame = () => {
  return (
    <MainDescriptionGame>
      <Card sx={{ borderRadius: "20px" }}>
        <CardMedia
          component="img"
          height="100"
          image="/static/images/halo.jpg"
          alt="Halo"
        />
      </Card>

      <Typography variant="h5" color="initial" fontWeight="bold">
        Halo
      </Typography>
      <Box>
        <Typography
          variant="subtitle1"
          color="initial"
          fontWeight="bold"
          marginTop="1rem"
        >
          About
        </Typography>
        <Typography variant="body2" color="initial" fontSize="12px">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500.
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          color="initial"
          fontWeight="bold"
          marginTop="1rem"
        >
          Rating
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CircularProgress value={60} variant="determinate" size={70} />
          <CircularProgress value={90} variant="determinate" size={70} />
          <CircularProgress value={30} variant="determinate" size={70} />
        </Box>
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          color="initial"
          fontWeight="bold"
          marginTop="1rem"
        >
          Trailer
        </Typography>
        <Card sx={{ borderRadius: "20px" }}>
          <CardMedia
            component="video"
            height="180"
            image="/static/images/halo.mp4"
            alt="Halo"
          />
        </Card>
      </Box>
    </MainDescriptionGame>
  );
};

export default DescriptionGame;
