import React, {useState, useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { BoxContain, MainPage } from '../../assets/styled/muistyled'
import Footer from '../../components/Footer'
import Header from '../../components/homeUser/Header'
import LeaderRankBoard from '../../components/LeaderBoard/LeaderRankBoard'
import TableAnalytics from '../../components/Analytics/TableAnalytics'
import LoadingComponent from '../../components/LoadingComponent'


const kpis =[

]

const AnalyticsRL = () => {
    const ref = useRef();
    const [loading, setLoading] = useState(false);
     const [width, setWidth] = useState(0);
    const [filters, setFilters] = useState({
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
         <Typography variant="h5" >Analytics</Typography>
    <Box>
        <LeaderRankBoard kpis={kpis} setFilters={setFilters} />
    </Box>
        <BoxContain ref={ref}>
            {!loading ? (
              <TableAnalytics width={width} 
              //data={data}
               />
            ) : (
              <LoadingComponent />
            )}
          </BoxContain>

    <Footer/>
    </MainPage>
  )
}

export default AnalyticsRL