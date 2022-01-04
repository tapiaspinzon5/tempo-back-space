import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import HomeUser from "../pages/HomeUser";
import { Navbar } from "../components/SideBar/Navbar";
import { Grid, styled } from "@mui/material";
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
//import { Star5 } from "./Star 5/Star5";
//import { QuizView } from "../pages/QuizView";
//import { Description } from "../pages/Description";
//import { Catalogue } from "./Catalogue/Catalogue";
//import { VelBar } from "./Speed Bar/VelBar";

const MainApp = styled(Grid)(() => ({
  display: "flex",
  //position: "relative",
}));

const AppRouter = () => {
  const userData = useSelector((store) => store.loginUser.userData);

  console.log(userData);

  return (
    <Router>
      <MainApp sx={{ bgcolor: "background.default" }}>
        {userData?.role && <Navbar />}

        <Routes>
          {userData?.role === "Agent" && (
            <>
              <Route path="/" element={<Navigate to="/homeusers" />} />
              <Route path="/homeusers" element={<HomeUser />} />
              <Route path="/activitiesview" element={<ActivitiesView />} />
              <Route path="/quiz/:idquiz" element={<QuizViewV2 />} />
              <Route path="/quizdetails/:idquiz" element={<QuizDetails />} />
            </>
          )}

          {userData?.role === "Operation Manager" && (
            <>
              <Route path="/" element={<Navigate to="/homeom" />} />
              <Route path="/homeom" element={<HomeOM />} />
            </>
          )}
          {userData?.role === "QA Lead" && (
            <>
              <Route path="/upquiz" element={<UpQuiz />} />
              <Route path="/" element={<Navigate to="/homeqal" />} />
              <Route path="/homeqal" element={<HomeQAL />} />
            </>
          )}
          {userData?.role === "Reporting Lead" && (
            <>
              <Route path="/" element={<Navigate to="/homerl" />} />
              <Route path="/homerl" element={<HomeRL />} />
            </>
          )}
          {userData?.role === "Super Admin" && (
            <>
              <Route path="/" element={<Navigate to="/homesa" />} />
              <Route path="/homesa" element={<HomeSA />} />
            </>
          )}
          {userData?.role === "Team Leader" && (
            <>
              <Route path="/" element={<Navigate to="/hometl" />} />
              <Route path="/hometl" element={<HomeTL />} />
              <Route path="/homeusers" element={<HomeUser />} />
              <Route path="/teamprogress" element={<TeamsProgress />} />
            </>
          )}

          {!userData?.role && <Route path="/" element={<Login />} />}
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
