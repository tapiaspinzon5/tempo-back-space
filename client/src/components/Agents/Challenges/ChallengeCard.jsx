import React from "react";
import { Button, styled, Typography, Box, Tooltip } from "@mui/material";
import start from "../../../assets/Icons/start-icon.svg";
import epiCoin from "../../../assets/Icons/epicoin-ico.svg";
import image from "../../../assets/temp-image/challenge.png";

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

export const ChallengeCard = ({ data, handleSubmit }) => {
  return (
    <CardActiviy
      sx={{
        backgroundImage: `linear-gradient(45deg, rgba(255, 0, 0, 0.2), rgba(0, 0, 150, 0.2)), url(${image})`,
      }}
    >
      <Box width="60%">
        <Typography variant="body1" color="#FFF">
          {data.Name}
        </Typography>
        <Typography variant="body2" color="#FFF">
          {data.Context}
        </Typography>
      </Box>
      {/* {<Box display="flex" alignItems="center">
        <img src={epiCoin} alt="" height={20} />
        <Typography variant="caption" marginLeft={1}>
          {data.RewardEpicoins
            ? data.RewardEpicoins + " Epicoins"
            : "0 Epicoins"}
        </Typography>
      </Box>}
      <Box display="flex" alignItems="center">
        <img src={start} alt="" height={20} />
        <Typography variant="caption" marginLeft={1}>
          {data.RewardPoints + " Points"}
        </Typography>
      </Box> */}
      <Tooltip title={data.Description} placement="top" arrow>
        <Button onClick={handleSubmit} sx={{ color: "#FFF" }}>
          To Challenge{" "}
        </Button>
      </Tooltip>
    </CardActiviy>
  );
};
