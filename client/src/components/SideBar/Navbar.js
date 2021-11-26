import React, { useState } from "react";
import { NavList } from "./NavList";
import { Box, AppBar, Divider, IconButton, Fab } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useMediaQuery from "@mui/material/useMediaQuery";

const SideBar = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  backgroundColor: "#f9f9f9",
  height: "95%",
  margin: "15px 15px 15px 15px",
  borderRadius: "15px",
  boxShadow: 3,
  alignItems: "center",
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
            //position: "fixed",
          }}
        >
          <SideBar
            sx={{
              width: open ? 180 : 70,
              transition: " width 1.5s",
            }}
          >
            <div className="container">
              <IconButton sx={{ flexGrow: 1 }} onClick={() => setOpen(!open)}>
                TP
              </IconButton>
            </div>
            <Divider />
            <NavList open={open} match={match} />
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
