import React from "react";
import { Button, styled, Typography, Box, Tooltip } from "@mui/material";
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
    borderRadius: "10px",
    padding: ".6rem 1.2rem",
    color: "#3047b0",
    background: "#fff",
    "&:hover": {
      boxShadow: "0px 3px 6px #3047b0",
      background: "#e8e8e8",
    },
  },
}));

export const ChallengeCard = ({ data, handleSubmit }) => {
  return (
    <CardActiviy
      sx={{
        height: "90px",
        backgroundImage: `linear-gradient(90deg, rgba(52, 48, 102, 0.8), rgba(0, 135, 255, 0.2)), url(${image})`,
        backgroundSize: "cover",
      }}
    >
      <Box width="60%">
        <Typography variant="body1" color="#FFF">
          {data.Name}
        </Typography>
      </Box>

      {data.Status === 1 && (
        <Tooltip title={data.Description} placement="top" arrow>
          <Button
            onClick={() => handleSubmit(data)}
            disabled={data.Status === 1 ? false : true}
          >
            To Challenge{" "}
          </Button>
        </Tooltip>
      )}
    </CardActiviy>
  );
};
