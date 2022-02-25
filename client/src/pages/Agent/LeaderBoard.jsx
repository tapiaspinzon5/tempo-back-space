import React, { useState, useEffect, useRef } from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { MainPage, BoxContain } from "../../assets/styled/muistyled";
import Header from "../../components/homeUser/Header";
import PodiumLB from "../../components/progressCharts/PodiumLB";
import { getDataLeaderboard } from "../../utils/api";
import LeaderRankBoard from "../../components/LeaderBoard/LeaderRankBoard";
import TableLeaderBoard from "../../components/LeaderBoard/TableLeaderBoard";
import Footer from "../../components/Footer";
import LoadingComponent from "../../components/LoadingComponent";
import { orderData } from "../../helpers/helpers";

const LeaderBoard = ({ count }) => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const ref = useRef();
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [xpOrkpi, setXpOrkpi] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const initialData = await getDataLeaderboard(
        idccms,
        1,
        "",
        "day",
        "My Team"
      );
      if (
        initialData &&
        initialData.status === 200 &&
        initialData.data.length === 3
      ) {
        const dataOrder = initialData.data[0].ScoreExp.sort(
          (a, b) => b.score - a.score
        );
        let cont = 1;
        dataOrder.forEach((el) => {
          if (el.score) {
            el.rank = cont;
            cont += 1;
          } else {
            el.rank = dataOrder.length;
          }
        });
        setKpis(initialData.data[1].ListKpi);
        setData(dataOrder);
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoading(true);
    if (filters.kpi === "") {
      setXpOrkpi(false);
      const getData = async () => {
        const initialData = await getDataLeaderboard(
          idccms,
          1,
          "",
          "day",
          "My Team"
        );
        if (
          initialData &&
          initialData.status === 200 &&
          initialData.data.length === 3
        ) {
          const dataOrder = initialData.data[0].ScoreExp.sort(
            (a, b) => b.score - a.score
          );
          let cont = 1;
          dataOrder.forEach((el) => {
            if (el.score) {
              el.rank = cont;
              cont += 1;
            } else {
              el.rank = dataOrder.length;
            }
          });
          setKpis(initialData.data[1].ListKpi);
          setData(dataOrder);
          setLoading(false);
        }
      };
      getData();
    } else {
      const getData = async () => {
        const filterData = await getDataLeaderboard(
          idccms,
          2,
          filters.kpi,
          filters.time,
          filters.group
        );
        if (
          filterData &&
          filterData.status === 200 &&
          filterData.data.length > 1
        ) {
          setXpOrkpi(true);
          const dataOrder = filterData.data[2].ScoreResultKpi.sort(
            (a, b) => b.KPIR - a.KPIR
          );
          let cont = 1;
          dataOrder.forEach((el) => {
            if (el.score) {
              el.rank = cont;
              cont += 1;
            } else {
              el.rank = dataOrder.length;
            }
          });
          setKpis(filterData.data[1].ListKpi);
          setData(dataOrder);
          setLoading(false);
        }
      };
      getData();
    }

    // eslint-disable-next-line
  }, [filters]);

  let ancho = ref.current !== undefined ? ref.current.clientWidth : 0;
  useEffect(() => {
    setWidth(ancho);
  }, [ancho]);

  return (
    <MainPage>
      <Grid marginTop={2}>
        <Header count={count} />
      </Grid>
      <Box margin="1rem 0" color="#3047B0">
        <Typography variant="h5" fontWeight="500">
          Leaderboard
        </Typography>
      </Box>
      <Grid container columnSpacing={3}>
        <Grid item xs={12}>
          <Box>
            <LeaderRankBoard
              kpis={kpis}
              setFilters={setFilters}
              leaderBoard={true}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <BoxContain ref={ref}>
            {!loading ? (
              <TableLeaderBoard width={width} data={data} xpOrkpi={xpOrkpi} />
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
              <PodiumLB podio={data} />
            </Box>
          </BoxContain>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default LeaderBoard;
