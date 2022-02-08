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

const NotificationCard = () => {
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
            Titulo de la notificaciones
          </Typography>
        </Box>
        <Typography variant="caption">5 min ago</Typography>
      </BoxCard>
      <Divider variant="middle" sx={{ borderColor: "#e8e8e8" }} />
    </>
  );
};

export default NotificationCard;
