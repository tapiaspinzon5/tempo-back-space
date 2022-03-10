import React from "react";
import { Typography, styled, Box } from "@mui/material";
import tpv1 from "../../assets/images/tpv/tpv1.png";
import tpv2 from "../../assets/images/tpv/tpv2.png";
import tpv3 from "../../assets/images/tpv/tpv3.png";
import tpv4 from "../../assets/images/tpv/tpv4.png";
import tpv5 from "../../assets/images/tpv/tpv5.png";

const tpv = [
  { image: tpv1 },
  { image: tpv2 },
  { image: tpv3 },
  { image: tpv4 },
  { image: tpv5 },
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

const TPVSection = ({ tpvs }) => {
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

      {tpvs.map((data, index) => (
        <CardTPV key={index}>
          <img src={tpv[index].image} alt={data.Element} />
          <Box width="60%">
            <Typography variant="body2">{data.TPV}</Typography>
          </Box>
          <Typography variant="body1">{data.Accumulated}</Typography>
        </CardTPV>
      ))}
    </BoxTPVUser>
  );
};

export default TPVSection;
