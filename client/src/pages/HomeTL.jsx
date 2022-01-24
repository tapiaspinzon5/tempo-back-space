import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, styled, Typography, Box } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import { AdminCard } from "../components/AdminCard/AdminCard";
import img1 from "../assets/images/TL-1.svg";
import img2 from "../assets/images/TL-2.svg";
import img3 from "../assets/images/TL-3.svg";

/////prueba
import { validateDataCheck } from "../helpers/helpers";

const MainHomeTL = styled(Grid)(({ theme }) => ({
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
  img: {
    width: "100%",
  },
}));

/////Pruebas
const dataag = [
  {
    Agent: "Yudi Alarcon Martinez",
    Experiences: 0,
    Coins: 0,
    idCcms: 12,
    isChecked: false,
  },
  {
    Agent: "Diana Carrillo Trujillo",
    Experiences: 0,
    Coins: 0,
    idCcms: 13,
    isChecked: false,
  },
  {
    Agent: "Dora Cuartas Agudelo",
    Experiences: 0,
    Coins: 0,
    idCcms: 14,
    isChecked: false,
  },
  {
    Agent: "Richard Fontalvo Altamar",
    Experiences: 0,
    Coins: 0,
    idCcms: 15,
    isChecked: false,
  },
  {
    Agent: "Paola Gallego Granada",
    Experiences: 0,
    Coins: 0,
    idCcms: 16,
    isChecked: false,
  },
  {
    Agent: "Angela Granados Correa",
    Experiences: 0,
    Coins: 0,
    idCcms: 17,
    isChecked: false,
  },
  {
    Agent: "Yerson Jaramillo Vasquez",
    Experiences: 0,
    Coins: 0,
    idCcms: 18,
    isChecked: false,
  },
  {
    Agent: "Cesar Jimenez Torres",
    Experiences: 0,
    Coins: 0,
    idCcms: 19,
    isChecked: false,
  },
  {
    Agent: "Santiago Martinez Gonzalez",
    Experiences: 0,
    Coins: 0,
    idCcms: 110,
    isChecked: false,
  },
  {
    Agent: "Zonia Moreno Morales",
    Experiences: 0,
    Coins: 0,
    idCcms: 111,
    isChecked: false,
  },
  {
    Agent: "Daniel Moreno Salas",
    Experiences: 200,
    Coins: 170,
    idCcms: 112,
    isChecked: true,
  },
  {
    Agent: "Fernando Mozo Mercado",
    Experiences: 0,
    Coins: 0,
    idCcms: 113,
    isChecked: false,
  },
  {
    Agent: "Ana Murillo Zabala",
    Experiences: 0,
    Coins: 0,
    idCcms: 114,
    isChecked: false,
  },
  {
    Agent: "Deiby Nino Garces",
    Experiences: 200,
    Coins: 180,
    idCcms: 115,
    isChecked: true,
  },
  {
    Agent: "Yury Ochoa Paipa",
    Experiences: 0,
    Coins: 0,
    idCcms: 116,
    isChecked: false,
  },
  {
    Agent: "Astrid Oquendo Mejia",
    Experiences: 0,
    Coins: 0,
    idCcms: 117,
  },
  {
    Agent: "Sergio Ospina Santos",
    Experiences: 0,
    Coins: 0,
    idCcms: 118,
    isChecked: false,
  },
  {
    Agent: "Diana Peña Gutierrez",
    Experiences: 0,
    Coins: 0,
    idCcms: 119,
    isChecked: false,
  },
  {
    Agent: "Matilde Puentes Gutierrez",
    Experiences: 200,
    Coins: 150,
    idCcms: 120,
    isChecked: false,
  },
  {
    Agent: "Frank Salazar Herrera",
    Experiences: 0,
    Coins: 0,
    idCcms: 121,
    isChecked: false,
  },
  {
    Agent: "Marisol Silva Sanchez",
    Experiences: 0,
    Coins: 0,
    idCcms: 122,
    isChecked: false,
  },
  {
    Agent: "Diego Tapias Pinzon",
    Experiences: 200,
    Coins: 160,
    idCcms: 123,
  },
  {
    Agent: "Clara Toro Upegui",
    Experiences: 0,
    Coins: 0,
    idCcms: 124,
    isChecked: false,
  },
  {
    Agent: "Sandra Zapata Zapata",
    Experiences: 0,
    Coins: 0,
    idCcms: 125,
  },
];

const dataac = [
  {
    Category: "Activity",
    Id: 1,
    Name: "Welcome to EGP",
    Stage: "Getting started",
    Description:
      "Learn how to play by completing the welcome video and earn your first points and coins.",
    RewardPoints: 10,
    RewardEpicoins: 50,
    Context: "Gaming stuff",
    isChecked: true,
  },
  {
    Category: "Activity",
    Id: 2,
    Name: "Let's introduce ourselves ",
    Stage: "Getting started",
    Description: "Update your profile information",
    RewardPoints: 5,
    RewardEpicoins: null,
    Context: "Gaming stuff",
    isChecked: false,
  },
  {
    Category: "Activity",
    Id: 3,
    Name: "Put your armour on and get ready",
    Stage: "Getting started",
    Description: "Customize your avatar!",
    RewardPoints: 10,
    RewardEpicoins: null,
    Context: "Gaming stuff",
  },
];

export const HomeTL = () => {
  const navigate = useNavigate();
  const p = validateDataCheck(dataag, dataac);
  console.log(p);
  return (
    <>
      <MainHomeTL sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            {/* <AdminCard data={data[0]} /> */}
            <CardContainer>
              <CardContent>
                <Box display="flex" flexDirection="column">
                  <Button onClick={() => navigate("/followingteams")}>
                    <img src={img1} alt="top-Ten" />
                  </Button>

                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ m: "10px", color: "#3047B0" }}
                  >
                    Following Teams KPI
                  </Typography>
                </Box>
              </CardContent>
            </CardContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <AdminCard data={data[1]} /> */}
            <CardContainer>
              <CardContent>
                <Box display="flex" flexDirection="column">
                  <Button onClick={() => navigate("/challengeasignment")}>
                    <img src={img2} alt="top-Ten" />
                  </Button>

                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ m: "10px", color: "#3047B0" }}
                  >
                    Challenge Assignment
                  </Typography>
                </Box>
              </CardContent>
            </CardContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <AdminCard data={data[2]} /> */}
            <CardContainer>
              <CardContent>
                <Box display="flex" flexDirection="column">
                  <Button onClick={() => navigate("/badgesmanagement")}>
                    <img src={img3} alt="top-Ten" />
                  </Button>

                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ m: "10px", color: "#3047B0" }}
                  >
                    Badges Management
                  </Typography>
                </Box>
              </CardContent>
            </CardContainer>
          </Grid>
        </Grid>
        <Footer />
      </MainHomeTL>
    </>
  );
};
