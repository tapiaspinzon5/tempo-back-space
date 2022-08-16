import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { MdOutlineBarChart } from "react-icons/md";

const BoxHeaderCharts = styled(Box)(() => ({
  height: "5rem",
  background: "#f9f9f9",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "5px",
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));

const BoxCard = styled(Box)(() => ({
  display: "flex",
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "space-evenly",
  minWidth: "13rem",
  height: "80%",
  borderRadius: "10px",
  boxShadow: "0px 3px 6px #00000029",
  color: "#3047b0",
  marginRight: "1rem",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const HeaderCharts = ({ dato }) => {
  return (
    <BoxHeaderCharts>
      {dato && (
        <BoxCard>
          <MdOutlineBarChart size={22} />
          <Typography variant="body1" fontWeight={700}>
            {dato}
          </Typography>
          <Typography variant="h6">832sec</Typography>
        </BoxCard>
      )}
      {/* <BoxCard></BoxCard>
      <BoxCard></BoxCard>
      <BoxCard></BoxCard> */}
    </BoxHeaderCharts>
  );
};

export default HeaderCharts;
