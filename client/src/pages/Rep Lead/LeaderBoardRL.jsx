import React, {useState, useRef, useEffect} from 'react'
import { Typography, Grid, Box } from '@mui/material'
import { BoxContain, MainPage } from '../../assets/styled/muistyled'
import Footer from '../../components/Footer'
import Header from '../../components/homeUser/Header'
import LeaderRankBoard from '../../components/LeaderBoard/LeaderRankBoard'
import TableLeaderBoard from '../../components/LeaderBoard/TableLeaderBoard'
import PodiumLB from '../../components/progressCharts/PodiumLB'

const LeaderBoardRL = () => {
  const ref = useRef();

  const [xpOrkpi, setXpOrkpi] = useState(false);
  const [width, setWidth] = useState(0);
  const [kpis, setKpis] = useState([]);
  const [data, setData] = useState([]);
  const [podium, setPodium] = useState([]);
  const [filters, setFilters] = useState({
    kpi: "",
    time: "Day",
    group: "My Team",
  });

  let ancho = ref.current !== undefined ? ref.current.clientWidth : 0;
  useEffect(() => {
    setWidth(ancho);
  }, [ancho]);

  return (
        <MainPage>
    <Header/>
   <Typography variant="h5" >Leaderboard</Typography>
   <Grid container spacing={1}>
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
     <TableLeaderBoard width={width} data={data} xpOrkpi={xpOrkpi} />
     </BoxContain>    
     </Grid>
     <Grid item xs={12} md={4}>
     
     <BoxContain
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box  width="100%" textAlign='center' display='flex' flexDirection='column' justifyContent='space-between'>
              <Typography variant="h6" fontWeight="500" color="#3047B0">
                General Journey Podium
              </Typography>
              <PodiumLB podio={podium} />
            </Box>
          </BoxContain>


     
     </Grid>
   </Grid>
    
    <Footer/>
    
    </MainPage>
  )
}

export default LeaderBoardRL