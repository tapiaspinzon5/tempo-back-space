import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  Checkbox,
  styled,
  FormGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import imgLogin from "../assets/images/login.svg";
import tpLogo from "../assets/images/logo-tp-blue.svg";
import tpmar from "../assets/images/tp-mar-blue.svg";
import { useSelector, useDispatch } from "react-redux";
import { loginSubmit } from "../redux/loginDuck";

//import { loginSubmit } from "../utils/api";

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
  width: "10rem",
  margin: "2rem 0 ",
  background: "linear-gradient(150deg, #3047B0 0%, #0087FF 100%)",
  color: "#fff",
  borderRadius: "23px",
  height: "47px",
  fontSize: "35px",
}));

const Login = () => {
  //const userData = useSelector((store) => store.loginUser.userData);
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.loginUser.loading);

  const [values, setValues] = useState({
    account: "",
    password: "",
    showPassword: false,
  });

  const handleSubmit = async (e) => {
    if (!values.password.trim() || !values.account.trim()) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "warning",
        title: "All fields are required!!",
      });
      return;
    }

    e.preventDefault();
    const body = {
      user: values.account,
      pass: values.password,
    };
    const btoaData = btoa(JSON.stringify(body));
    const bdata = { body: "s" + btoaData };
    //lanzamiento funcion login en el Duck
    dispatch(loginSubmit(bdata));
  };

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
          <Box>
            <img src={tpLogo} alt="Logo Teleperformance" />{" "}
          </Box>
          <Typography variant="body1" color="initial">
            After a successfull sign in we use a cookie in your browser to track
            your session. You can refer our <b>Cookie Policy</b> for more
            details
          </Typography>
          <Typography variant="body1" color="initial">
            By signing in, you agree to our <b>Privacy Policy</b>
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={70} />
            </Box>
          ) : (
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onSubmit={handleSubmit}
            >
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-account">
                  Account
                </InputLabel>
                <OutlinedInput
                  sx={{ borderRadius: "23px" }}
                  id="outlined-adornment-account"
                  type="text"
                  value={values.account}
                  onChange={(e) =>
                    setValues({ ...values, account: e.target.value })
                  }
                  label="Account"
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  sx={{ borderRadius: "23px" }}
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setValues({
                            ...values,
                            showPassword: !values.showPassword,
                          })
                        }
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <ButtonLogin type="submit" disabled={loading}>
                LOGIN{" "}
              </ButtonLogin>
              <BoxChecket>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember me"
                />
                <a
                  href="https://tp-itforce.teleperformance.co/TPCO/ChatSoporte/ChatMenu.aspx"
                  target="blank"
                >
                  Forgot password?
                </a>
              </BoxChecket>
            </form>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <img src={tpLogo} alt="Logo Teleperformance" height="29" />
            <img src={tpmar} alt="Logo TP-MAR" height="29" />
          </Box>
          <Typography variant="body2" color="initial" align="center">
            WSO2 Identity Server | © 2021 Inc. All rights reserver
          </Typography>
        </FormBox>
      </Grid>
    </Grid>
  );
};

export default Login;
