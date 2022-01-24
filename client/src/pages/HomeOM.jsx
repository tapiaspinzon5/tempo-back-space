import React from "react";

import { Grid, styled, Typography, Box, Button } from "@mui/material";

import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import img3 from "../assets/images/OM-3.svg";

//import { AdminCard } from "../components/AdminCard/AdminCard";
//import img2 from "../assets/images/OM-2.svg";
//import img1 from "../assets/images/OM-1.svg";
import { useNavigate } from "react-router-dom";

const MainHomeOM = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  marginTop: "25px",
  input: {
    display: "none",
  },
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  display: "flex",

  width: "55vh",
  height: "70vh",
  backgroundColor: "#f9f9f9",

  borderRadius: "10px",
  padding: "15px",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    background: "#f2f2f2",
  },
}));

////////////////////////////////////////
export const HomeOM = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHomeOM sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CardContainer>
              <CardContent>
                <Box display="flex" flexDirection="column">
                  <Button
                    onClick={() => {
                      navigate("/upcampaign");
                    }}
                  >
                    <img src={img3} alt="top-Ten" />
                  </Button>

                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ m: "10px", color: "#3047B0" }}
                  >
                    Assigning Team Members
                  </Typography>
                </Box>
              </CardContent>
            </CardContainer>
          </Grid>
        </Grid>
        <Footer />
      </MainHomeOM>
    </>
  );
};
