import React from "react";
import { styled, Typography, Box, Radio } from "@mui/material";
import start from "../../../assets/Icons/start-icon.svg";
import level from "../../../assets/Icons/level-icon.svg";

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

export const UserChallenge = ({ user, handleUser }) => {
  return (
    <>
      <CardUser>
        
        <Radio
          checked={user?.isChecked || false}
          onChange={handleUser}
          value={user.Agent}
          name="radio-button"
          inputProps={{ "aria-label": "A" }}
        />
        <Box width="55%">
          <Typography variant="body1">{user.Agent}</Typography>
          <Typography variant="caption">
            Analista desarrollador Senior
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box display="flex" alignItems="center">
            <Typography variant="caption" marginRight={1}>
              5
            </Typography>
            <img src={level} alt="" height={20} />
          </Box>
          <Typography variant="caption">Level</Typography>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box display="flex" alignItems="center">
            <Typography variant="caption" marginRight={1}>
              {user.Experiences}
            </Typography>
            <img src={start} alt="" height={20} />
          </Box>
          <Typography variant="caption">Exp</Typography>
        </Box>
      </CardUser>
    </>
  );
};
