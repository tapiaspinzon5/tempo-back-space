import React from "react";
import { Button, styled, Typography, Box, Tooltip } from "@mui/material";
import start from "../../assets/Icons/start-icon.svg";
import epiCoin from "../../assets/Icons/epicoin-ico.svg";

const CardActiviy = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#fff",
  color: "#3047b0",
  padding: "1rem",
  borderRadius: "20px",
  marginBottom: "3px",

  button: {
    textTransform: "none",
    border: "1px solid blue",
    padding: "0 15px",
  },
}));

const ShowActivity = () => {
  return (
    <CardActiviy>
      <input type="checkbox" className="checkBox" />
      <Box>
        <Typography variant="body1">Welcome to EGP</Typography>
        <Typography variant="body2">Gaming stuff</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <img src={epiCoin} alt="" height={20} />
        <Typography variant="caption" marginLeft={1}>
          5 epicoins
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <img src={start} alt="" height={20} />
        <Typography variant="caption" marginLeft={1}>
          10 points
        </Typography>
      </Box>
      <Tooltip
        title="observaciones del tipo de actividad"
        placement="top"
        arrow
      >
        <Button>Details </Button>
      </Tooltip>
    </CardActiviy>
  );
};

export default ShowActivity;
