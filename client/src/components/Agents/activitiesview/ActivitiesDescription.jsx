import React from "react";
import { useParams } from "react-router-dom";
import { Grid, styled, Typography } from "@mui/material";
import img4 from "../../../assets/temp-image/desc/MicrosoftTeams-image.png";
import Footer from "../../Footer";

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

//tempData
const activity = {
  Agent: "Deiby Nino Garces",
  AssignmentUser: "Matilde Puentes Gutierrez",
  Description:
    "Learn how to play by completing the welcome video and earn your first points and coins.",
  FchAssignment: "2022-01-25T12:27:25.400Z",
  IdActivity: 1,
  IdentAssignment: 4492826,
  NameActivity: "Welcome to EGP",
  Stage: "Getting started",
  Status: false,
  ident: 4472074,
};

const ActivitiesDescription = () => {
  const params = useParams();
  console.log(params.idActivity);
  return (
    <MainDesc>
      <BoxHead sx={{ backgroundImage: `url(${img4})` }}>
        <Typography variant="h4" color="initial">
          {activity.NameActivity}
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
              <span>Agent:</span> {activity.Agent}
            </li>
            <li>
              <span>Assigned by:</span> {activity.AssignmentUser}
            </li>
            <li>
              <span>Date of assignment:</span>{" "}
              {activity.FchAssignment.substr(0, 10)}
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
          <Typography variant="body1" color="initial" fontSize={20}>
            {activity.Description}
          </Typography>
        </LeftBox>
      </BoxBody>
      <Footer />
    </MainDesc>
  );
};

export default ActivitiesDescription;
