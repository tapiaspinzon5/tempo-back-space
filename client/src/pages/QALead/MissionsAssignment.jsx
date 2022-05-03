import React, { useEffect, useReducer, useState } from "react";
import { Grid, Typography, styled, Button } from "@mui/material";
import { Box } from "@mui/system";
import { ButtonAction, MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import SearchAppBar from "../../components/Search";
import ShowUserActivity from "../../components/teamLeader/ShowUserActivity";
import MissionAssignmentCard from "../../components/Quizes/MissionAssignmentCard";
import LoadingComponent from "../../components/LoadingComponent";
import ShowLobAssign from "../../components/Quizes/ShowLobAssign";
import ShowTeamAssign from "../../components/Quizes/ShowTeamAssign";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import {
	missionsAssignmentInitialState,
	missionsAssignmentReducer,
	TYPES,
} from "../../reducers/missionsAssignmentReducer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
	dataToSendAgents,
	dataToSendLobsTeams,
} from "../../helpers/helperMissionAssignment";
const MySwal = withReactContent(Swal);

const BoxActivity = styled(Grid)(() => ({
	background: "#f2f2f2",
	padding: "1rem",
	borderRadius: "20px",
}));

const Boxview = styled(Grid)(() => ({
	overflowY: "scroll",
	height: "50vh",
}));

const active = {
	boxShadow: "1px 1px 5px #A2A2A2",
	transform: "scale(1.01)",
};

const BoxAssingment = styled(Box)(() => ({
	display: "flex",
	justifyContent: "flex-end",
	margin: "2rem 0 ",
	button: {
		padding: ".5rem",
		background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
		color: "#fff",
		width: "10rem",
		textTransform: "none",
		fontWeight: "600",
		marginRight: "2rem",
	},
}));

const dataMissions = {
	data: [
		{ missionName: "miss 1", id: 1 },
		{ missionName: "miss 2", id: 2 },
		{ missionName: "miss 3", id: 3 },
		{ missionName: "miss 4", id: 4 },
		{ missionName: "miss 5", id: 5 },
		{ missionName: "miss 6", id: 6 },
		{ missionName: "miss 7", id: 7 },
	],
	status: 200,
};
const data = {
	data: [
		{
			Users: [
				{ id: 1, Agent: "alguno1", Experiences: 231, fcmToken: "token 1" },
				{ id: 2, Agent: "alguno2", Experiences: 231, fcmToken: "token 2" },
				{ id: 3, Agent: "alguno3", Experiences: 231, fcmToken: "token 3" },
				{ id: 4, Agent: "alguno4", Experiences: 231, fcmToken: "token 4" },
				{ id: 5, Agent: "alguno5", Experiences: 231, fcmToken: "token 5" },
				{ id: 6, Agent: "alguno6", Experiences: 231, fcmToken: "token 6" },
				{ id: 7, Agent: "alguno7", Experiences: 231, fcmToken: "token 7" },
				{ id: 8, Agent: "alguno8", Experiences: 231, fcmToken: "token 8" },
			],
			Lobs: [
				{
					lobName: "Lob1",
					idLob: 1,
					fcmToken: ["lob1 token 1", "lob1 token 2"],
				},
				{
					lobName: "Lob2",
					idLob: 2,
					fcmToken: ["lob2 token 1", "lob2 token 2"],
				},
				{
					lobName: "Lob3",
					idLob: 3,
					fcmToken: ["lob3 token 1", "lob3 token 2"],
				},
				{
					lobName: "Lob4",
					idLob: 4,
					fcmToken: ["lob4 token 1", "lob4 token 2"],
				},
				{
					lobName: "Lob5",
					idLob: 5,
					fcmToken: ["lob5 token 1", "lob5 token 2"],
				},
				{
					lobName: "Lob6",
					idLob: 6,
					fcmToken: ["lob6 token 1", "lob6 token 2"],
				},
			],
			Teams: [
				{
					teamName: "Team 1",
					idTeam: 1,
					fcmToken: ["Team1 token 1", "Team1 token 2"],
				},
				{
					teamName: "Team 2",
					idTeam: 2,
					fcmToken: ["Team2 token 1", "Team2 token 2"],
				},
				{
					teamName: "Team 3",
					idTeam: 3,
					fcmToken: ["Team3 token 1", "Team3 token 2"],
				},
				{
					teamName: "Team 4",
					idTeam: 4,
					fcmToken: ["Team4 token 1", "Team4 token 2"],
				},
				{
					teamName: "Team 5",
					idTeam: 5,
					fcmToken: ["Team5 token 1", "Team5 token 2"],
				},
				{
					teamName: "Team 6",
					idTeam: 6,
					fcmToken: ["Team6 token 1", "Team6 token 2"],
				},
				{
					teamName: "Team 7",
					idTeam: 7,
					fcmToken: ["Team7 token 1", "Team7 token 2"],
				},
			],
		},
	],
	status: 200,
};

