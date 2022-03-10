import React from 'react'
import { Box, Typography, styled, Button, Avatar } from '@mui/material'
import start from "../../assets/Icons/start-icon.svg";
import level from "../../assets/Icons/level-icon.svg";

const CardUser = styled(Button)(() => ({
  background: "#fff",
  display: "flex",
  width:'100%',
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1.5rem",
  borderRadius: "10px",
  marginBottom: "10px",
  color: "#3047b0",
  textTransform:'none'
}));


const ShowUser = ({user, handleUser}) => {
  return (

        
      <CardUser onClick={()=>handleUser(user.idccms)}>
      <Avatar alt={user.Agent} src={user.avatar}/>
        <Box width="55%" textAlign='left'>
          <Typography variant="body1">{user.Agent}</Typography>
          <Typography variant="caption">
            Analista desarrollador Senior
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box display="flex" alignItems="center">
            <Typography variant="caption" marginRight={1}>
              {user.Level}
            </Typography>
            <img src={level} alt="" height={20} />
          </Box>
          <Typography variant="caption">Level</Typography>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box display="flex" alignItems="center">
            <Typography variant="caption" marginRight={1}>
              {user.Experiences}
            </Typography>
            <img src={start} alt="" height={20} />
          </Box>
          <Typography variant="caption">Exp</Typography>
        </Box>
      </CardUser>


  )
}

export default ShowUser