import React, { useEffect, useState } from "react";
import { Grid, styled, Typography, Button, Box } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import ProgressHome from "../components/homeUser/ProgressHome";
import Podium from "../components/progressCharts/Podium";
import Circle from "../components/progressCharts/Circle";
import Diamond from "../components/progressCharts/Diamond";
import medal from "../assets/badges/ten.svg";
import StarProgress from "../components/progressCharts/StarProgress";
import Ranking from "../components/homeUser/Ranking";
import { useSelector } from "react-redux";
import { downloadHomeData, tokenNotification } from "../utils/api";
import { requestForToken, onMessageListener } from "../utils/firebase";
import Swal from "sweetalert2";

const MainHomeUser = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const BoxVinetas = styled(Box)(({ theme }) => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  h6: {
    color: "#3047B0",
  },
}));

const SeeButton = styled(Button)(() => ({
  textTransform: "none",
  background: "#bdbdbd",
  color: "white",
  width: "8rem",
  padding: "0",
  borderRadius: "10px",
}));

const HomeUser = () => {
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    url: "",
  });
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const [data, setData] = useState([]);

  // Esta funcion esta pendiente de las nuevas notifiaciones
  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.data?.title,
        body: payload?.data?.body,
        url: payload?.data?.url,
      });
    })
    .catch((err) => console.log("failed: ", err));

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 15000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const noti = () => {
    notification?.title &&
      Toast.fire({
        icon: "warning",
        title: notification?.title,
        text: notification?.body,
      });
  };

  useEffect(() => {
    if (notification?.title) {
      noti();
    }
    // eslint-disable-next-line
  }, [notification]);

  useEffect(() => {
    const getData = async () => {
      const kpis = await downloadHomeData(idccms);
      if (kpis && kpis.status === 200 && kpis.data.length > 1) {
        setData(kpis.data);
      }
      const token = await requestForToken();
      await tokenNotification(token, idccms);
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const ranking =
    data.length > 0 && Array.isArray(data)
      ? data[0].AgentsRanking.sort((a, b) => b.ResObtenido - a.ResObtenido)
      : data;

  //console.log(data);
  return (
    <>
      <MainHomeUser
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5} xl={6}>
            {ranking && <ProgressHome dataKPI={data} />}
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={3}>
            {ranking && <Podium podio={ranking} />}
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Ranking ranking={ranking} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Total Exp
              </Typography>
              <Circle />
              <Box display="flex" justifyContent="center">
                <SeeButton sx={{ backgroundColor: " #137ee0    " }}>
                  See more
                </SeeButton>
              </Box>
            </BoxVinetas>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Challenges Won
              </Typography>
              <Diamond />
              <Box display="flex" justifyContent="center">
                <SeeButton sx={{ backgroundColor: " #0cce6c   " }}>
                  See more
                </SeeButton>
              </Box>
            </BoxVinetas>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Games Played
              </Typography>
              <StarProgress />
              <Box display="flex" justifyContent="center">
                <SeeButton sx={{ backgroundColor: "  #f5be55  " }}>
                  See more
                </SeeButton>
              </Box>
            </BoxVinetas>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Latest Achievement
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "28vh",
                }}
              >
                <img src={medal} alt="top-Ten" height="75%" width="75%" />
                <Box display="flex" justifyContent="center">
                  <SeeButton
                    sx={{ backgroundColor: " #45a2c1 ", marginTop: "1.6rem" }}
                  >
                    See more
                  </SeeButton>
                </Box>
              </Box>
            </BoxVinetas>
          </Grid>
        </Grid>
        {/* <ProgressSection /> */}
        <Footer />
      </MainHomeUser>
    </>
  );
};

export default HomeUser;
