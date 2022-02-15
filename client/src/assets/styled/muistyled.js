import { Grid, styled } from "@mui/material";

export const MainPage = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  //   [theme.breakpoints.down("md")]: {
  //     top: "15px",
  //   },
}));

export const BoxContain = styled(Grid)(() => ({
  background: "#f9f9f9",
  //background: "blue",
  borderRadius: "10px",
}));
