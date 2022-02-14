import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, styled, Typography, Box, Divider, Button } from "@mui/material";
import Header from "../../components/homeUser/Header";
//import ProgresBar from "../../components/progressCharts/ProgresBar";
import { getKPIteamTL, getUsersKPI } from "../../utils/api";
import LoadingComponent from "../../components/LoadingComponent";
import Footer from "../../components/Footer";

const MainFT = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },

  h5: {
    fontWeight: "700",
    color: "#3047B0",
    margin: "2rem 0",
  },
}));

const KpiBox = styled(Grid)(() => ({
  height: "70vh",
  width: "100%",
  borderRadius: "20px",
  padding: "0  1rem 0 0 ",
  p: {
    color: "#3047B0",
    fontWeight: 500,
  },
}));
const UsersBox = styled(Grid)(() => ({
  borderRadius: "20px",
  padding: " 0 0 0 1rem",
  overflowY: "scroll",
  height: "65vh",
  p: {
    color: "#3047B0",
    fontWeight: 700,
  },
}));

// const Item = styled(Box)(() => ({
//   background: "red",
//   height: "70vh",
//   width: "100%",
//   borderRadius: "20px",
// }));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  background: "#f9f9f9",
  minHeight: "50vh",
  borderRadius: "20px",
}));

const FollowingTeamsKPI = () => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const [kpi, setKpi] = useState([]);
  const [usersKPI, setUsersKPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getKPIteamTL(idccms);
      if (data && data.status === 200 && data.data.length > 3) {
        setKpi(data.data);
      } else {
        setError(true);
      }
    };
    getData();
    handleKPI();
    setLoading(false);
  }, []);

  const handleKPI = async (idKPI) => {
    setLoading(true);
    const data = await getUsersKPI(idccms, idKPI ? idKPI : 1);
    if (data && data.status === 200 && data.data.length > 1) {
      await setUsersKPI(data.data);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <MainFT>
      <Header />
      <Typography variant="h5"> Following Team KPI</Typography>

      <Grid container>
        <KpiBox item xs={12} md={6}>
          <Item>
            <Typography variant="body1">KPIs Name Team - Campaña</Typography>
            <Divider sx={{ borderColor: "#e8e8e8" }} />

            {!error ? (
              kpi?.map((detail) => (
                <Box
                  key={detail.IdRegistryKpi}
                  sx={{
                    boxShadow: "3px 3px 3px #e8e8e8",
                    height: "4rem",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 1rem 0 .5rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" color="initial">
                      {detail.Kpi}
                    </Typography>
                    <Button
                      sx={{ textTransform: "none" }}
                      size="small"
                      onClick={() => handleKPI(detail.IdRegistryKpi)}
                    >
                      See more{" "}
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="h5" fontWeight={500}>
                Information will be uploaded soon
              </Typography>
            )}
          </Item>
        </KpiBox>

        <UsersBox item xs={12} md={6}>
          <Item>
            <Box display="flex" justifyContent="space-between" padding="0 2rem">
              <Typography variant="body1">Name</Typography>
              <Typography variant="body1">{usersKPI[0]?.Kpi}</Typography>
            </Box>
            <Divider sx={{ borderColor: "#e8e8e8" }} />
            {!error ? (
              !loading ? (
                usersKPI.map((user) => (
                  <Box
                    key={user.Idccms}
                    sx={{
                      boxShadow: "3px 3px 3px #e8e8e8",
                      height: "3rem",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 1rem 0 .5rem",
                      "&:hover": {
                        background: "#0000ff05",
                        p: {
                          color: "red",
                        },
                      },
                    }}
                  >
                    <Typography variant="body2"> {user.Agent}</Typography>
                    <Typography variant="body2">
                      {" "}
                      {user.Actual.toFixed(2)}%
                    </Typography>
                  </Box>
                ))
              ) : (
                <LoadingComponent />
              )
            ) : (
              <Typography variant="h5" fontWeight={500}>
                Information will be uploaded soon
              </Typography>
            )}
          </Item>
        </UsersBox>
      </Grid>
      <Footer />
    </MainFT>
  );
};

export default FollowingTeamsKPI;
