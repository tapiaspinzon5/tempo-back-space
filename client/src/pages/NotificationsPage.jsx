import React, { useEffect, useState } from "react";
import { Typography, Grid, styled, Box } from "@mui/material";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/homeUser/Header";
import NotificationCard from "../components/notifications/NotificationCard";
import Footer from "../components/Footer";
import { getNotifications } from "../utils/api";
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
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;

  const [notificationUser, setNotificationUser] = useState([]);
  const [notificationTeam, setNotificationTeam] = useState([]);
  const [userNot, setuserNot] = useState({
    skip: 0,
    limit: 4,
  });
  const [teamNot, setTeamNot] = useState({
    skip: 0,
    limit: 4,
  });

  useEffect(() => {
    const traerNotificaciones = async () => {
      console.log("trayendo datos ", userNot);
      const data = await getNotifications(idccms, 0, 30, 1);
      setNotificationUser(data.data);
    };
    traerNotificaciones();
  }, [userNot]);
  useEffect(() => {
    const traerNotificaciones = async () => {
      const dataTeam = await getNotifications(
        idccms,
        teamNot.skip,
        teamNot.limit,
        2
      );
      setNotificationTeam(dataTeam.data);
    };
    traerNotificaciones();
  }, []);

  const pagination = () => {
    console.log("pagination");
    setuserNot({
      ...userNot,
      skip: userNot.skip + 5,
      limit: userNot.limit + 5,
    });
  };

  console.log(userNot);
  console.log(notificationUser);
  // console.log(notificationTeam);
  return (
    <MainNotification>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="initial">
            Me Notifications
          </Typography>
          <NotiBox>
            <InfiniteScroll
              dataLength={notificationUser.length}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              next={pagination}
            >
              <div>
                {notificationUser.map((note) => (
                  <NotificationCard info={note} />
                ))}
              </div>
            </InfiniteScroll>
          </NotiBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="initial">
            Team Notifications
          </Typography>
          <NotiBox>
            {notificationTeam.map((note) => (
              <NotificationCard info={note} />
            ))}
          </NotiBox>
        </Grid>
      </Grid>
      <Footer />
    </MainNotification>
  );
};

export default NotificationsPage;
