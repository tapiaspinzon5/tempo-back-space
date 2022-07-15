import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, styled, Typography, Box } from "@mui/material";
import Footer from "../../Footer";
import { userActivityDesc } from "../../../utils/api";
import img4 from "../../../assets/temp-image/desc/MicrosoftTeams-image.png";
import epicoins from "../../../assets/Icons/epicoin-ico.svg";
import xpIco from "../../../assets/Icons/start-icon.svg";
import Header from "../../homeUser/Header";
import { MainPage } from "../../../assets/styled/muistyled";
import { useCountdown } from "../../../Hooks/useCountdown";

const MainDesc = styled(Grid)(() => ({
  width: "100%",
  padding: "1rem 0",
}));
const BoxHead = styled(Grid)(() => ({
  width: "100%",
  minHeight: "40vh",
  background: "#f9f9f9",
  borderRadius: "20px",
  display: "flex",
  alignItems: "flex-end",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
  backgroundPosition: "top center",
  h4: {
    margin: "2rem",
    color: "white",
    fontWeight: "700",
  },
}));

const BoxBody = styled(Grid)(() => ({
  width: "100%",
  minHeight: "35vh",
  background: "#f9f9f9",
  margin: "1rem 0",
  borderRadius: "20px",
  h5: {
    fontWeight: "600",
  },
}));

const GridSection = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const BoxRewards = styled(Box)(() => ({
  display: "flex",
  fontWeight: "700",
  color: "#3047b0",
  img: {
    height: "45px",
    width: "45px",
  },
}));

const ActivitiesDescription = () => {
  const params = useParams();

  const { idActivity, context } = params;
  const [activity, setActivity] = useState([]);
  const [days, hours, minutes, seconds] = useCountdown(
    activity.initialDate,
    activity.finalDate
  );

  useEffect(() => {
    const getData = async () => {
      const data = await userActivityDesc(idActivity, context);
      setActivity(data.data[0]);
    };

    getData();
    // eslint-disable-next-line
  }, []);

  console.log(activity);

  return (
    <MainPage>
      <Header />
      <MainDesc>
        <BoxHead
          sx={{ backgroundImage: `url(${activity?.descriptionImage || img4})` }}
        >
          <Typography variant="h4" color="initial">
            {activity?.Badge}
          </Typography>
        </BoxHead>
        <BoxBody container>
          <GridSection item xs={12} md={4}>
            <img
              src={activity?.ImageBadge}
              alt={activity?.Description}
              height={200}
            />
          </GridSection>
          <GridSection
            item
            sx={{ flexDirection: "column", alignItems: "flex-start" }}
            xs={12}
            md={4}
          >
            <Typography variant="h6" color="initial">
              {activity?.Description}
            </Typography>
            {activity.Category !== "Activity" && (
              <>
                {new Date(activity.initialDate).getTime() -
                  new Date().getTime() >
                0 ? (
                  <Typography variant="body1" color="#3047b0" mt={3}>
                    <b>Time to start:</b> <br />
                    {days}D-{hours}h:{minutes}m:{seconds}s
                  </Typography>
                ) : (
                  <Typography variant="body1" color="#3047b0" mt={3}>
                    <b>Remaining Time:</b> <br />
                    {days}D-{hours}h:{minutes}m:{seconds}s
                  </Typography>
                )}
              </>
            )}
          </GridSection>
          <GridSection item xs={12} md={4}>
            <BoxRewards>
              <Box marginRight="1rem">
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" fontWeight={700} marginRight="5px">
                    {activity?.RewardPoints ? activity?.RewardPoints : 0}
                  </Typography>
                  <img src={xpIco} alt="" />
                </Box>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  textAlign="center"
                >
                  XP
                </Typography>
              </Box>
              <Box>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" fontWeight={700} marginRight="5px">
                    {activity?.RewardEpicoins ? activity?.RewardEpicoins : 0}
                  </Typography>
                  <img src={epicoins} alt="" />
                </Box>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  textAlign="center"
                >
                  Epicoins
                </Typography>
              </Box>
            </BoxRewards>
          </GridSection>
        </BoxBody>
        <Footer />
      </MainDesc>
    </MainPage>
  );
};

export default ActivitiesDescription;
