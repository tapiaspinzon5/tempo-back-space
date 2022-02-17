import React from "react";
import { Typography, styled, Box } from "@mui/material";
import tpv1 from "../../assets/images/tpv/tpv1.png";
import tpv2 from "../../assets/images/tpv/tpv2.png";
import tpv3 from "../../assets/images/tpv/tpv3.png";
import tpv4 from "../../assets/images/tpv/tpv4.png";
import tpv5 from "../../assets/images/tpv/tpv5.png";

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
  minHeight: "70vh",
  flexDirection: "column",
  justifyContent: "space-between",

  padding: "1rem",
}));
const CardTPV = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.551rem",
  img: {
    height: "5rem",
  },
}));

const TPVSection = () => {
  return (
    <BoxTPVUser>
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
          TPV's
        </Typography>
        <Typography variant="body1" textAlign="right">
          Accumulated
        </Typography>
      </Box>

      {tpv.map((data, index) => (
        <CardTPV key={index}>
          <img src={data.image} alt={data.msj} />
          <Box width="60%">
            <Typography variant="body2">{data.msj}</Typography>
          </Box>
          <Typography variant="body1">{data.amount}</Typography>
        </CardTPV>
      ))}
    </BoxTPVUser>
  );
};

export default TPVSection;
