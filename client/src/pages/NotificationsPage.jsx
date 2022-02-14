import React, { useEffect, useState, useRef } from "react";
import { Typography, Grid, styled, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import Header from "../components/homeUser/Header";
import NotificationCard from "../components/notifications/NotificationCard";
import Footer from "../components/Footer";
import { getNotifications } from "../utils/api";
import LoadingComponent from "../components/LoadingComponent";
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
  const [skipUser, setSkipUser] = useState(0);
  const [limitUser, setLimitUser] = useState(9);
  const [skipTeam, setSkipTeam] = useState(0);
  const [limitTeam, setLimitTeam] = useState(9);
  const [pageUser, setPageUser] = useState(1);
  const [pageTeam, setPageTeam] = useState(1);
  const [countUser, setCountUser] = useState(0);
  const [countTeam, setCountTeam] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    setLoading(true);
    const traerNotificaciones = async () => {
      const data = await getNotifications(idccms, skipUser, limitUser, 1);
      setNotificationUser(data.data);
      const pages =
        data.data[0].NotificationRead + data.data[0].NotificationUnread;
      setCountUser(parseInt(pages / 10 + 1));
      setLoading(false);
    };
    traerNotificaciones();
  }, [limitUser]);

  useEffect(() => {
    setLoading2(true);
    const traerNotificaciones = async () => {
      const dataTeam = await getNotifications(idccms, skipTeam, limitTeam, 2);
      setNotificationTeam(dataTeam.data);
      const pagesTeam =
        dataTeam.data[0].NotificationRead + dataTeam.data[0].NotificationUnread;
      setCountTeam(parseInt(pagesTeam / 10 + 1));
      setLoading2(false);
    };
    traerNotificaciones();
  }, [limitTeam]);

  const paginationUser = (e, value) => {
    setPageUser(value);
    if (value !== 1) {
      setSkipUser(() => (value - 1) * 10);
      setLimitUser(() => value * 10);
    } else {
      setSkipUser(() => 0);
      setLimitUser(() => 9);
    }
  };
  const paginationTeam = (e, value) => {
    setPageTeam(value);
    if (value !== 1) {
      setSkipTeam(() => (value - 1) * 10);
      setLimitTeam(() => value * 10);
    } else {
      setSkipTeam(() => 0);
      setLimitTeam(() => 9);
    }
  };

  return (
    <MainNotification>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="initial">
            Me Notifications
          </Typography>
          <NotiBox>
            {loading ? (
              <LoadingComponent />
            ) : (
              <div>
                {notificationUser.map((note, index) => (
                  <NotificationCard info={note} key={index} />
                ))}
              </div>
            )}
          </NotiBox>
          <Stack spacing={2}>
            <Pagination
              count={countUser}
              color="primary"
              size="large"
              onChange={paginationUser}
              page={pageUser}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="initial">
            Team Notifications
          </Typography>

          <NotiBox>
            {loading2 ? (
              <LoadingComponent />
            ) : (
              notificationTeam.map((note, index) => (
                <NotificationCard info={note} key={index} />
              ))
            )}
          </NotiBox>
          <Box display="flex" justifyContent="right">
            <Stack spacing={2}>
              <Pagination
                count={countTeam}
                color="primary"
                size="large"
                onChange={paginationTeam}
                page={pageTeam}
              />
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </MainNotification>
  );
};

export default NotificationsPage;
