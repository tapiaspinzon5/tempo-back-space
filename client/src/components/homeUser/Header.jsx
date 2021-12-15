import React, { useState } from "react";
import { Typography, Box, IconButton, styled, Grid } from "@mui/material";
import coin from "../../assets/images/coin.svg";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { DarkModeContext } from "../../context/DarkModeProvider";
import ProgresBar from "../progressCharts/ProgresBar";

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
  h4: {
    color: "white",
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
          background: theme.palette.background.primary,
          color: "text.primary",
        }}
      >
        <Typography variant="h4">LET´S WIN TOGETHER!</Typography>
      </TitleHeader>
      <RightHeader item xs={12} md={6}>
        <Box display="flex" alignItems="center">
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
        </Box>
      </RightHeader>
    </MainHeader>
  );
};

export default Header;
