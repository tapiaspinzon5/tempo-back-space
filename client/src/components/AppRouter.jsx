import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Description } from "../pages/Description";
import HomeUser from "../pages/HomeUser";
import { Navbar } from "./SideBar/Navbar";
import { Grid, styled } from "@mui/material";
import { Catalogue } from "./Catalogue/Catalogue";
import { VelBar } from "./Speed Bar/VelBar";
import { QuizView } from "../pages/QuizView";
import { QuizViewV2 } from "../pages/QuizViewV2";
import TeamsProgress from "../pages/TeamsProgress";
import UpQuiz from "../pages/UpQuiz";
import ActivitiesView from "../pages/ActivitiesView";

const MainApp = styled(Grid)(() => ({
  display: "flex",
}));

const AppRouter = () => {
  return (
    <Router>
      <MainApp sx={{ bgcolor: "background.default" }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomeUser />} />
          
          <Route path="/quizv2" element={<QuizViewV2 />} />
          <Route path="/teamprogress" element={<TeamsProgress />} />
          <Route path="/activitiesview" element={<ActivitiesView />} />
          <Route path="/upquiz" element={<UpQuiz />} />
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
