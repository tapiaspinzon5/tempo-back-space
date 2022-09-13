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
  backgroundImage: `url(${bgAwards})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  borderRadius: "10px",
}));

const MainAwards = ({ handleClose, userData }) => {
  const [showWinners, setShowWinners] = useState(false);
  const [section, setSection] = useState("winners");
  const [account, setAccount] = useState(0);

  const { Role, IdCampaign } = userData;

  React.useEffect(() => {
    Role !== "Super Admin" || Role !== "Cluster Director"
      ? setAccount(IdCampaign)
      : setAccount(0);
  }, []);

  console.log(userData);

  return (
    <BoxMainAwards sx={{ height: { xs: "90vh", xl: "75vh" } }}>
      {showWinners ? (
        <>
          {section === "winners" && (
            <WinnersOptions
              setSection={setSection}
              handleClose={handleClose}
              Role={Role}
            />
          )}
          {section === "general" && (
            <GeneralJourney setSection={setSection} handleClose={handleClose} />
          )}
          {section === "sub" && (
            <SubJourney setSection={setSection} handleClose={handleClose} />
          )}
          {section === "mini" && (
            <MiniGames setSection={setSection} handleClose={handleClose} />
          )}
        </>
      ) : (
        <WelcomeAwards
          setShowWinners={setShowWinners}
          handleClose={handleClose}
        />
      )}
    </BoxMainAwards>
  );
};

export default MainAwards;
