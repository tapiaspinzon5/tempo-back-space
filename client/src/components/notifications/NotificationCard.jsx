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
import { dateFormat } from "../../helpers/helpers";
import like from "../../assets/Icons/like.png";
import love from "../../assets/Icons/love.png";
import great from "../../assets/Icons/great.png";
import Reactions from "./Reactions";

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

const reactionOptions = [
  { img: like, type: 1 },
  { img: love, type: 2 },
  { img: great, type: 3 },
];

const NotificationCard = ({ info, team }) => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.loginUser.userData);
  const { Reaction } = info;

  const handleClick = async () => {
    await updateStatusNotifications(info.IdNotification);
    if (userData.Role === "Team Leader") {
      navigate("/notifications");
    } else {
      if (info.TypeActivity === "Challenge") {
        navigate(`/activitiesview/${info.IdChallenge}/${2}`);
      } else if (info.TypeActivity === "Activity") {
        navigate(`/activitiesview/${info.IdChallenge}/${1}`);
      } else if (info.TypeActivity === "Mission") {
        navigate(`/activitiesview`);
      } else if (info.TypeActivity === "Tpvs") {
        navigate(`/profile`);
      } else {
        navigate("/notifications");
      }
    }
  };

  return (
    <>
      <BoxCard onClick={handleClick} disabled={team}>
        <Box>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            sx={{ width: 46, height: 46, marginRight: "1rem" }}
          />
          {reactionOptions.map(
            (option) =>
              Reaction === option.type && (
                <img
                  className={"reaction"}
                  src={option.img}
                  alt="Reaction"
                  key={option.type}
                  height={30}
                />
              )
          )}
          <Box display="flex" flexDirection="column">
            <Typography variant="body2" marginLeft="1rem" align="left">
              {info.TypeNotification + " "} {info.Name || ""}
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption">{dateFormat(info.Date)}</Typography>
      </BoxCard>
      {info.TypeActivity !== "Reaction" && (
        <Box paddingLeft={5}>
          <Reactions info={info} user={true} />
        </Box>
      )}
      <Divider variant="middle" sx={{ borderColor: "#e8e8e8" }} />
    </>
  );
};

export default NotificationCard;
