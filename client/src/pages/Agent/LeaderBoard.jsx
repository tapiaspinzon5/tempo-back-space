import React, { useState, useEffect, useRef } from "react";
import { Typography, Grid, styled, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { MainPage, BoxContain } from "../../assets/styled/muistyled";
import Header from "../../components/homeUser/Header";
import Podium from "../../components/progressCharts/Podium";
import { downloadHomeData } from "../../utils/api";
import LeaderRankBoard from "../../components/LeaderBoard/LeaderRankBoard";
import TableLeaderBoard from "../../components/LeaderBoard/TableLeaderBoard";
import Footer from "../../components/Footer";
import LoadingComponent from "../../components/LoadingComponent";

const LeaderBoard = () => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const ref = useRef();
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const kpis = await downloadHomeData(idccms);
      if (kpis && kpis.status === 200 && kpis.data.length > 1) {
        const ranking =
          kpis.data.length > 0 && Array.isArray(data)
            ? kpis.data[0].AgentsRanking.sort(
                (a, b) => b.ResObtenido - a.ResObtenido
              )
            : data;
        setData(ranking);
      }
    };
    getData();

    // eslint-disable-next-line
  }, []);
  //caja.clientWidth
  let ancho = ref.current !== undefined ? ref.current.clientWidth : 0;
  useEffect(() => {
    setWidth(ancho);
  }, [ancho]);
  return (
    <MainPage>
      <Grid marginTop={2}>
        <Header />
      </Grid>
      <Box margin="1rem 0" color="#3047B0">
        <Typography variant="h5" fontWeight="500">
          Leaderboard
        </Typography>
      </Box>
      <Grid container columnSpacing={3}>
        <Grid item xs={12}>
          <Box>
            <LeaderRankBoard />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <BoxContain ref={ref}>
            {data.length !== 0 ? (
              <TableLeaderBoard width={width} />
            ) : (
              <LoadingComponent />
            )}
          </BoxContain>
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxContain
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box padding={2} width="100%">
              <Podium podio={data} />
            </Box>
          </BoxContain>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default LeaderBoard;
