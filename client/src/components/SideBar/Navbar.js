import React from "react";
import { NavList } from "./NavList";
import { Box, AppBar, Divider, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
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
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    left: "0",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const Navbar = ({ open, setOpen }) => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {match && (
        <Box
          component="nav"
          sx={{
            flexGrow: 0,
          }}
        >
          <SideBar
            sx={{
              width: open ? 200 : 70,
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
      {!match && (
        <SideBar sx={{ width: "100%", height: "8%" }}>
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
      )}
    </>
  );
};
