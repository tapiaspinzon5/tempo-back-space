import React from 'react'
import {Typography, Box, styled} from '@mui/material'


const BoxVinetas = styled(Box)(({ theme }) => ({
    width:'30rem',
    background:'red',
    height:'17rem',
    marginTop:'1rem',
    borderRadius:'10px',
    position:'fixed',
    zIndex:1000
}))

const OptionsProfile = () => {
  return (
    <BoxVinetas>
        <Typography variant="h1" color="initial">options profile</Typography>
    </BoxVinetas>
  )
}

export default OptionsProfile