import React from "react";

import { Box, styled } from "@mui/system";
import logoSpaceAwards from "../../assets/images/awards/logoSpaceAwards.png";
import astronaut from "../../assets/images/awards/astronaut.png";
import { ButtonActionBlue } from "../../assets/styled/muistyled";

const BoxWelcome = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
}));

const WelcomeAwards = ({ setShowWinners }) => {
  return (
    <BoxWelcome>
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
    </BoxWelcome>
  );
};

export default WelcomeAwards;
