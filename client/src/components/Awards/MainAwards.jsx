import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import bgAwards from "../../assets/images/awards/bgAwards.png";
import WelcomeAwards from "./WelcomeAwards";
import WinnersOptions from "./WinnersOptions";
import GeneralJourney from "./GeneralJourney";
import SubJourney from "./SubJourney";
import MiniGames from "./MiniGames";
import { requestWithData } from "../../utils/api";

import { PongSpinner } from "react-spinners-kit";

const LoadingBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  background: "#e9e9e980",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 500,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}));

const BoxMainAwards = styled(Box)(() => ({
  width: "100%",
  backgroundImage: `url(${bgAwards})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  borderRadius: "10px",
  position: "relative",
}));

const MainAwards = ({ handleClose, userData }) => {
  const { Role, IdCampaign } = userData;
  const [showWinners, setShowWinners] = useState(false);
  const [section, setSection] = useState("winners");
  const [account, setAccount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [dataGJ, setDataGJ] = useState([]);
  const [dataSJ, setDataSJ] = useState([]);
  const [dataMG, setDataMG] = useState([]);

  useEffect(() => {
    setLoading(true);
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

     
      
      if (getGJ.data.length > 1) {
        setDataGJ(getGJ.data);
      }
      if (getSJ.data.length > 1) {
        setDataSJ(getSJ.data);
      }
      if (getMG.data.length > 1) {
        setDataMG(getMG.data);
      }
      setLoading(false);
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

 

  return (
    <BoxMainAwards sx={{ height: { xs: "90vh", xl: "75vh" } }}>
      {loading && <LoadingBox>
        <PongSpinner size={100} color="#fff" />
      </LoadingBox>}

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
