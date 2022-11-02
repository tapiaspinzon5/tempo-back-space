import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, styled } from "@mui/material";
import NotificationCard from "./NotificationCard";
import useClickOutside from "../../Hooks/useClickOutside";

const BoxNoti = styled(Box)(() => ({
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
}));

const BoxTitle = styled(Box)(() => ({
  height: "4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "1px 1px 15px #cfcdcd",
  borderRadius: "10px",
  h6: {
    color: "#3047b0",
    fontWeight: "500",
  },
}));

const Notifications = ({ notifications, setShowNotification }) => {
  const refNav = useRef();
  const navigate = useNavigate();

  //clickoutside
  useClickOutside(refNav, () => {
    setShowNotification(false);
  });

  return (
    <div className="notifications" ref={refNav}>
      <BoxTitle>
        <Typography variant="h6" align="center">
          Notifications{" "}
        </Typography>
      </BoxTitle>
      <BoxNoti>
        {notifications.length > 0 && (
          <NotificationCard
            key={notifications[0].IdNotification}
            info={notifications[0]}
          />
        )}
        {notifications.length > 1 && (
          <NotificationCard
            key={notifications[1].IdNotification}
            info={notifications[1]}
          />
        )}
        {notifications.length > 2 && (
          <NotificationCard
            key={notifications[2].IdNotification}
            info={notifications[2]}
          />
        )}
        {notifications.length > 3 && (
          <NotificationCard
            key={notifications[3].IdNotification}
            info={notifications[3]}
          />
        )}
      </BoxNoti>
      <Button
        sx={{ textTransform: "none" }}
        onClick={() => navigate("/notifications")}
      >
        {" "}
        See All
      </Button>
    </div>
  );
};

export default Notifications;
