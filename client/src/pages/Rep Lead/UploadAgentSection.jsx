import React from 'react'
import { Typography } from '@mui/material'
import { MainPage } from '../../assets/styled/muistyled'
import Footer from '../../components/Footer'
import Header from '../../components/homeUser/Header'

const UploadAgentSection = () => {
  return (
        <MainPage>
    <Header/>
       <Typography variant="h5" >Agent Upload Section (Crew Assignment)</Typography>

    <Footer/>
    
    </MainPage>
  )
}

export default UploadAgentSection