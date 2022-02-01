import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  styled,
  Typography,
  Box,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import Header from "../../components/homeUser/Header";
//import ProgresBar from "../../components/progressCharts/ProgresBar";
import { getKPIteamTL, getUsersKPI } from "../../utils/api";

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
  const idccms = userData.idccms;
  const [kpi, setKpi] = useState([]);
  const [usersKPI, setUsersKPI] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getKPIteamTL(idccms);
      setKpi(data.data);
    };

    getData();
    handleKPI();
  }, []);

  const handleKPI = async (idKPI) => {
    const data = await getUsersKPI(idccms, idKPI || 2);
    setUsersKPI(data.data);
  };
  console.log("users", usersKPI);

  return (
    <MainFT>
      <Header />
      <Typography variant="h5"> Following Team KPI</Typography>

      <Grid container>
        <KpiBox item xs={12} md={6}>
          <Item>
            <Typography variant="body1">KPIs Name Team - Campaña</Typography>
            <Divider sx={{ borderColor: "#e8e8e8" }} />

            {kpi.map((detail) => (
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
            ))}
          </Item>
        </KpiBox>

        <UsersBox item xs={12} md={6}>
          <Item>
            <Box display="flex" justifyContent="space-between" padding="0 2rem">
              <Typography variant="body1">Name</Typography>
              <Typography variant="body1">{usersKPI[0]?.Kpi}</Typography>
            </Box>
            <Divider sx={{ borderColor: "#e8e8e8" }} />
            {usersKPI.map((user) => (
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
            ))}
          </Item>
        </UsersBox>
      </Grid>
    </MainFT>
  );
};

export default FollowingTeamsKPI;
