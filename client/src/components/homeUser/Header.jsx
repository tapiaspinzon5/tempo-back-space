import React, { useEffect, useState } from "react";
import {
  IconButton,
  styled,
  Grid,
  Badge,
  Box,
  Typography,
  Modal,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import bannerH from "../../assets/images/bannerHeader.png";
import Notifications from "../notifications/Notifications";
import { downloadNotifications } from "../../utils/api";
import ProgresBar from "../progressCharts/ProgresBar";
import epicoinICO from "../../assets/Icons/epicoin-ico.svg";
import { IoIosNotificationsOutline } from "react-icons/io";

import Achievement from "../../assets/Icons/Achievement.png";
import { headerDataAction } from "../../redux/homeDataDuck";
import { headerDataTlAction } from "../../redux/homeDataDuckTL";
import MainAwards from "../Awards/MainAwards";
import { validateDate } from "../../helpers/helpers";
import CryptoJS from "crypto-js";
import { readUserActiveAction } from "../../redux/loginDuck";

const TitleHeader = styled(Grid)(() => ({
  height: "11vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px ",
  background: "linear-gradient(90deg, #3047B0 0%, #0087FF 100%)",
  img: {
    maxHeight: "9vh",
    maxWidth: "90%",
  },
}));

const RightHeader = styled(Box)(() => ({
  borderRadius: "10px",
  height: "11vh",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  backgroundImage: `url(${bannerH})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
}));

const ModalBox = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  boxShadow: "2px 2px 5px #2f2f2f",
  padding: "1rem",
  backgroundColor: "RGBA(255,255,255,0.9)",
}));

const Header = ({ count }) => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.loginUser.userData);
  const homeData = useSelector((store) => store.homeData.homeData);
  const headerData = useSelector((store) => store.homeData.headerData);
  const headerDataTl = useSelector((store) => store.homeDataTl.headerData);
  const [cont, setCont] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = React.useState(false);

  //controles Dark mode

  const [showNotification, setShowNotification] = useState(false);
  const { LastLogin, LogoCampaign } = userData;

  const handleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(headerDataAction());
    dispatch(headerDataTlAction());
    dispatch(readUserActiveAction());
    const data = async () => {
      const getNotifications = await downloadNotifications();
      if (
        getNotifications &&
        getNotifications.status === 200 &&
        getNotifications.data.length > 0
      ) {
        setNotifications(getNotifications.data);

        let c = 0;
        getNotifications.data.forEach((el) => {
          if (el.Status === "Unread") {
            c += 1;
          }
        });
        setCont(c);
      }
    };
    data();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (LastLogin !== "undefined") {
      const last = validateDate(LastLogin);
      const today = validateDate(Date.now());

      if (last !== today) {
        handleOpen();
        let data = JSON.parse(
          CryptoJS.AES.decrypt(
            sessionStorage.getItem("userTP"),
            "secret key 123"
          ).toString(CryptoJS.enc.Utf8)
        );

        data.LastLogin = Date.now();
        sessionStorage.setItem(
          "userTP",
          CryptoJS.AES.encrypt(
            JSON.stringify(data),
            "secret key 123"
          ).toString()
        );
      }
    }
  }, [LastLogin]);

  useEffect(() => {
    const data = async () => {
      const getNotifications = await downloadNotifications();
      if (
        getNotifications &&
        getNotifications.status === 200 &&
        getNotifications.data.length > 0
      ) {
        setNotifications(getNotifications.data);

        let c = 0;
        getNotifications.data.forEach((el) => {
          if (el.Status === "Unread") {
            c += 1;
          }
        });
        setCont(c);
      }
    };
    data();
    // eslint-disable-next-line
  }, [count]);

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 10) {
      return "more than 10 notifications";
    }
    return `${count} notifications`;
  }

  return (
    <>
      <Grid container spacing={1}>
        {userData.Role === "Agent" || userData.Role === "Team Leader" ? (
          <>
            {homeData !== "UnauthorizedError" && (
              <>
                <Grid item xs={12} md={2} mt={2}>
                  <TitleHeader>
                    {LogoCampaign ? <img src={LogoCampaign} alt="TP" /> : ""}
                  </TitleHeader>
                </Grid>

                <Grid item xs={12} md={10} mt={2}>
                  <RightHeader height={1}>
                    <Box width="35%"></Box>
                    <Box
                      sx={{
                        maxWidth: "60%",
                        minWidth: "50%",
                        background: "#fff3",
                        borderRadius: "7px",
                        padding: "0 2rem",
                      }}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-evenly"
                    >
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2" color="#fff">
                          <b>
                            {userData.Role === "Agent"
                              ? headerData?.Exp
                              : headerDataTl?.Exp}
                          </b>{" "}
                          Pts
                        </Typography>
                        <Box width="150px" margin="0 1rem">
                          <ProgresBar
                            value={
                              userData.Role === "Agent"
                                ? (headerData?.Exp * 100) / headerData?.High
                                : (headerDataTl?.Exp * 100) / headerDataTl?.High
                            }
                          />
                        </Box>
                        <Typography variant="body2" color="#fff">
                          <b>
                            {userData.Role === "Agent"
                              ? headerData?.High
                              : headerDataTl?.High}
                          </b>{" "}
                          XP Points
                        </Typography>
                      </Box>

                      {showNotification && (
                        <Notifications
                          notifications={notifications}
                          setShowNotification={setShowNotification}
                        />
                      )}
                      <IconButton onClick={() => handleOpen()}>
                        <img src={Achievement} alt="Achievement" height={25} />
                      </IconButton>
                      <IconButton
                        aria-label={notificationsLabel(
                          cont < 11 ? cont : "10+"
                        )}
                        onClick={handleNotification}
                      >
                        <Badge
                          badgeContent={cont < 11 ? cont : "10+"}
                          color="error"
                        >
                          <IoIosNotificationsOutline color="#fff" size={30} />
                        </Badge>
                      </IconButton>

                      {userData.Role === "Agent" ? (
                        <Box display="flex" alignItems="center">
                          <img src={epicoinICO} alt="coinICO" height={30} />
                          <Typography
                            variant="body2"
                            color="#fff"
                            fontWeight={700}
                            marginLeft="10px"
                          >
                            {" "}
                            {headerData?.ResObtenidoCoin} Epicoins
                          </Typography>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </RightHeader>
                </Grid>
              </>
            )}
          </>
        ) : (
          <>
            <Grid item xs={12} md={2}>
              <TitleHeader>
                {LogoCampaign ? <img src={LogoCampaign} alt="TP" /> : ""}
              </TitleHeader>
            </Grid>

            <Grid item xs={12} md={10}>
              <RightHeader height={1}>
                <Box display="flex" width="50%" justifyContent="right">
                  <IconButton
                    onClick={() => handleOpen()}
                    sx={{ marginRight: "2rem" }}
                  >
                    <img src={Achievement} alt="Achievement" height={25} />
                  </IconButton>
                </Box>
              </RightHeader>
            </Grid>
          </>
        )}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox
          sx={{
            width: { xs: "95%", md: "85%", xl: "70%" },
          }}
        >
          <MainAwards handleClose={handleClose} userData={userData} />
        </ModalBox>
      </Modal>
    </>
  );
};

export default Header;
