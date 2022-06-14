import React from "react";
import { Box, Typography, styled, Button, Avatar } from "@mui/material";
import start from "../../assets/Icons/start-icon.svg";
import level from "../../assets/Icons/level-icon.svg";

const CardUser = styled(Button)(() => ({
  background: "#fff",
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1.5rem",
  borderRadius: "10px",
  marginBottom: "10px",
  color: "#3047b0",
  textTransform: "none",
}));

const ShowUser = ({ user, handleUser, active }) => {
  return (
    <CardUser
      onClick={() => handleUser(user.Ident)}
      sx={active === user.Ident ? { boxShadow: "4px 4px 8px #a2a2a2" } : {}}
    >
      <Avatar alt={user.Agent} src={user.avatar} />
      <Box width="55%" textAlign="left">
        <Typography variant="body1">{user.Agent}</Typography>
        <Typography variant="caption">{user.Cargo}</Typography>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Typography variant="caption" marginRight={1}>
            {user.Nivel}
          </Typography>
          <img src={level} alt="" height={20} />
        </Box>
        <Typography variant="caption">Level</Typography>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Typography variant="caption" marginRight={1}>
            {user.ExpPoint}
          </Typography>
          <img src={start} alt="" height={20} />
        </Box>
        <Typography variant="caption">Exp</Typography>
      </Box>
    </CardUser>
  );
};

export default ShowUser;
