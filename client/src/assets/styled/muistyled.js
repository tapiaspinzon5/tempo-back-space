import { Grid, styled, Button, Box, TextField } from "@mui/material";

export const MainPage = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "1rem 2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  h5: {
    fontWeight: "700",
    color: "#3047B0",
    margin: "2rem 0",
  },
}));

export const BoxContain = styled(Grid)(() => ({
  background: "#f9f9f9",
  //background: "#f1f1f1",
  height: "32rem",
  borderRadius: "10px",
  overflowY: "scroll",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));

// BLUE boton de acttion
export const ButtonActionBlue = styled(Button)(() => ({
  background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
  color: "#FFFFFF",
  width: "180px",
  textTransform: "none",
  borderRadius: "10px",
}));

//boton de acttion
export const ButtonAction = styled(Button)(() => ({
  boxShadow: "1px 1px 2px #A2A2A2",
  height: "2.5rem",
  borderRadius: "8px",
  background: "#F9F9F9 0% 0% no-repeat padding-box",
  marginRight: "2rem",
  textTransform: "none",
  padding: "0 15px ",
  color: "#3047B0",
  "&:hover": {
    boxShadow: "1px 1px 5px #A2A2A2",
  },
}));

//Boton del home de los administrativos
export const ButtonHome = styled(Button)(({ theme }) => ({
  width: "100%",
  img: {
    width: "100%",
    "&:hover": {
      boxShadow: "5px 5px 10px #3047B0",
      borderRadius: "10px",
      transform: "scale(1.01)",
    },
  },
}));

//Box con imput parala carga de archivos tipo Button
export const BoxUpFile = styled(Box)(() => ({
  height: "2.5rem",
  width: "8rem",
  marginRight: "2rem",
  boxShadow: "1px 1px 3px #A2A2A2",
  borderRadius: "8px",
  background: "#F9F9F9 0% 0% no-repeat padding-box",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  "&:hover": {
    boxShadow: "1px 1px 5px #A2A2A2",
    background: "#EFF8FB",
  },
  input: {
    display: "none",
  },
  label: {
    cursor: "pointer",
    fontSize: "14px",
    color: "#3047B0",
    svg: {
      marginRight: ".5rem",
    },
  },
}));

//CUSTOM TABLE
//Table header
export const BoxHeaderTable = styled(Box)(() => ({
  display: "flex",
  textAlign: "center",
  backgroundColor: "#e8e8e8",
  padding: "5px",
  borderRadius: "5px",
}));

//Table Body
export const BoxBodyTable = styled(Box)(() => ({
  height: "40vh",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));

//Table rows
export const BoxDataTable = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "#fff",
  marginTop: "10px",
  borderRadius: "5px",
  padding: "5px",
  "&:hover": {
    boxShadow: "1px 1px 5px #A2A2A2",
    background: "#EFF8FB99",
  },
}));

export const InputText = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "#3047B0",
    },
  },
}));

//tarjeta de usuario avataar-nombre y cargo
export const CardUser = styled(Box)(() => ({
  color: "#3047b0",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  //justifyContent: "space-between",
  padding: "1rem",
  borderRadius: "10px",
}));
