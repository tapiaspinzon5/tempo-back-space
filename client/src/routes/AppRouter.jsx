import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import HomeUser from "../pages/HomeUser";
import { Navbar } from "../components/SideBar/Navbar";
import { Grid, Button, styled, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { QuizViewV2 } from "../pages/QuizViewV2";
import TeamsProgress from "../pages/TeamsProgress";
import UpQuiz from "../pages/UpQuiz";
import ActivitiesView from "../pages/ActivitiesView";
import Login from "../pages/Login";
import { HomeOM } from "../pages/HomeOM";
import { HomeQAL } from "../pages/HomeQAL";
import { HomeRL } from "../pages/HomeRL";
import { HomeSA } from "../pages/HomeSA";
import { HomeTL } from "../pages/HomeTL";
import QuizDetails from "../components/Quizes/QuizDetails";
import { UpCount } from "../pages/Super User/UpCount";
import { UpCampaign } from "../pages/Ops Man/UpCampaign";
import { UpAgents } from "../pages/Rep Lead/UpAgents";
import FollowingTeamsKPI from "../pages/TeamLeader/FollowingTeamsKPI";
import ChallengeAssignment from "../pages/TeamLeader/ChallengeAssignment";
import BadgeManagement from "../pages/TeamLeader/BadgeManagement";
import ActivitiesDescription from "../components/Agents/activitiesview/ActivitiesDescription";
import { VideoIntro } from "../components/VideoIntro";
import NotificationsPage from "../pages/NotificationsPage";
//import { Star5 } from "./Star 5/Star5";
//import { QuizView } from "../pages/QuizView";
//import { Description } from "../pages/Description";
//import { Catalogue } from "./Catalogue/Catalogue";
//import { VelBar } from "./Speed Bar/VelBar";

const MainApp = styled(Grid)(() => ({
  display: "flex",
  //position: "relative",
}));
const MainHomevideo = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "95vh",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
}));

const AppRouter = () => {
  const userData = useSelector((store) => store.loginUser.userData);
  const [video, setVideo] = useState(true);
  const [navView, setNavView] = useState(true);
  const theme = useTheme();
  const handleView = () => {
    setVideo(false);
  };
  useEffect(() => {
    if (userData?.NumberLogins !== 1) {
      setVideo(false);
    }
  }, []);
  return (
    <Router>
      <MainApp sx={{ bgcolor: "background.default" }}>
        {userData?.NumberLogins === 1 ? (
          <MainHomevideo>
            <VideoIntro />
            <Box
              sx={{
                margin: "0 15px 0 15px",
                display: "flex",
                justifyContent: "center",
                padding: "0 2rem 2rem 0",
              }}
            >
              <Button
                onClick={handleView}
                sx={{
                  background: theme.palette.background.primary,
                  color: "#FFFFFF",
                  margin: "10px",
                  width: "160px",
                }}
              >
                Continue
              </Button>
            </Box>
          </MainHomevideo>
        ) : (
          userData?.Role && navView && <Navbar />
        )}

        <Routes>
          {userData?.Role === "Agent" && (
            <>
              <Route path="/" element={<Navigate to="/homeusers" />} />
              <Route path="/homeusers" element={<HomeUser />} />
              <Route path="/activitiesview" element={<ActivitiesView />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route
                path="/activitiesview/:idActivity/:context"
                element={<ActivitiesDescription />}
              />
              <Route
                path="/quiz/:idquiz"
                element={<QuizViewV2 setNavView={setNavView} />}
              />
              <Route
                path="/quizdetails/:idquiz/:stateActivity"
                element={<QuizDetails />}
              />
            </>
          )}

          {userData?.Role === "Operation Manager" && (
            <>
              <Route path="/" element={<Navigate to="/homeom" />} />
              <Route path="/homeom" element={<HomeOM />} />
              <Route path="/upcampaign" element={<UpCampaign />} />
            </>
          )}
          {userData?.Role === "QA Lead" && (
            <>
              <Route path="/" element={<Navigate to="/homeqal" />} />
              <Route path="/upquiz" element={<UpQuiz />} />
              <Route path="/homeqal" element={<HomeQAL />} />
            </>
          )}
          {userData?.Role === "Reporting Lead" && (
            <>
              <Route path="/" element={<Navigate to="/homerl" />} />
              <Route path="/homerl" element={<HomeRL />} />
              <Route path="/upagents" element={<UpAgents />} />
            </>
          )}
          {userData?.Role === "Super Admin" && (
            <>
              <Route path="/" element={<Navigate to="/homesa" />} />
              <Route path="/homesa" element={<HomeSA />} />
              <Route path="/upcount" element={<UpCount />} />
            </>
          )}
          {userData?.Role === "Team Leader" && (
            <>
              <Route path="/" element={<Navigate to="/hometl" />} />
              <Route path="/hometl" element={<HomeTL />} />
              <Route path="/homeusers" element={<HomeUser />} />
              <Route path="/followingteams" element={<FollowingTeamsKPI />} />
              <Route
                path="/challengeasignment"
                element={<ChallengeAssignment />}
              />
              <Route path="/badgesmanagement" element={<BadgeManagement />} />
              <Route path="/teamprogress" element={<TeamsProgress />} />
            </>
          )}

          {!userData?.Role && <Route path="/" element={<Login />} />}
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </MainApp>
    </Router>
  );
};

export default AppRouter;
