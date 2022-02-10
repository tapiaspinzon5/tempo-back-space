import React, { useEffect, useState } from "react";
import {
  IconButton,
  styled,
  Grid,
  alpha,
  InputBase,
  Badge,
} from "@mui/material";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import bannerH from "../../assets/images/bannerHeader.png";
import { useTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notifications from "../notifications/Notifications";
import { downloadNotifications } from "../../utils/api";
import { onMessageListener } from "../../utils/firebase";
import Swal from "sweetalert2";
//import { DarkModeContext } from "../../context/DarkModeProvider";
//import ProgresBar from "../progressCharts/ProgresBar";
//import Brightness4Icon from "@mui/icons-material/Brightness4";
//import Brightness7Icon from "@mui/icons-material/Brightness7";
//import coin from "../../assets/images/coin.svg";

const MainHeader = styled(Grid)(() => ({
  border: "1px solid #f2f2f2",
  borderRadius: "10px",
  width: "100%",
  minHeight: "11vh",
  boxShadow: "2px 2px 5px #f2f2f2",
  marginRight: "1rem",
  display: "flex",
  alignItems: "center",
}));

const TitleHeader = styled(Grid)((theme) => ({
  // background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
  minHeight: "11vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px 0 0 10px",
  img: {
    width: "100%",
  },
}));

const RightHeader = styled(Grid)((theme) => ({
  borderRadius: "0px 10px 10px 0px",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  //background: "#fff",
  borderRadius: "10px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "25ch",
    },
  },
}));

const Header = () => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    url: "",
  });
  const [cont, setCont] = useState(0);
  const [notifications, setNotifications] = useState([]);
  //controles Dark mode
  const theme = useTheme();
  // const colorMode = React.useContext(DarkModeContext);
  const [showNotification, setShowNotification] = useState(false);
  const handleNotification = () => {
    // console.log("...mostrando notificaciones");
    setShowNotification(!showNotification);
  };
  // Esta funcion esta pendiente de las nuevas notifiaciones
  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.data?.title,
        body: payload?.data?.body,
        url: payload?.data?.url,
      });
    })
    .catch((err) => console.log("failed: ", err));

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const noti = () => {
    notification?.title &&
      Toast.fire({
        icon: "warning",
        title: notification?.title,
        text: notification?.body,
      });
  };

  useEffect(() => {
    if (notification?.title) {
      noti();
      setCont(cont + 1);
    }
    // eslint-disable-next-line
  }, [notification]);

  useEffect(() => {
    const data = async () => {
      const getNotifications = await downloadNotifications(idccms);
      if (
        getNotifications &&
        getNotifications.status === 200 &&
        getNotifications.data.length > 0
      ) {
        setNotifications(getNotifications.data);
        console.log(notifications);
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
  }, []);
  useEffect(() => {
    const data = async () => {
      const getNotifications = await downloadNotifications(idccms);
      if (
        getNotifications &&
        getNotifications.status === 200 &&
        getNotifications.data.length > 1
      ) {
        setNotifications(getNotifications.data);
        console.log(notifications);
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
  }, [cont]);

  return (
    <MainHeader
      container
      sx={{
        background: theme.palette.background.navigator,
        color: "text.primary",
      }}
    >
      <TitleHeader
        item
        xs={12}
        md={6}
        sx={{
          //background: theme.palette.background.primary,
          color: "text.primary",
          display: "flex",
          justifyContent: "left",
        }}
      >
        <img src={bannerH} alt="TP" />
      </TitleHeader>
      <RightHeader item xs={12} md={6}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#000" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {showNotification && <Notifications notifications={notifications} />}
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={handleNotification}
        >
          <Badge badgeContent={cont < 11 ? cont : "10+"} color="error"></Badge>
          <NotificationsIcon />
        </IconButton>
      </RightHeader>
    </MainHeader>
  );
};

export default Header;
