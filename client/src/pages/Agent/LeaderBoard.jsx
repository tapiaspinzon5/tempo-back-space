import React, { useState, useEffect, useRef } from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MainPage, BoxContain } from "../../assets/styled/muistyled";
import Header from "../../components/homeUser/Header";
import PodiumLB from "../../components/progressCharts/PodiumLB";
import { getDataLeaderboard } from "../../utils/api";
import LeaderRankBoard from "../../components/LeaderBoard/LeaderRankBoard";
import TableLeaderBoard from "../../components/LeaderBoard/TableLeaderBoard";
import Footer from "../../components/Footer";
import LoadingComponent from "../../components/LoadingComponent";
import {
  deleteDuplicatesKpis,
  deleteDuplicatesScore,
} from "../../helpers/helpers";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";

const LeaderBoard = ({ count }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const ref = useRef();
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    kpi: "",
    time: "Day",
    group: "My Team",
  });
  const [xpOrkpi, setXpOrkpi] = useState(false);
  const [podium, setPodium] = useState([]);

  useEffect(() => {
    setLoading(true);
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
        initialData.data.length === 4 &&
        initialData.data[0].length !== 0
      ) {
        setPodium(initialData.data[3].Podium);
        const dataOrder = await deleteDuplicatesScore(
          initialData.data[0].ScoreExp
        );
        setKpis(initialData.data[1].ListKpi);
        setData(dataOrder);
        setLoading(false);
      } else if (initialData.data === "UnauthorizedError") {
        dispatch(logoutAction());
        navigate("/");
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
          filters.time,
          filters.group
        );
        if (
          initialData &&
          initialData.status === 200 &&
          initialData.data.length === 4
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
          setXpOrkpi(true);
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
              <Typography variant="h6" fontWeight="500" color="#3047B0">
                General Journey Podium
              </Typography>
              <PodiumLB podio={podium} />
            </Box>
          </BoxContain>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default LeaderBoard;
