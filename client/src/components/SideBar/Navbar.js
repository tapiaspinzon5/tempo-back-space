import React, { useState } from "react";
import { NavList } from "./NavList";
import { useSelector } from "react-redux";
import { Box, AppBar, Divider, IconButton, Avatar } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useMediaQuery from "@mui/material/useMediaQuery";
import avatar from "../../assets/temp-image/avatar.png";
import shortTP from '../../assets/Icons/tp_short_white.png'

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
              transition: " width 05s.",
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
          
          <Box
            sx={{ flexGrow: 1 }} 
          >

           <IconButton 
           onClick={() => setOpen(!open)}>
                  <img src={shortTP} alt=' ' height={45} width={45}  />
              </IconButton>
          </Box>
          </SideBar>
  
        </Box>
      )}
      
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

    </>
  );
};
