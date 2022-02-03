import React from "react";
import { styled } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const LinearProgressRanking = styled(LinearProgress)(({ theme }) => ({
  height: 8,

  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)"
        : "linear-gradient(180deg, #FF0082 0%, #780096 100%)",
  },
}));

const ProgresBar = ({ value }) => {
  return <LinearProgressRanking variant="determinate" value={value} />;
};

export default ProgresBar;
