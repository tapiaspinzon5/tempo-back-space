import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { headerDataAction } from "../redux/homeDataDuck";
import { headerDataTlAction } from "../redux/homeDataDuckTL";
import {
	HashRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
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
import { UpCount } from "../pages/Super User/UpCount";
import { UpCampaign } from "../pages/Ops Man/UpCampaign";
import { UpAgents } from "../pages/Rep Lead/UpAgents";
import FollowingTeamsKPI from "../pages/TeamLeader/FollowingTeamsKPI";
//import ChallengeAssignment from "../pages/TeamLeader/ChallengeAssignment";
import BadgeManagement from "../pages/TeamLeader/BadgeManagement";
import ActivitiesDescription from "../components/Agents/activitiesview/ActivitiesDescription";
import NotificationsPage from "../pages/NotificationsPage";
import { VideoView } from "../pages/VideoView";
import { onMessageListener } from "../utils/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeaderBoard from "../pages/Agent/LeaderBoard";
import { AgentChallengeAssignment } from "../pages/Agent/AgentChallengeAssignment";
import AgentProfile from "../pages/Agent/AgentProfile";
import Analytics from "../pages/Analytics";
import AgentAnalytics from "../pages/Agent/AgentAnalytics";
import OptionsProfile from "../components/OptionsProfile";
import TeamInformation from "../pages/TeamLeader/TeamInformation";
import { TLChallengeAssignment } from "../pages/TeamLeader/TLChallengeAssignment";
import KpiUpload from "../pages/Rep Lead/KpiUpload";
import UploadAgentSection from "../pages/Rep Lead/UploadAgentSection";
import LeaderBoardRL from "../pages/Rep Lead/LeaderBoardRL";
import AnalyticsRL from "../pages/Rep Lead/AnalyticsRL";
import InformationQuices from "../pages/QALead/InformationQuices";
import MissionsAssignment from "../pages/QALead/MissionsAssignment";
import RoleManagementSecttion from "../pages/Ops Man/RoleManagementSecttion";
import LOBManagementSection from "../pages/Ops Man/LOBManagementSection";
import AccountCreation from "../pages/Super User/AccountCreation";
import UserPermission from "../pages/Super User/UserPermission";
//import Header from "../components/homeUser/Header";

const MainApp = styled(Grid)(() => ({
	display: "flex",
}));

const AppRouter = () => {
	const dispatch = useDispatch();
	const userData = useSelector((store) => store.loginUser.userData);
	const headerData = useSelector((store) => store.homeData.headerData);
	const headerDataTl = useSelector((store) => store.homeDataTl.headerData);
	const idccms = userData?.Idccms;
	const [navView, setNavView] = useState(true);
	const [navLong, setNavLong] = useState(false);
	const [seeProfile, setSeeProfile] = useState(false);
	const [notification, setNotification] = useState({
		title: "",
		body: "",
		url: "",
	});
	const [count, setCount] = useState(0);

	// Esta funcion esta pendiente de las nuevas notifiaciones
	onMessageListener()
		.then((payload) => {
			setNotification({
				title: payload?.data?.Title,
				challenge: payload?.data?.Challenge,
				challenger: payload?.data?.Challenger,
				url: payload?.data?.Url,
			});
		})
		.catch((err) => alert("failed: ", err));

	const notify = () => {
		notification?.title &&
			toast(
				<div>
					<p>
						<b>{notification?.title}</b>
					</p>
					<p>{"Challenge: " + notification?.challenge}</p>
					<p>{"Challenger: " + notification?.challenger}</p>
				</div>
			);
	};

	useEffect(() => {
		if (idccms > 0) {
			dispatch(headerDataAction(idccms));
			dispatch(headerDataTlAction(idccms));
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (
			(userData?.Role === "Agent" || userData?.Role === "Team Leader") &&
			userData?.NumberLogins === 1
		) {
			setNavView(false);
		}
		// eslint-disable-next-line
	}, [userData]);

	useEffect(() => {
		if (notification?.title) {
			notify();
			setCount(count + 1);
		}
		// eslint-disable-next-line
	}, [notification]);

	return (
		<Router>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<MainApp sx={{ bgcolor: "background.default" }}>
				{
					//userData?.NumberLogins > 1 &&
					userData?.Role && navView && (
						<>
							<Navbar
								seeProfile={seeProfile}
								setSeeProfile={setSeeProfile}
								avatar={headerData?.AvatarProfile}
								setNavLong={setNavLong}
							/>
							{seeProfile && (
								<OptionsProfile
									setSeeProfile={setSeeProfile}
									profile={userData}
									teamlead={headerDataTl}
									navLong={navLong}
								/>
							)}
						</>
					)
				}
				{userData?.NumberLogins === 1 &&
					(userData?.Role === "Agent" || userData?.Role === "Team Leader") &&
					userData?.Role && <VideoView setNavView={setNavView} />}

				<Routes>
					{userData?.NumberLogins > 1 && userData?.Role === "Agent" && (
						<>
							<Route path="/" element={<Navigate to="/homeusers" />} />
							<Route path="/homeusers" element={<HomeUser count={count} />} />
							<Route path="/activitiesview" element={<ActivitiesView />} />
							<Route path="/notifications" element={<NotificationsPage />} />
							<Route
								path="/useranalytics"
								element={<AgentAnalytics count={count} />}
							/>
							<Route
								path="/leaderboard"
								element={<LeaderBoard count={count} />}
							/>
							<Route
								path="/profile"
								element={<AgentProfile profile={headerData} />}
							/>
							<Route
								path="/challenge"
								element={<AgentChallengeAssignment count={count} />}
							/>
							<Route
								path="/activitiesview/:idActivity/:context"
								element={<ActivitiesDescription />}
							/>
							<Route
								path="/quiz/:idquiz"
								element={<QuizViewV2 setNavView={setNavView} />}
							/>
							<Route
								path="/quizdetails/:idquiz/:stateActivity/:quizName"
								element={<QuizDetails />}
							/>
						</>
					)}

					{userData?.Role === "Operation Manager" && (
						<>
							<Route path="/" element={<Navigate to="/homeom" />} />
							<Route path="/homeom" element={<HomeOM count={count} />} />
							<Route
								path="/rolemanagement"
								element={<RoleManagementSecttion />}
							/>
							<Route path="/lobmanagement" element={<LOBManagementSection />} />
							<Route path="/upcampaign" element={<UpCampaign />} />
							<Route path="/leaderboard" element={<LeaderBoardRL />} />
							<Route path="/analytics" element={<AnalyticsRL />} />
						</>
					)}
					{userData?.Role === "QA Lead" && (
						<>
							<Route path="/" element={<Navigate to="/homeqal" />} />
							<Route path="/upquiz" element={<UpQuiz />} />
							<Route path="/homeqal" element={<HomeQAL count={count} />} />
							<Route path="/quiziformation" element={<InformationQuices />} />
							<Route path="/leaderboard" element={<LeaderBoardRL />} />
							<Route path="/analytics" element={<AnalyticsRL />} />
							<Route
								path="/missionassignment"
								element={<MissionsAssignment />}
							/>
						</>
					)}
					{userData?.Role === "Reporting Lead" && (
						<>
							<Route path="/" element={<Navigate to="/homerl" />} />
							<Route path="/homerl" element={<HomeRL count={count} />} />
							<Route path="/upagents" element={<UpAgents />} />
							<Route path="/upkpi" element={<KpiUpload />} />
							<Route path="/uploadAgent" element={<UploadAgentSection />} />
							<Route path="/leaderboard" element={<LeaderBoardRL />} />
							<Route path="/analytics" element={<AnalyticsRL />} />
						</>
					)}
					{userData?.Role === "Super Admin" && (
						<>
							<Route path="/" element={<Navigate to="/homesa" />} />
							<Route path="/homesa" element={<HomeSA count={count} />} />
							<Route path="/upcount" element={<UpCount />} />
							<Route path="/accountcreation" element={<AccountCreation />} />
							<Route path="/setuserpermissions" element={<UserPermission />} />
							<Route path="/leaderboard" element={<LeaderBoardRL />} />
							<Route path="/analytics" element={<AnalyticsRL />} />
						</>
					)}
					{userData?.NumberLogins > 1 && userData?.Role === "Team Leader" && (
						<>
							<Route path="/" element={<Navigate to="/hometl" />} />
							<Route path="/hometl" element={<HomeTL count={count} />} />
							<Route path="/notifications" element={<NotificationsPage />} />
							<Route
								path="/profile"
								element={<AgentProfile profile={headerData} />}
							/>
							<Route
								path="/followingteams"
								element={<FollowingTeamsKPI count={count} />}
							/>
							<Route
								path="/leaderboard"
								element={<LeaderBoard count={count} />}
							/>
							<Route
								path="/challengeasignment"
								element={<TLChallengeAssignment count={count} />}
							/>
							<Route
								path="/badgesmanagement"
								element={<BadgeManagement count={count} />}
							/>
							<Route path="/teaminformation" element={<TeamInformation />} />
							<Route path="/teamprogress" element={<TeamsProgress />} />
							<Route path="/analytics" element={<Analytics count={count} />} />
						</>
					)}

					{!userData?.Role && <Route path="/" element={<Login />} />}
					{!userData?.Role && <Route path="*" element={<Login />} />}

					{userData?.Role && userData?.NumberLogins !== 1 && (
						<Route
							path="*"
							element={
								<main style={{ padding: "1rem" }}>
									<p>There's nothing here!</p>
								</main>
							}
						/>
					)}
				</Routes>
			</MainApp>
		</Router>
	);
};

export default AppRouter;
