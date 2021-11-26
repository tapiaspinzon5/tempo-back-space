import React, { useState } from "react";
import { Typography, Box, IconButton, styled, Grid } from "@mui/material";
import CardGameCategory from "../homeUser/CardGameCategory";
import Header from "../homeUser/Header";
import DB from "./data.json";

const Grilla = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridAutoRows: "minmax(100px, auto)",
  gap: "10px",
  margin: "auto",
}));

export const Catalogue = () => {
  const [data, setData] = useState(DB.data);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: "95vh",
          width: "100%",
          padding: "0 2rem",
        }}
      >
        <Header />
        <Typography variant="h1">Courses</Typography>
        <Grilla sx={{}}>
          {data.map((el) => (
            <CardGameCategory key={el.id} el={el} />
          ))}
        </Grilla>
      </Box>
    </>
  );
};
