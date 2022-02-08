import React from "react";
import { Typography, Grid, styled, Box } from "@mui/material";
import Header from "../components/homeUser/Header";
import NotificationCard from "../components/notifications/NotificationCard";
import Footer from "../components/Footer";
const MainNotification = styled(Grid)(() => ({
  width: "100%",
  h6: {
    color: "#3047b0",
    fontWeight: "500",
    margin: "1rem 0 2rem 0",
  },
}));

const NotiBox = styled(Box)(() => ({
  height: "60vh",
  overflowY: "scroll",
  backgroundColor: "#f9f9f9",
  borderRadius: "20px",
  padding: "1rem",
  "&::-webkit-scrollbar": {
    width: "6px" /* width of the entire scrollbar */,
  },

  "&::-webkit-scrollbar-track": {
    background: "white" /* color of the tracking area */,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8" /* color of the scroll thumb */,
    borderRadius: "20px" /* roundness of the scroll thumb */,
    //border: "3px solid transparent" /* creates padding around scroll thumb */,
  },
}));

const NotificationsPage = () => {
  return (
    <MainNotification>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="initial">
            Me Notifications
          </Typography>
          <NotiBox>
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </NotiBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="initial">
            Team Notifications
          </Typography>
          <NotiBox>
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </NotiBox>
        </Grid>
      </Grid>
      <Footer />
    </MainNotification>
  );
};

export default NotificationsPage;
