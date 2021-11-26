import React, { useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  styled,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { DarkModeContext } from "../../context/DarkModeProvider";
//provicional
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const MainHeader = styled(Grid)(() => ({
  border: "1px solid #f2f2f2",
  borderRadius: "10px",
  width: "100%",
  height: "136px",
  boxShadow: "2px 2px 5px #f2f2f2",
  marginRight: "1rem",
  display: "flex",
  alignItems: "center",
}));

const Header = () => {
  //controles Dark mode
  const theme = useTheme();
  const colorMode = React.useContext(DarkModeContext);
  const [select, setSelect] = useState("");

  return (
    <MainHeader
      sx={{
        background: theme.palette.background.navigator,
        color: "text.primary",
      }}
    >
      {/* <Box>
        <SportsEsportsIcon />
      </Box>
      <Box sx={{ width: "  120px" }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            label="Age"
            onChange={(e) => setSelect(e.target.value)}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
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
