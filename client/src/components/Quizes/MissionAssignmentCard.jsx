import React from "react";
import { Box, styled, Typography } from "@mui/material";

const CardUser = styled(Box)(() => ({
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem",
  borderRadius: "20px",
  marginBottom: "3px",
  color: "#3047b0",
}));
const MissionAssignmentCard = ({ mission, handleMissions }) => {
  return (
    <CardUser>
      <input
        type="checkbox"
        className="checkBox"
        name={mission?.QuizName}
        checked={mission?.isChecked || false}
        onChange={handleMissions}
      />
      <Box width="55%">
        <Typography variant="body1">{mission.QuizName}</Typography>
        <Typography variant="caption">topic</Typography>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Typography variant="caption" marginRight={1}>
            5
          </Typography>
        </Box>
        <Typography variant="caption">Level</Typography>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Typography variant="caption" marginRight={1}>
            algo
          </Typography>
        </Box>
        <Typography variant="caption">Exp</Typography>
      </Box>
    </CardUser>
  );
};

export default MissionAssignmentCard;
