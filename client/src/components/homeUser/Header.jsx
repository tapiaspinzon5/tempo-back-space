import React from "react";
import { Typography, Box, IconButton, styled, Grid } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { DarkModeContext } from "../../context/DarkModeProvider";

const MainHeader = styled(Grid)(() => ({
  border: "1px solid #f2f2f2",
  borderRadius: "10px",
  width: "100%",
  boxShadow: "2px 2px 5px #f2f2f2",
  marginRight: "1rem",
}));

const Header = () => {
  //controles Dark mode
  const theme = useTheme();
  const colorMode = React.useContext(DarkModeContext);

  return (
    <MainHeader sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <Box>
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
    </MainHeader>
  );
};

export default Header;
