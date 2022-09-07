import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import bgAwards from "../../assets/images/awards/bgAwards.png";
import WelcomeAwards from "./WelcomeAwards";
import WinnersOptions from "./WinnersOptions";
import GeneralJourney from "./GeneralJourney";
import SubJourney from "./SubJourney";
import MiniGames from "./MiniGames";

const BoxMainAwards = styled(Box)(() => ({
  width: "100%",
  minHeight: "100vh",
  backgroundImage: `url(${bgAwards})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
}));

const MainAwards = () => {
  const [showWinners, setShowWinners] = useState(false);
  const [section, setSection] = useState("winners");
  return (
    <BoxMainAwards>
      {showWinners ? (
        <>
          {section === "winners" && <WinnersOptions setSection={setSection} />}
          {section === "general" && <GeneralJourney setSection={setSection} />}
          {section === "sub" && <SubJourney setSection={setSection} />}
          {section === "mini" && <MiniGames setSection={setSection} />}
        </>
      ) : (
        <WelcomeAwards setShowWinners={setShowWinners} />
      )}
    </BoxMainAwards>
  );
};

export default MainAwards;
