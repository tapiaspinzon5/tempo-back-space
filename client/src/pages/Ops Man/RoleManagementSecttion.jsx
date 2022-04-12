import React from "react";
import {
  Box,
  Grid,
  Typography,
  styled,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  Avatar,
} from "@mui/material";
import {
  ButtonActionBlue,
  CardUser,
  MainPage,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import search from "../../assets/Icons/search-ico.svg";
import { MdCached } from "react-icons/md";

const BoxRole = styled(Box)(() => ({
  height: "8rem",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#F9F9F9",
  boxShadow: "3px 3px 5px #00000029",
  borderRadius: "10px",
  padding: "0.5rem",
}));

const RoleManagementSecttion = () => {
  return (
    <MainPage>
      <Box>
        <Header />
        <Typography variant="h5">Role Management Section</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
          <Box display="flex" alignItems="center" height="100%">
            <Typography variant="h6" color="#3047b0">
              {" "}
              QA Lead
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <BoxRole>
            <Box width="50%">
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-search">
                  Search CCMS Id
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-search"
                  type="number"
                  //value={}
                  //onChange={}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle search visibility"
                        edge="end"
                      >
                        <img src={search} alt="Search" />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Search CCMS Id"
                />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "3px",
                }}
              >
                <IconButton sx={{ background: "#fff", marginRight: "1rem" }}>
                  <MdCached color="#3047B0" />
                </IconButton>
                <ButtonActionBlue>Assignment</ButtonActionBlue>
              </Box>
            </Box>

            <CardUser width="48%" marginLeft={1}>
              <Avatar
                alt="user"
                src="./user.png"
                sx={{ width: 70, height: 70, marginRight: "1rem" }}
              />
              <Box textAlign="left">
                <Typography variant="body1">Matilde Puentes</Typography>
                <Typography variant="body2">
                  Analista desarrollador Senior
                </Typography>
              </Box>
            </CardUser>
          </BoxRole>
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} md={2}>
          <Box display="flex" alignItems="center" height="100%">
            <Typography variant="h6" color="#3047b0">
              Reporting Lead
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <BoxRole>
            <Box width="48%">
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-search">
                  Search CCMS Id
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-search"
                  type="number"
                  //value={}
                  //onChange={}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle search visibility"
                        edge="end"
                      >
                        <img src={search} alt="Search" />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Search CCMS Id"
                />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "3px",
                }}
              >
                <IconButton sx={{ background: "#fff", marginRight: "1rem" }}>
                  <MdCached color="#3047B0" />
                </IconButton>
                <ButtonActionBlue>Assignment</ButtonActionBlue>
              </Box>
            </Box>

            <CardUser width="48%" marginLeft={1}>
              <Avatar
                alt="user"
                src="./user.png"
                sx={{ width: 70, height: 70, marginRight: "1rem" }}
              />
              <Box textAlign="left">
                <Typography variant="body1">Matilde Puentes</Typography>
                <Typography variant="body2">
                  Analista desarrollador Senior
                </Typography>
              </Box>
            </CardUser>
          </BoxRole>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default RoleManagementSecttion;
