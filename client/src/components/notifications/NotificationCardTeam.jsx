import React from "react";
import { Typography, Avatar, Box, styled, Divider } from "@mui/material";
import avatar from "../../assets/temp-image/avatar.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Reactions from "./Reactions";

const BoxCard = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "auto",
  justifyContent: "space-between",
  padding: "0 2rem",
  minHeight: "4rem",
  textTransform: "none",
  color: "#3047b0",
  div: {
    display: "flex",
    alignItems: "center",
  },
  "&:hover": {
    background: "#1b34a209",
    borderRadius: "3px",
  },
}));

const NotificationCardTeam = ({ info }) => {
  const userData = useSelector((store) => store.loginUser.userData);
  let fecha;
  let hora;
  let fechaBase = new Date(info.Date).toLocaleString([], {
    timeZone: "Etc/UTC",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let now = new Date().toLocaleString([], {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let fa = new Date(
    `${now.split("/")[1]}/${now.split("/")[0]}/${now.split("/")[2]}`
  );
  let fb = new Date(
    `${fechaBase.split("/")[1]}/${fechaBase.split("/")[0]}/${
      fechaBase.split("/")[2]
    }`
  );

  if (
    now.replace(",", "").split(" ")[0] ===
    fechaBase.replace(",", "").split(" ")[0]
  ) {
    hora = Math.trunc((fa - fb) / 60000);
    if (hora < 31) {
      fecha = `${hora} minutes ago`;
    } else {
      fecha = fechaBase.replace(",", "").split(" ")[1];
    }
  } else {
    fecha = fechaBase.replace(",", "").split(" ")[0];
  }

  return (
    <>
      <BoxCard>
        <Box>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            sx={{ width: 46, height: 46 }}
          />
          <Box display="flex" flexDirection="column" alignItems="rigth">
            <Typography variant="body2" marginLeft="1rem" align="left">
              {info.TypeNotification + "  " + info.Name}
            </Typography>
            <Reactions />
          </Box>
        </Box>
        <Typography variant="caption">{fecha}</Typography>
      </BoxCard>
      <Divider variant="middle" sx={{ borderColor: "#e8e8e8" }} />
    </>
  );
};

export default NotificationCardTeam;
