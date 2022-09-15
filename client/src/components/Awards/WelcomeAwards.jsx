import React from "react";

import { Box, styled } from "@mui/system";
import logoSpaceAwards from "../../assets/images/awards/logoSpaceAwards.png";
import astronaut from "../../assets/images/awards/astronaut.png";
import { ButtonActionBlue } from "../../assets/styled/muistyled";
import IconButton from "@mui/material/IconButton";

const BoxWelcome = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  padding: "2rem",
}));

const WelcomeAwards = ({ setShowWinners, handleClose }) => {
  return (
    <BoxWelcome>
      <Box width="100%" textAlign="right">
        <IconButton
          aria-label=""
          onClick={handleClose}
          sx={{
            color: "#fff",
            background: "#f2f2f2a1",
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "2px",
          }}
        >
          X
        </IconButton>
      </Box>
      <Box
        height={"75vh"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <img src={logoSpaceAwards} alt="" width="35%" />
        <img src={astronaut} alt="" width="15%" />
        <ButtonActionBlue
          sx={{
            height: "4rem",
            width: "17%",
            fontSize: "28px",
            fontWeight: 900,
          }}
          onClick={() => setShowWinners(true)}
        >
          Winners
        </ButtonActionBlue>
      </Box>
    </BoxWelcome>
  );
};

export default WelcomeAwards;
