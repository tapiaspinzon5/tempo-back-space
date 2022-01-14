import React, { useState } from "react";
import { NavList } from "./NavList";
import { useSelector } from "react-redux";
import { Box, AppBar, Divider, IconButton, Fab, Avatar } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useMediaQuery from "@mui/material/useMediaQuery";

const SideBar = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  height: "95%",
  margin: "15px 15px 15px 15px",
  borderRadius: "15px",
  boxShadow: 3,
  alignItems: "center",
  color: "white",
  [theme.breakpoints.down("md")]: {
    //transition: " width 1.5s, height 1.5s",
    /* display: "flex",
    flexDirection: "row",
    position: "absolute",
    left: "0",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "space-between", */
    position: "fixed",
    top: "auto",
    bottom: 0,
    margin: 0,
    borderRadius: "0px",
  },
}));

const Up = styled(ArrowDropUpIcon)({
  position: "absolute",
  zIndex: 1,
  top: -20,
  left: 0,
  right: 0,
  margin: "0 auto",
});
const Down = styled(ArrowDropUpIcon)({
  position: "absolute",
  zIndex: 1,
  top: -20,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export const Navbar = () => {
  const userData = useSelector((store) => store.loginUser.userData.role);
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
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f619fbd7-5339-4d15-b3ad-d2010482e6ba/dd9cupb-654551d6-cf04-44b9-b1fb-2fefab7a6cdd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y2MTlmYmQ3LTUzMzktNGQxNS1iM2FkLWQyMDEwNDgyZTZiYVwvZGQ5Y3VwYi02NTQ1NTFkNi1jZjA0LTQ0YjktYjFmYi0yZmVmYWI3YTZjZGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cIJRZDaROcqAdc2oFWbpaAjMzVlH615q1FtdUeDsY1M"
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
