import React from "react";
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

const Notifications = () => {
  return (
    <div className="notifications">
      <BoxTitle>
        <Typography variant="h6" align="center">
          Notifications{" "}
        </Typography>
      </BoxTitle>

      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <Button sx={{ textTransform: "none" }}> See All</Button>
    </div>
  );
};

export default Notifications;
