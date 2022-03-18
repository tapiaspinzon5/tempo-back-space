import React, { useEffect, useState } from "react";
import { Grid, styled, Typography, Box } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import ProgressHome from "../components/homeUser/ProgressHome";
import Podium from "../components/progressCharts/Podium";
import Circle from "../components/progressCharts/Circle";
import Diamond from "../components/progressCharts/Diamond";
import medal2 from "../assets/badges/welcome.png";
import medal from "../assets/badges/ten.svg";
import StarProgress from "../components/progressCharts/StarProgress";
import Ranking from "../components/homeUser/Ranking";
import { useDispatch, useSelector } from "react-redux";
import {
  //downloadHomeDataTl,
  getKpisHome,
  tokenNotification,
} from "../utils/api";
import { downloadHomeDataTl } from "../redux/homeDataDuckTL";
import { requestForToken } from "../utils/firebase";
import LoadingComponent from "../components/LoadingComponent";
import { logoutAction } from "../redux/loginDuck";
import { useNavigate } from "react-router-dom";

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
  ackground: "#f9f9f9",
  borderRadius: "10pbx",
  h6: {
    color: "#3047B0",
  },
}));
export const HomeTL = ({ count }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.loginUser.userData);
  const homeData = useSelector((store) => store.homeDataTl.homeData);
  const idccms = userData.Idccms;
  const useName = userData.Nombre;
  const [data, setData] = useState([]);
  const [texp, setTExp] = useState(0);
  const [cw, setCw] = useState(0);
  const [gp, setGp] = useState(0);
  const [badge, setBadge] = useState(0);
  const [podium, setPodium] = useState([]);

  useEffect(() => {
    const getData = async () => {
      dispatch(downloadHomeDataTl(idccms));

      const token = await requestForToken();

      await tokenNotification(token, idccms);
    };

    getData();

    // eslint-disable-next-line
  }, []);
  const getData = async () => {
    const rol = userData.Role === "Agent" ? 1 : 2;
    const kpis = await getKpisHome(idccms, rol);
    if (kpis && kpis.status === 200 && kpis.data.length > 0) {
      setData(kpis.data[0].KPI);
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    if (homeData === "UnauthorizedError") {
      dispatch(logoutAction());
      navigate("/");
    } else if (homeData !== null && homeData.length > 1) {
      getData();
      setTExp(homeData[5]);
      setCw(homeData[2]);
      setGp(homeData[3]);
      setBadge(() => homeData[4]);
      setPodium(homeData[6].Podium);
    }

    // eslint-disable-next-line
  }, [homeData]);

  const ranking =
    homeData?.length > 1 && Array.isArray(homeData)
      ? homeData[0].AgentsRanking.sort((a, b) => b.ResObtenido - a.ResObtenido)
      : [];
  /*   useEffect(() => {
    const getData = async () => {
      const kpis = await downloadHomeDataTl(idccms);
      if (kpis && kpis.status === 200 && kpis.data.length > 1) {
        // setData(kpis.data);
        setTExp(kpis.data[5]);
        setCw(kpis.data[2]);
        setGp(kpis.data[3]);
        setBadge(() => kpis.data[4]);
        setPodium(kpis.data[6].Podium);
      } else if (kpis.data === "UnauthorizedError") {
        dispatch(logoutAction());
        navigate("/");
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
      : data; */

  return (
    <>
      <MainHomeUser
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <Header count={count} />
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6} xl={6}>
            {ranking && <ProgressHome dataKPI={data} />}
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <>{ranking && <Podium podio={podium} />}</>
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Ranking ranking={ranking} useName={useName} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Total Exp
              </Typography>
              {texp ? <Circle info={texp} /> : <LoadingComponent />}
            </BoxVinetas>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Challenges Won
              </Typography>
              {cw ? <Diamond info={cw} /> : <LoadingComponent />}
            </BoxVinetas>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Missions Progress
              </Typography>
              {gp ? <StarProgress info={gp} /> : <LoadingComponent />}
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
                  height: "22vh",
                }}
              >
                {badge ? (
                  <img
                    src={badge && badge.Badge[0].Badge === "0" ? medal : medal2}
                    alt="top-Ten"
                    height="100%"
                    // width="55%"
                  />
                ) : (
                  <LoadingComponent />
                )}
              </Box>
            </BoxVinetas>
          </Grid>
        </Grid>

        <Footer />
      </MainHomeUser>
    </>
  );
};
