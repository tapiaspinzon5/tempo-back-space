import React from "react";
import {
  Typography,
  Avatar,
  Box,
  styled,
  Divider,
  Button,
} from "@mui/material";
import avatar from "../../assets/temp-image/avatar.png";

const BoxCard = styled(Button)(() => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  padding: "0 2rem",
  height: "4rem",
  textTransform: "none",
  color: "#3047b0",
  div: {
    display: "flex",
    alignItems: "center",
  },
}));

const NotificationCard = ({ info }) => {
  let fecha = new Date(info.FchAssignment).toLocaleString([], {
    timeZone: "Etc/UTC",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  console.log("viene :", info.FchAssignment, "Queda:", fecha);
  return (
    <>
      <BoxCard>
        <Box>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            sx={{ width: 46, height: 46 }}
          />
          <Typography variant="body2" marginLeft="1rem">
            {info.Name}
          </Typography>
        </Box>
        <Typography variant="caption">{fecha}</Typography>
      </BoxCard>
      <Divider variant="middle" sx={{ borderColor: "#aaaaaa" }} />
    </>
  );
};

export default NotificationCard;
