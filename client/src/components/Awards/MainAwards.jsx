import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import bgAwards from "../../assets/images/awards/bgAwards.png";
import WelcomeAwards from "./WelcomeAwards";
import WinnersOptions from "./WinnersOptions";
import GeneralJourney from "./GeneralJourney";
import SubJourney from "./SubJourney";
import MiniGames from "./MiniGames";
import { requestWithData } from "../../utils/api";

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

  const [dataGJ, setDataGJ] = useState([]);
  const [dataSJ, setDataSJ] = useState([]);
  const [dataMG, setDataMG] = useState([]);

  useEffect(() => {
    const getAwadrs = async () => {
      const getGJ = await requestWithData("getgeneraljourneyresults", {
        idcampaign: account,
        context: 1,
      });
      const getSJ = await requestWithData("getgeneraljourneyresults", {
        idcampaign: account,
        context: 2,
      });
      const getMG = await requestWithData("getgeneraljourneyresults", {
        idcampaign: account,
        context: 3,
      });

      setDataGJ(getGJ.data);
      setDataSJ(getSJ.data);
      setDataMG(getMG.data);
    };
    getAwadrs();
  }, [account]);

  React.useEffect(() => {
    if (Role === "Super Admin" || Role === "Cluster Director") {
      setAccount(0);
    } else {
      setAccount(IdCampaign);
    }
  }, []);

  console.log(dataGJ);
  console.log(dataSJ);
  console.log(dataMG);

  return (
    <BoxMainAwards sx={{ height: { xs: "90vh", xl: "75vh" } }}>
      {showWinners ? (
        <>
          {section === "winners" && (
            <WinnersOptions
              setSection={setSection}
              handleClose={handleClose}
              Role={Role}
              setAccount={setAccount}
              account={account}
              dataGJ={dataGJ}
              dataSJ={dataSJ}
              dataMG={dataMG}
            />
          )}
          {section === "general" && (
            <GeneralJourney
              setSection={setSection}
              handleClose={handleClose}
              dataGJ={dataGJ}
            />
          )}
          {section === "sub" && (
            <SubJourney
              setSection={setSection}
              handleClose={handleClose}
              dataSJ={dataSJ}
            />
          )}
          {section === "mini" && (
            <MiniGames
              setSection={setSection}
              handleClose={handleClose}
              dataMG={dataMG}
            />
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
