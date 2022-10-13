import React from "react";
import { Typography, Avatar, Box, styled, Divider } from "@mui/material";
import avatar from "../../assets/temp-image/avatar.png";
import Reactions from "./Reactions";
import { dateFormat } from "../../helpers/helpers";

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
            <Reactions info={info} />
          </Box>
        </Box>
        <Typography variant="caption">{dateFormat(info.Date)}</Typography>
      </BoxCard>
      <Divider variant="middle" sx={{ borderColor: "#e8e8e8" }} />
    </>
  );
};

export default NotificationCardTeam;
