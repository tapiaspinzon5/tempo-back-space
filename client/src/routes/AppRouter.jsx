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
import PrivateRoute from "./PrivateRoute";
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
  //  const { role } = userData?;
  return (
    <Router>
      <MainApp sx={{ bgcolor: "background.default" }}>
        {userData?.role && <Navbar />}

        <Routes>
          {userData?.role ? (
            <>
              <Route path="/" element={<Navigate to="/homeusers" />} />
              {/* <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Navigate to="/homeusers" />
                  </PrivateRoute>
                }
              /> */}
              <Route path="/homeusers" element={<HomeUser />} />
              <Route path="/quizv2" element={<QuizViewV2 />} />
              <Route path="/teamprogress" element={<TeamsProgress />} />
              <Route path="/activitiesview" element={<ActivitiesView />} />
              <Route path="/upquiz" element={<UpQuiz />} />
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
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
