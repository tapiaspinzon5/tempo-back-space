import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, styled } from "@mui/material";
import NotificationCard from "./NotificationCard";

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

const Notifications = ({ notifications }) => {
  const navigate = useNavigate();
  return (
    <div className="notifications">
      <BoxTitle>
        <Typography variant="h6" align="center">
          Notifications{" "}
        </Typography>
      </BoxTitle>
      <NotificationCard key={notifications[0].id} info={notifications[0]} />
      <NotificationCard key={notifications[1].id} info={notifications[1]} />
      <NotificationCard key={notifications[2].id} info={notifications[2]} />
      <NotificationCard key={notifications[3].id} info={notifications[3]} />
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
