import React from "react";
import { Typography, styled, Box, Button } from "@mui/material";
import tpv1 from "../../../assets/images/tpv/tpv1.png";
import tpv2 from "../../../assets/images/tpv/tpv2.png";
import tpv3 from "../../../assets/images/tpv/tpv3.png";
import tpv4 from "../../../assets/images/tpv/tpv4.png";
import tpv5 from "../../../assets/images/tpv/tpv5.png";

const tpv = [
  { image: tpv1, msj: "You're fun to work with", amount: 110 },
  { image: tpv2, msj: "You're a great leader", amount: 234 },
  { image: tpv3, msj: "Thanks for your help", amount: 320 },
  { image: tpv4, msj: "You're a Gamification wizard", amount: 111 },
  { image: tpv5, msj: "You're a great friend at work", amount: 97 },
];

const BoxTPVUser = styled(Box)(() => ({
  color: "#3047b0",
  display: "flex",
  flexDirection: "column",
  padding: " .5rem",
}));
const CardTPV = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: ".551rem",
  backgroundColor: "#FFF",
   borderRadius: "10px",
   overflow:'hidden', 
  img: {
    height: "4.5rem",
    margin:'.5rem'
  },
  button:{
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "10px",
    textTransform: "none",
    padding:'.3rem 2.5rem',
    '&:hover':{
      boxShadow: "0px 3px 6px #3047b0",
     background:'#e9e9e9',      
    }
  }
}));

const TPVSectionChallenge = () => {
  return (
    <BoxTPVUser>
      {tpv.map((data, index) => (
        <CardTPV
          key={index}
        >
          <img src={data.image} alt={data.msj} />
          <Box width="60%">
            <Typography variant="body2">{data.msj}</Typography>
          </Box>
          <Button sx={{ color: "#3047B0", mr: "8px" }}>Send </Button>
        </CardTPV>
      ))}
    </BoxTPVUser>
  );
};

export default TPVSectionChallenge;