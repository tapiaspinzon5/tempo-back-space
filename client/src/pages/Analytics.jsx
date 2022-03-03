import React, { useState, useEffect, useRef } from "react";
import { Typography, Grid, styled, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { MainPage, BoxContain } from "../assets/styled/muistyled";
import Header from "../components/homeUser/Header";
import { getDataLeaderboard } from "../utils/api";
import LeaderRankBoard from "../components/LeaderBoard/LeaderRankBoard";
import Footer from "../components/Footer";
import LoadingComponent from "../components/LoadingComponent";
import TableAnalytics from "../components/Analytics/TableAnalytics";
import {
  deleteDuplicatesKpis,
  deleteDuplicatesScore,
} from "../helpers/helpers";

const Analytics = ({ count }) => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const ref = useRef();
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    time: "Day",
    group: "My Team",
  });

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
      const getData = async () => {
        const initialData = await getDataLeaderboard(
          idccms,
          1,
          "",
          filters.time,
          filters.group
        );
        if (
          initialData &&
          initialData.status === 200 &&
          initialData.data.length === 3
        ) {
          const dataOrder = await deleteDuplicatesScore(
            initialData.data[0].ScoreExp
          );
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
          const dataOrder = await deleteDuplicatesKpis(
            filterData.data[2].ScoreResultKpi,
            filters.time
          );

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
          Analytics
        </Typography>
      </Box>
      <Grid container columnSpacing={3}>
        <Grid item xs={12}>
          <Box>
            <LeaderRankBoard kpis={kpis} setFilters={setFilters} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <BoxContain ref={ref}>
            {!loading ? (
              <TableAnalytics width={width} data={data} />
            ) : (
              <LoadingComponent />
            )}
          </BoxContain>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default Analytics;
