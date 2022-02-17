import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, styled, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Footer from "../../Footer";
import { userActivityDesc } from "../../../utils/api";
import img4 from "../../../assets/temp-image/desc/MicrosoftTeams-image.png";
import epicoins from "../../../assets/Icons/epicoin-ico.svg";
import xpIco from "../../../assets/Icons/start-icon.svg";

const MainDesc = styled(Grid)(() => ({
  width: "100%",
  padding: "1rem",
}));
const BoxHead = styled(Grid)(() => ({
  width: "100%",
  minHeight: "45vh",
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

  ul: {
    listStyle: "none",
    paddingLeft: 0,
    span: {
      fontWeight: "bold",
    },
    li: {
      marginBottom: "1rem",
      fontSize: "20px",
    },
  },
}));

const LeftBox = styled(Grid)(() => ({
  background: "#e8e8e8",
  borderRadius: "20px",
}));
const RewardBox = styled(Grid)(() => ({
  background: "white",
  borderRadius: "20px",
  minHeight: "5rem",
  display: "flex",
  padding: "1rem",
  p: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#3047b0",
    margin: "0 1rem",
  },
}));

const ActivitiesDescription = () => {
  const params = useParams();
  const userData = useSelector((store) => store.loginUser.userData);

  const idccms = userData.Idccms;
  const { idActivity, context } = params;
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await userActivityDesc(idccms, idActivity, context);
      setActivity(data.data[0]);
    };

    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <MainDesc>
      <BoxHead sx={{ backgroundImage: `url(${img4})` }}>
        <Typography variant="h4" color="initial">
          {activity.Category}
        </Typography>
      </BoxHead>
      <BoxBody container>
        <Grid item xs={12} md={6} p={2}>
          <Typography variant="h4" color="initial">
            {" "}
            Activity Details
          </Typography>
          <ul>
            <li>
              <span>Agent:</span> {activity.AgentName}
            </li>
            <li>
              <span>Assigned by:</span> {activity.UserAsig}
            </li>
            <li>
              <span>Date of assignment:</span>{" "}
              {activity.FchAssignment?.substr(0, 10)}
            </li>
            <li>
              <span>Stage:</span> {activity.Stage}
            </li>
          </ul>
        </Grid>
        <LeftBox item xs={12} md={6} p={2}>
          <Typography variant="h4" color="initial" gutterBottom>
            Activity Description
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            fontSize={20}
            gutterBottom
          >
            {activity.Description}
          </Typography>
          <Typography variant="body1" color="initial" fontSize={20}>
            {activity.HowToWin}
          </Typography>

          <Typography variant="h4" color="initial" mt={4}>
            Reward:
          </Typography>
          <RewardBox>
            <Box display="flex" alignItems="center">
              <img src={epicoins} alt="" />
              <Typography variant="body1" color="initial">
                {activity.RewardEpicoins ? activity.RewardEpicoins : 0} Epicoin
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <img src={xpIco} alt="" />
              <Typography variant="body1" color="initial">
                {activity.RewardPoints ? activity.RewardPoints : 0} XP
              </Typography>
            </Box>
          </RewardBox>
        </LeftBox>
      </BoxBody>
      <Footer />
    </MainDesc>
  );
};

export default ActivitiesDescription;
