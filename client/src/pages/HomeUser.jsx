import React, { useEffect, useState } from "react";
import { Grid, styled, Typography, Button, Box } from "@mui/material";
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
import { useSelector } from "react-redux";
import { downloadHomeData, tokenNotification } from "../utils/api";
import { requestForToken } from "../utils/firebase";
import LoadingComponent from "../components/LoadingComponent";
import ProgressKPI from "../components/progressCharts/ProgressKPI";

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

const SeeButton = styled(Button)(() => ({
  textTransform: "none",
  background: "#bdbdbd",
  color: "white",
  width: "8rem",
  padding: "0",
  borderRadius: "10px",
}));

const HomeUser = ({ count }) => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const [data, setData] = useState([]);
  const [texp, setTExp] = useState(0);
  const [cw, setCw] = useState(0);
  const [gp, setGp] = useState(0);
  const [badge, setBadge] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const kpis = await downloadHomeData(idccms);
      if (kpis && kpis.status === 200 && kpis.data.length > 1) {
        await setData(kpis.data);
        await setTExp(kpis.data[6]);
        await setCw(kpis.data[3]);
        await setGp(kpis.data[4]);
        setBadge(() => kpis.data[5]);
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
  console.log(data);
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
            <>{ranking && <Podium podio={ranking} />}</>
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <Ranking ranking={ranking} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Total Exp
              </Typography>
              {texp ? <Circle info={texp} /> : <LoadingComponent />}
              {/* <Box display="flex" justifyContent="center">
                <SeeButton sx={{ backgroundColor: " #137ee0    " }}>
                  See more
                </SeeButton>
              </Box> */}
            </BoxVinetas>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Challenges Won
              </Typography>
              {cw ? <Diamond info={cw} /> : <LoadingComponent />}
              {/* <Box display="flex" justifyContent="center">
                <SeeButton sx={{ backgroundColor: " #0cce6c   " }}>
                  See more
                </SeeButton>
              </Box> */}
            </BoxVinetas>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <BoxVinetas>
              <Typography variant="h6" align="center" fontWeight="bold">
                Games Played
              </Typography>
              {gp ? <StarProgress info={gp} /> : <LoadingComponent />}
              {/* <Box display="flex" justifyContent="center">
                <SeeButton sx={{ backgroundColor: "  #f5be55  " }}>
                  See more
                </SeeButton>
              </Box> */}
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

                {/* <Box display="flex" justifyContent="center">
                  <SeeButton
                    sx={{ backgroundColor: " #45a2c1 ", marginTop: "1.6rem" }}
                  >
                    See more more
                  </SeeButton>
                </Box> */}
              </Box>
            </BoxVinetas>
          </Grid>
        </Grid>
     
        <Footer />
      </MainHomeUser>
    </>
  );
};

export default HomeUser;
