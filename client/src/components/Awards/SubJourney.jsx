import React from "react";
import { Box, Grid, Typography, styled } from "@mui/material";
import HeadWinners from "./HeadWinners";

const BoxSub = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "600px",
}));
const Boxdata = styled(Box)(() => ({
  background: "#fff",
  borderRadius: "5px",
  padding: ".5rem 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "3rem",
  marginBottom: "1rem",
  span: {
    background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
    marginTop: ".5rem",
    padding: "3px 8px",
    borderRadius: "3px",
    color: "#fff",
  },
}));

const BoxContain = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxHeight: "70vh",
  overflowY: "scroll",
  margin: "1rem",

  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "#f2f2f2a1",
    borderRadius: "20px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
    borderRadius: "20px",
  },
}));

const SubJourney = ({ setSection, handleClose }) => {
  return (
    <Grid>
      <HeadWinners
        setSection={setSection}
        title="Sub Juorney"
        handleClose={handleClose}
      />
      <BoxContain>
        {[0, 1, 2, 3, 4].map((data) => (
          <BoxSub>
            <Boxdata sx={{ width: "15%", overflowX: "hidden" }}>
              <Typography variant="h6" color="#3047B0" fontWeight={700}>
                KPI%H
              </Typography>
            </Boxdata>
            <Boxdata sx={{ width: "80%", marginLeft: "1rem" }}>
              <Typography variant="h6" color="#3047B0" fontWeight={700}>
                Deiby Niño Garces
              </Typography>
              <Typography variant="caption" color="#fff">
                TL. Matilde Puentes Gutierrez
              </Typography>
            </Boxdata>
          </BoxSub>
        ))}
      </BoxContain>
    </Grid>
  );
};

export default SubJourney;
