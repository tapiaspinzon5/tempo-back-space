import { Box, Typography, styled, Badge } from "@mui/material";
import React from "react";

const BoxBadgeUser = styled(Box)(() => ({
  color: "#3047b0",
  display: "flex",
  minHeight: "70vh",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1rem",
}));

const BoxBages = styled(Box)(() => ({
  height: "34.3rem",
  overflowY: "scroll",
  display:'flex',
  flexWrap:'wrap',
  justifyContent:'space-around',
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


const BadgesSection = ({badges}) => {

  return (
    <BoxBadgeUser>
      <Box>
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "white",
            width: "5rem",
            boxShadow: "0px 3px 3px #00000029",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          Badges
        </Typography>
      </Box>
      <BoxBages>
            {badges.map((badge, index)=>(
          <Badge
          key={index}
          sx={{marginBottom:'2rem'}}
          badgeContent={badge.NumBadges} color="primary"
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
>
<img src={badge.ImageBadge} alt={badge.Name}   height={120}
            style={badge.NumBadges>0?{
              filter: 'grayscale(0%)'
            }:{
              filter: 'grayscale(85%)'
            }} />
</Badge>       
            ))}
      </BoxBages>
    </BoxBadgeUser>
  );
};

export default BadgesSection;
