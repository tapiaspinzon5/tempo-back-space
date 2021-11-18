import React from "react";
import { NavList } from "./NavList";
import { Box, AppBar, Divider, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AdbIcon from "@mui/icons-material/Adb";

const SideBar = styled(AppBar)`
  position: sticky;
  background-color: #f9f9f9;
  max-width: 70%;
  height: 94%;
  margin: 15px 15px 15px 15px;
  border-radius: 42px;
  box-shadow: 3;
`;
export const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Box
        component="nav"
        sx={{
          flexGrow: 0,
        }}
      >
        <SideBar>
          <IconButton
            sx={{ flexGrow: 1 }}
            onClick={() => (open ? setOpen(false) : setOpen(true))}
          >
            <AdbIcon />
          </IconButton>
          <Divider />
          <NavList />
        </SideBar>
      </Box>
    </>
  );
};
