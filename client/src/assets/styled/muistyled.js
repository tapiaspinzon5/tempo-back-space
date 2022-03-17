import { Grid, styled, Button } from "@mui/material";

export const MainPage = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "1rem 2rem",

   h5: {
    fontWeight: "700",
    color: "#3047B0",
    margin: "2rem 0",
  },
}));

export const BoxContain = styled(Grid)(() => ({
  background: "#f9f9f9",
  //background: "#f1f1f1",
  minHeight: "32rem",
  borderRadius: "10px",
}));


export const ButtonHome = styled(Button)(({ theme }) => ({
  width:'100%',
  img:{
    width:'100%',
    '&:hover':{
      boxShadow:'5px 5px 10px #3047B0',
      borderRadius:'10px',
      transform:'scale(1.01)'
    }
  }
}));
