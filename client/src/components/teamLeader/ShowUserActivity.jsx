import React from "react";
import { Button, styled, Typography, Box, Grid } from "@mui/material";
import start from "../../assets/Icons/start-icon.svg";
import level from "../../assets/Icons/level-icon.svg";

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

const ShowUserActivity = ({ user, handleUser }) => {
  return (
    <>
      <CardUser>
        <input
          type="checkbox"
          className="checkBox"
          name={user.name}
          checked={user?.isChecked || false}
          onChange={handleUser}
        />
        <Box>
          <Typography variant="body1">{user.name}</Typography>
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
              110
            </Typography>
            <img src={start} alt="" height={20} />
          </Box>
          <Typography variant="caption">Exp</Typography>
        </Box>
      </CardUser>
    </>
  );
};

export default ShowUserActivity;
