import React, { useEffect } from "react";
import { Typography, Grid, Box, Button, styled } from "@mui/material";
import imgLogin from "../assets/images/login.svg";
import tpLogo from "../assets/images/logo-tp-blue.svg";
import tpmar from "../assets/images/tp-mar-blue.svg";
import spaceLogo from "../assets/images/logoSpace.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/loginDuck";

const ImageLogin = styled(Box)(() => ({
  img: {
    height: "99vh",
  },
}));
const FormBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "100vh",
  width: "50%",
}));

const BoxChecket = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  a: {
    textDecoration: "none",
    color: "#000",
    margin: 0,
    paddingTop: "9px",
    "&:hover": {
      color: "#0087FF",
    },
  },
}));
const ButtonLogin = styled(Button)(({ theme }) => ({
  width: "15rem",
  margin: "2rem 0 ",
  background: "linear-gradient(150deg, #3047B0 0%, #0087FF 100%)",
  color: "#fff",
  borderRadius: "23px",
  height: "47px",
  fontSize: "35px",
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <ImageLogin>
          <img src={imgLogin} alt="welcome to TP" />
        </ImageLogin>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <FormBox>
          <Box textAlign="center" marginTop={2}>
            <img src={spaceLogo} alt="Logo Teleperformance" height={80} />{" "}
          </Box>
          <Typography variant="body1" color="initial">
            After a successful sign in we use a cookie in your browser to track
            your session. You can refer our <b>Cookie Policy</b> for more
            details
          </Typography>
          <Typography variant="body1" color="initial">
            By signing in, you agree to our <b>Privacy Policy</b>
          </Typography>
          <Box display="flex" justifyContent="center" width="full">
            <ButtonLogin onClick={() => navigate("/")}>LOGIN</ButtonLogin>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <img src={tpLogo} alt="Logo Teleperformance" height="29" />
            <img src={tpmar} alt="Logo TP-MAR" height="29" />
          </Box>
          <Typography variant="body2" color="initial" align="center">
            WSO2 Identity Server | © 2022 Inc. All rights reserved
          </Typography>
        </FormBox>
      </Grid>
    </Grid>
  );
};

export default Login;
