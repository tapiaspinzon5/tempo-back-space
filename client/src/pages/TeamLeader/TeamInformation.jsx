import React from 'react'
import { Grid, Typography, styled, Box } from '@mui/material'
import { MainPage } from '../../assets/styled/muistyled'
import Footer from '../../components/Footer'
import Header from '../../components/homeUser/Header'
import ShowUser from '../../components/teamLeader/ShowUser'
import avatar from '../../assets/temp-image/avatar.png'
import ChallengeCard from '../../components/teamLeader/ChallengeCard'


const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  background: "#f9f9f9",
height: "50vh",
  borderRadius: "20px",
  overflowY: "scroll",
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

const userData =[
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 4712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 1712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 2712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 3712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 5712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 6712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 7712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 8712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 9712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 712377},
    {Agent:'Deiby Niño', Level:2, Experiences: 123, avatar:avatar,idccms: 2377},

]

const TeamInformation = () => {
    const handleUser=(idccms)=>{
        console.log('userSelect', idccms)
    }
  return (
    <MainPage>
    <Header/>
      <Typography variant="h5">Team Information</Typography>
<Grid container spacing={1}>
    <Grid item xs={12} md={6}>
        <Item>
        {
            userData.map((user, index)=>(
            <ShowUser user={user} key={index} handleUser={handleUser}/>
            ))
        }
        </Item>
    </Grid>
    <Grid item xs={12} md={6}>
        <Item>
            <ChallengeCard/>
            <ChallengeCard/>
            <ChallengeCard/>
            <ChallengeCard/>
        </Item>
    </Grid>
</Grid>
    <Footer/>
    </MainPage>
  )
}

export default TeamInformation