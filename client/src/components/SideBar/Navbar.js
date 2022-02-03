import React, { useState } from "react";
import { NavList } from "./NavList";
import { useSelector } from "react-redux";
import { Box, AppBar, Divider, IconButton, Avatar } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useMediaQuery from "@mui/material/useMediaQuery";
import avatar from "../../assets/temp-image/avatar.png";

const SideBar = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  height: "95%",
  margin: "15px 15px 15px 15px",
  borderRadius: "15px",
  boxShadow: 3,
  alignItems: "center",
  color: "white",
  [theme.breakpoints.down("md")]: {
    position: "fixed",
    top: "auto",
    bottom: 0,
    margin: 0,
    borderRadius: "0px",
  },
}));

// const Up = styled(ArrowDropUpIcon)({
//   position: "absolute",
//   zIndex: 1,
//   top: -20,
//   left: 0,
//   right: 0,
//   margin: "0 auto",
// });
// const Down = styled(ArrowDropUpIcon)({
//   position: "absolute",
//   zIndex: 1,
//   top: -20,
//   left: 0,
//   right: 0,
//   margin: "0 auto",
// });

// const StyledFab = styled(Fab)({
//   position: "absolute",
//   zIndex: 1,
//   top: -30,
//   left: 0,
//   right: 0,
//   margin: "0 auto",
// });

export const Navbar = () => {
  const userData = useSelector((store) => store.loginUser.userData.Role);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {match && (
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
          }}
        >
          <SideBar
            sx={{
              width: open ? 180 : 70,
              transition: " width 0.5s",
              background: theme.palette.background.primary,
              height: "95vh",
            }}
          >
            <div className="container">
              <IconButton sx={{ flexGrow: 1 }} onClick={() => setOpen(!open)}>
                <Avatar
                  alt="Remy Sharp"
                  src={avatar}
                  sx={{ width: 56, height: 56 }}
                />
              </IconButton>
            </div>
            <Divider />
            <NavList open={open} match={match} userData={userData} />
          </SideBar>
        </Box>
      )}
      {/* {!match && (
        <SideBar sx={{ width: "100%", height: "5%" }}>
          <IconButton
            sx={{
              flexGrow: 0,
              justifyContent: "center",
              alignItems: "center",
              minWidth: "40px",
              padding: "10px",
            }}
            onClick={() => setOpen(!open)}
          >
            TP
          </IconButton>
          {open && <NavList open={open} />}
        </SideBar>
      )} */}
      {/* {!match && (
        <SideBar
          sx={{
            height: open ? 120 : 60,
            transition: " height 1.5s",
          }}
        >
          {!open && <Up onClick={() => setOpen(!open)} />}
          {open && <Down onClick={() => setOpen(!open)} />}

          <NavList />
        </SideBar>
      )} */}
      {!match && (
        <SideBar
          sx={{
            height: open ? 120 : 60,
            transition: " height .5s",
            background: theme.palette.background.primary,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 1,
              top: -20,
              left: 0,
              right: 0,
              margin: "0 auto",
            }}
            onClick={() => setOpen(!open)}
          >
            {!open && <ArrowDropUpIcon />}
            {open && <ArrowDropDownIcon />}
          </IconButton>

          <NavList />
        </SideBar>
      )}
      {/* {!match && (
        <SideBar
          sx={{
            height: open ? 120 : 60,
            transition: " height 1.5s",
          }}
        >
          <StyledFab aria-label="add" onClick={() => setOpen(!open)}>
            {!open && <ArrowDropUpIcon />}
            {open && <ArrowDropDownIcon />}
          </StyledFab>
          <NavList />
        </SideBar>
      )} */}
    </>
  );
};
