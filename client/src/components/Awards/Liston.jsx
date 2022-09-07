import { Box, Typography, styled } from "@mui/material";
import React from "react";
import liston from "../../assets/images/awards/liston.png";

const ListonBox = styled(Box)(() => ({
  height: "70px",

  //   background: "red",
  //   clipPath: "polygon(0 0, 11% 8%, 27% 13%, 77% 13%, 88% 10%, 100% 0, 100% 99%, 86% 92%, 47% 89%, 11% 93%, 0 99%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${liston})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  p: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "22px",
  },
}));

const Liston = ({ name }) => {
  return (
    <ListonBox width="280px">
      <Typography variant="body1" color="initial">
        {name}
      </Typography>
    </ListonBox>
  );
};

export default Liston;
