import React, { useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  styled,
  Grid,
  alpha,
  InputBase,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import coin from "../../assets/images/coin.svg";
import bannerH from "../../assets/images/bannerHeader.svg";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { DarkModeContext } from "../../context/DarkModeProvider";
import ProgresBar from "../progressCharts/ProgresBar";
import NotificationsIcon from "@mui/icons-material/Notifications";

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
  img: {},
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
  //controles Dark mode
  const theme = useTheme();
  const colorMode = React.useContext(DarkModeContext);

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
        {/* <Box display="flex" alignItems="center">
          <img src={coin} alt="coin-logo" />
          <Typography variant="body2" marginLeft="1rem">
            <b>50</b> Coins
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="body2">
            {" "}
            <b>1345</b> Pts
          </Typography>
          <Box sx={{ width: "10rem", paddingTop: "6px", margin: "0 1rem" }}>
            <ProgresBar value={50} />{" "}
          </Box>
          <Typography variant="body2">
            {" "}
            <b>1345</b> Pts to level up
          </Typography>
        </Box>
        <Box>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box> */}

        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#000" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={7} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </RightHeader>
    </MainHeader>
  );
};

export default Header;
