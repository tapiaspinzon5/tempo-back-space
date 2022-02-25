import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, styled, Typography, Box, Divider, Button, IconButton, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import Header from "../../components/homeUser/Header";
import {FiPieChart} from 'react-icons/fi'
import { getKPIteamTL, getUsersKPI } from "../../utils/api";
import LoadingComponent from "../../components/LoadingComponent";
import Footer from "../../components/Footer";
import LineChartGP from "../../components/progressCharts/LineChartGP";

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
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  background: "#f9f9f9",
  minHeight: "50vh",
  borderRadius: "20px",
}));

const FollowingTeamsKPI = ({ count }) => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const [kpi, setKpi] = useState([]);
  const [usersKPI, setUsersKPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showChart, setShowChart] = useState(false)
  const [timeView, setTimeView] = useState("");
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
  });

  useEffect(() => {
    const getData = async () => {
      const data = await getKPIteamTL(idccms);
 console.log(data.data)
      if (data && data.status === 200 && data.data.length > 0) {
        setKpi(data.data[2].KpiDetallado);
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
      setUsersKPI(data.data);
    } else {
      setError(true);
    }
    setLoading(false);
  };
  console.log(kpi)
  console.log(usersKPI)


useEffect(() => {
  const handleChart =()=>{
    let seriesData =[]
    let categoriesData =[]
    usersKPI.forEach((dato) => {
      seriesData.push(dato.Actual);
      categoriesData.push(dato.Agent);
    });
    setOptions({...options,  xaxis : {categories: categoriesData}})
    setSeries( [{name: '', data: seriesData}])
  }

  handleChart(); 

}, [usersKPI]);

  return (
    <MainFT>
      <Header count={count} />
      <Typography variant="h5"> Following Team KPI</Typography>

      <Grid container>
        <KpiBox item xs={12} md={6}>
          <Item>
            <Typography variant="body1">KPIs Name Team - Campaña</Typography>
            <Divider sx={{ borderColor: "#e8e8e8" }} />

            {
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
           }
          </Item>
        </KpiBox>

        <UsersBox item xs={12} md={6}>

          <Item>
            <Box display="flex" justifyContent="space-between" padding="0 2rem"   alignItems='center'>
            {
showChart?
<Box sx={{ minWidth: 120 }}>
                {/* <FormControl fullWidth>
                  <InputLabel id="time-view-label">Time view</InputLabel>
                  <Select
                    labelId="time-view-label"
                    id="time-view"
                    value={timeView}
                    label="Time view"
                    onChange={(e) => setTimeView(e.target.value)}
                  >
                    <MenuItem value="Day">Day</MenuItem>
                    <MenuItem value="Month">Month</MenuItem>
                    <MenuItem value="Week">Week</MenuItem>
                  </Select>
                </FormControl> */}
              </Box>
              :
              <Typography variant="body1">Name</Typography>
            }
             <Box display='flex' alignItems='center'>
              <Typography variant="body1" marginRight='3rem'>{usersKPI[0]?.Kpi}</Typography>
              <IconButton onClick={ ()=> setShowChart(!showChart)} > <FiPieChart color='#3047B0'/></IconButton>
             </Box>
            </Box>
            <Divider sx={{ borderColor: "#e8e8e8" }} />
            
            {
              showChart?
              <LineChartGP series={series} options={options}/>
              :
              <>
                {
                  usersKPI.map((user)=>(
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
                }
              </>
            }
            
          </Item>
        </UsersBox>
      </Grid>
      <Footer />
    </MainFT>
  );
};

export default FollowingTeamsKPI;
