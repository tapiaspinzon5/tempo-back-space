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
import { useNavigate } from "react-router-dom";
import { updateStatusNotifications } from "../../utils/api";
import { useSelector } from "react-redux";

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
  const navigate = useNavigate();
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
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
      fecha = `${hora} minuts ago`;
    } else {
      fecha = fechaBase.replace(",", "").split(" ")[1];
    }
  } else {
    fecha = fechaBase.replace(",", "").split(" ")[0];
  }
  console.log(fa, fb, fecha);
  const handleClick = async () => {
    await updateStatusNotifications(idccms, info.IdNotification);
    navigate(`/activitiesview/${info.IdChallenge}/${2}`);
  };

  return (
    <>
      <BoxCard onClick={handleClick}>
        <Box>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            sx={{ width: 46, height: 46 }}
          />
          <Typography variant="body2" marginLeft="1rem">
            {info.TypeNotification + "  " + info.Name}
          </Typography>
        </Box>
        <Typography variant="caption">{fecha}</Typography>
      </BoxCard>
      <Divider variant="middle" sx={{ borderColor: "#e8e8e8" }} />
    </>
  );
};

export default NotificationCard;