const MissionsAssignment = () => {
	const navigate = useNavigate();
	const rxDispatch = useDispatch();
	const userData = useSelector((store) => store.loginUser.userData);
	const userName = userData.Nombre;
	const [select, setSelect] = useState("agents");
	const [error, setError] = useState(false);
	const [loadingMission, setLoadingMission] = useState(false);
	const [loadingAgents, setLoadingAgents] = useState(false);
	const [loadingLobs, setLoadingLobs] = useState(false);
	const [loadingTeams, setLoadingTeams] = useState(false);
	const [noDataMissions, setNoDataMissions] = useState(false);
	const [noDataAssigns, setNoDataAssigns] = useState(false);
	const [state, dispatch] = useReducer(
		missionsAssignmentReducer,
		missionsAssignmentInitialState
	);
	const { missions, users, lobs, teams } = state;

	useEffect(
		() => {
			const getData = async () => {
				setLoadingAgents(true);
				setLoadingMission(true);
				const allMissions = dataMissions; //await getMissions(1, 1032);
				if (
					allMissions &&
					allMissions.status === 200 &&
					allMissions.data.length > 0
				) {
					if (
						allMissions.data[0].id !== "0" &&
						allMissions.data[0].missionName !== "0"
					) {
						const alt = data; // await  request
						if (alt && alt.status === 200 && alt.data.length > 0) {
							if (
								alt.data[0].Users.length > 0 &&
								alt.data[0].Lobs.length > 0 &&
								alt.data[0].Teams.length > 0
							) {
								dispatch({
									type: TYPES.GET_DATA,
									payload: { missions: allMissions.data, groups: alt.data },
								});
								setLoadingAgents(false);
								setLoadingMission(false);
							} else {
								setLoadingAgents(false);
								setLoadingMission(false);
								setNoDataAssigns(true);
							}
						} else if (
							allMissions &&
							allMissions.data === "UnauthorizedError"
						) {
							rxDispatch(logoutAction());
							navigate("/");
						} else {
							setLoadingAgents(false);
							setLoadingMission(false);
							setError(true);
						}
					} else {
						setLoadingAgents(false);
						setLoadingMission(false);
						setNoDataMissions(true);
					}
				} else if (allMissions && allMissions.data === "UnauthorizedError") {
					rxDispatch(logoutAction());
					navigate("/");
				} else {
					setLoadingAgents(false);
					setLoadingMission(false);
					setError(true);
				}
			};
			getData();
		},
		// eslint-disable-next-line
		[]
	);

	//funcion de asingacion de usuarios
	const handleUser = (e) => {
		const { name, checked } = e.target;
		dispatch({ type: TYPES.SELECT_AGENTS, payload: { name, checked } });
	};

	////////////////////////////// funcion de asingacion de Misiones
	const handleMissions = (e) => {
		const { name, checked } = e.target;
		dispatch({ type: TYPES.SELECT_MISSIONS, payload: { name, checked } });
	};

	//////////////////////////////funcion que  asigna el Tiempo de duraCION
	const handleTime = (e, name) => {
		dispatch({
			type: TYPES.SELECT_TIME,
			payload: { time: e.target.value, name },
		});
	};

	////////////////////////////// funcion de asingacion de Lobs
	const handleLob = (e) => {
		const { name, checked } = e.target;
		dispatch({ type: TYPES.SELECT_LOBS, payload: { name, checked } });
	};

	////////////////////////////// funcion de asingacion de Teams
	const handleTeam = (e) => {
		const { name, checked } = e.target;
		dispatch({ type: TYPES.SELECT_TEAMS, payload: { name, checked } });
	};

	/////////////////////////funcion de envio de datos
	const handleSubmit = async (e) => {
		e.preventDefault();
		const dataMissions = missions.filter((miss) => miss.isChecked && miss.time);
		if (select === "agents") {
			const dataAgents = users.filter((us) => us.isChecked);
			if (dataMissions.length > 0) {
				if (dataAgents.length > 0) {
					const dts = await dataToSendAgents(
						dataMissions,
						dataAgents,
						userName,
						1
					);
					console.log(dts);
					//funcion de envio
				} else {
					MySwal.fire({
						title: <p>{"Check your Agents selection"}</p>,
						icon: "info",
						confirmButtonText: "Accept",
						allowOutsideClick: false,
					});
				}
			} else {
				MySwal.fire({
					title: (
						<p>{"Check your mission selection or mission time selection."}</p>
					),
					icon: "info",
					confirmButtonText: "Accept",
					allowOutsideClick: false,
				});
			}
		} else if (select === "lob") {
			const dataLobs = lobs.filter((lob) => lob.isChecked);
			if (dataMissions.length > 0) {
				if (dataLobs.length > 0) {
					const dts = await dataToSendLobsTeams(
						dataMissions,
						dataLobs,
						userName,
						2
					);
					console.log(dts);
					//funcion de envio
				} else {
					MySwal.fire({
						title: <p>{"Check your Lobs selection"}</p>,
						icon: "info",
						confirmButtonText: "Accept",
						allowOutsideClick: false,
					});
				}
			} else {
				MySwal.fire({
					title: (
						<p>{"Check your mission selection or mission time selection."}</p>
					),
					icon: "info",
					confirmButtonText: "Accept",
					allowOutsideClick: false,
				});
			}
		} else {
			const dataTeams = teams.filter((tm) => tm.isChecked);
			if (dataMissions.length > 0) {
				if (dataTeams.length > 0) {
					const dts = await dataToSendLobsTeams(
						dataMissions,
						dataTeams,
						userName,
						3
					);
					console.log(dts);
					//funcion de envio
				} else {
					MySwal.fire({
						title: <p>{"Check your Teams selection"}</p>,
						icon: "info",
						confirmButtonText: "Accept",
						allowOutsideClick: false,
					});
				}
			} else {
				MySwal.fire({
					title: (
						<p>{"Check your mission selection or mission time selection."}</p>
					),
					icon: "info",
					confirmButtonText: "Accept",
					allowOutsideClick: false,
				});
			}
		}
	};

	return (
		<MainPage>
			<Header />
			<Grid container spacing={1}>
				<Grid xs={12} md={6}>
					{" "}
					<Typography variant="h5">Mission Assignment</Typography>
				</Grid>
				<Grid xs={12} md={6}>
					<Box margin="2rem 0">
						<ButtonAction
							onClick={() => {
								setSelect("agents");
								dispatch({ type: TYPES.ORIGINAL_DB_DATA });
							}}
							sx={select === "agents" && active}
						>
							Agents
						</ButtonAction>
						<ButtonAction
							onClick={() => {
								setSelect("lob");
								dispatch({ type: TYPES.ORIGINAL_DB_DATA });
							}}
							sx={select === "lob" && active}
						>
							LOB's
						</ButtonAction>
						<ButtonAction
							onClick={() => {
								setSelect("teams");
								dispatch({ type: TYPES.ORIGINAL_DB_DATA });
							}}
							sx={select === "teams" && active}
						>
							Teams
						</ButtonAction>
					</Box>
				</Grid>
				<Grid xs={12} md={6}>
					<BoxActivity>
						<Box
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							marginBottom={2}
						>
							<ButtonAction>
								<input
									type="checkbox"
									name="selecct-all"
									onChange={handleMissions}
									checked={
										missions.filter((mission) => mission?.isChecked !== true)
											.length < 1
									}
								/>
								Select all
							</ButtonAction>
							<SearchAppBar />
						</Box>
						<Boxview>
							{error ? (
								<Typography variant="body1">Server Problems</Typography>
							) : noDataMissions ? (
								<Typography variant="body1"></Typography>
							) : loadingMission ? (
								<LoadingComponent />
							) : (
								missions?.map((mission, index) => (
									<MissionAssignmentCard
										key={index}
										mission={mission}
										handleMissions={handleMissions}
										handleTime={handleTime}
									/>
								))
							)}
						</Boxview>
					</BoxActivity>
				</Grid>
				<Grid xs={12} md={6}>
					<BoxActivity>
						<Box
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							marginBottom={2}
						>
							<ButtonAction
							//sx={selectButton}
							>
								<input
									type="checkbox"
									name="selecct-all"
									onChange={
										select === "agents"
											? handleUser
											: select === "lob"
											? handleLob
											: handleTeam
									}
									checked={
										select === "agents"
											? users.filter((user) => user?.isChecked !== true)
													.length < 1
											: select === "lob"
											? lobs.filter((lob) => lob?.isChecked !== true).length < 1
											: teams.filter((team) => team?.isChecked !== true)
													.length < 1
									}
								/>
								Select all
							</ButtonAction>
							<SearchAppBar />
						</Box>
						<Boxview>
							{error ? (
								<Typography variant="body1">Server Problems</Typography>
							) : noDataAssigns ? (
								<Typography variant="body1"></Typography>
							) : loadingAgents ? (
								<LoadingComponent />
							) : select === "agents" ? (
								users.map((user, index) => (
									<ShowUserActivity
										key={index}
										user={user}
										handleUser={handleUser}
									/>
								))
							) : select === "lob" ? (
								lobs.map((lob, index) => (
									<ShowLobAssign key={index} lob={lob} handleLob={handleLob} />
								))
							) : select === "teams" ? (
								teams.map((team, index) => (
									<ShowTeamAssign
										key={index}
										team={team}
										handleTeam={handleTeam}
									/>
								))
							) : (
								<Typography variant="body1">Server Problems</Typography>
							)}
						</Boxview>
					</BoxActivity>
				</Grid>
			</Grid>
			<BoxAssingment>
				<Button onClick={handleSubmit}>Assignement</Button>
			</BoxAssingment>
			<Footer />
		</MainPage>
	);
};

export default MissionsAssignment;
