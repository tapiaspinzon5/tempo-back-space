import React, { useState, useRef, useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";
import { BoxContain, MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import { useDispatch } from "react-redux";
import Header from "../../components/homeUser/Header";
import LeaderRankBoard from "../../components/LeaderBoard/LeaderRankBoard";
import TableLeaderBoardRL from "../../components/LeaderBoard/TableLeaderBoardRL";
import PodiumLB from "../../components/progressCharts/PodiumLB";
import { deleteDuplicatesScore } from "../../helpers/helpers";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import { requestWithData } from "../../utils/api";

const LeaderBoardRL = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [xpOrkpi] = useState(false);
  const [width, setWidth] = useState(0);
  const [kpis, setKpis] = useState([]);
  const [data, setData] = useState([]);
  const [podium, setPodium] = useState([]);

  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    kpi: "",
    time: "Day",
    group: "",
  });

  let ancho = ref.current !== undefined ? ref.current.clientWidth : 0;
  useEffect(() => {
    setWidth(ancho);
  }, [ancho]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const initialData = await requestWithData("getplatformanalytics", {
        initDate: 0,
        endDate: 0,
        kpi: "0",
        context: 4,
        idCampaign: filters.group || 0,
      });
      if (
        initialData &&
        initialData.status === 200 &&
        initialData.data.length > 0
      ) {
        const initialData2 = await requestWithData("getplatformanalytics", {
          initDate: filters.start,
          endDate: filters.end,
          kpi: filters.kpi,
          context: 2,
        });
        if (
          initialData2 &&
          initialData2.status === 200 &&
          initialData2.data.length > 0
        ) {
          const dataOrder = await deleteDuplicatesScore(
            initialData2.data[0].Analitycs
          );
          setPodium(dataOrder.podium);
          setLoading(false);
        }
        setKpis(initialData.data[0].Kpis);
        setLoading(false);
      } else if (initialData.data === "UnauthorizedError") {
        dispatch(logoutAction());
        navigate("/");
      }
    };
    getData();
    // eslint-disable-next-line
  }, [filters.group]);

  useEffect(() => {
    if (filters.kpi !== "" && filters.start && filters.end) {
      setLoading(true);
      const getData = async () => {
        const initialData = await requestWithData("getplatformanalytics", {
          initDate: filters.start,
          endDate: filters.end,
          kpi: filters.kpi,
          context: 2,
          idCampaign: filters.group,
        });
        if (
          initialData &&
          initialData.status === 200 &&
          initialData.data.length > 0
        ) {
          const dataOrder = await deleteDuplicatesScore(
            initialData.data[0].Analitycs
          );
          setData(dataOrder.dataOrder);
          setPodium(dataOrder.podium);
          setLoading(false);
        }
      };
      getData();
    }

    // eslint-disable-next-line
  }, [filters]);

  console.log(filters);

  return (
    <MainPage>
      <Header />
      <Typography variant="h5">Leaderboard</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box>
            <LeaderRankBoard
              kpis={kpis}
              setFilters={setFilters}
              leaderBoard={false}
              leaderBoardRL={true}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <BoxContain ref={ref}>
            <TableLeaderBoardRL
              width={width}
              data={data}
              xpOrkpi={xpOrkpi}
              loading={loading}
            />
          </BoxContain>
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxContain
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width="100%"
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
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

export default LeaderBoardRL;
