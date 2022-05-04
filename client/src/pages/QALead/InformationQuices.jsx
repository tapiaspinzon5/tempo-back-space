import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, styled } from "@mui/material";
import { MainPage } from "../../assets/styled/muistyled";
import CardButton from "../../components/cardUser/CardButton";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingComponent from "../../components/LoadingComponent";

const MySwal = withReactContent(Swal);

export const BoxContain = styled(Box)(() => ({
	background: "#f9f9f9",
	//background: "#f1f1f1",
	height: "65vh",
	borderRadius: "10px",
	overflowY: "scroll",
	overflowX: "hidden",
	"&::-webkit-scrollbar": {
		width: "6px",
	},

	"&::-webkit-scrollbar-track": {
		background: "white",
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "#e8e8e8",
		borderRadius: "20px",
	},
}));

const dataAgents = {
	data: [
		{
			Users: [
				{ id: 1, Agent: "alguno1", Rol: "Agent", idccms: 123456 },
				{ id: 2, Agent: "alguno2", Rol: "Agent", idccms: 123456 },
				{ id: 3, Agent: "alguno3", Rol: "Agent", idccms: 123456 },
				{ id: 4, Agent: "alguno4", Rol: "Agent", idccms: 123456 },
				{ id: 5, Agent: "alguno5", Rol: "Agent", idccms: 123456 },
				{ id: 6, Agent: "alguno6", Rol: "Agent", idccms: 123456 },
				{ id: 7, Agent: "alguno7", Rol: "Agent", idccms: 123456 },
				{ id: 8, Agent: "alguno8", Rol: "Agent", idccms: 123456 },
			],
			status: 200,
		},
	],
};
const dataTLs = {
	data: [
		{
			Users: [
				{ id: 1, tlName: "alguno1", Rol: "Team Leader", Idccms: 123456 },
				{ id: 2, tlName: "alguno2", Rol: "Team Leader", Idccms: 123456 },
				{ id: 3, tlName: "alguno3", Rol: "Team Leader", Idccms: 123456 },
				{ id: 4, tlName: "alguno4", Rol: "Team Leader", Idccms: 123456 },
				{ id: 5, tlName: "alguno5", Rol: "Team Leader", Idccms: 123456 },
				{ id: 6, tlName: "alguno6", Rol: "Team Leader", Idccms: 123456 },
				{ id: 7, tlName: "alguno7", Rol: "Team Leader", Idccms: 123456 },
				{ id: 8, tlName: "alguno8", Rol: "Team Leader", Idccms: 123456 },
			],
			status: 200,
		},
	],
};

const dataMissions = {
	data: [
		{ missionName: "miss 1", id: 1, category: "category 1" },
		{ missionName: "miss 2", id: 2, category: "category 2" },
		{ missionName: "miss 3", id: 3, category: "category 3" },
		{ missionName: "miss 4", id: 4, category: "category 4" },
		{ missionName: "miss 5", id: 5, category: "category 5" },
		{ missionName: "miss 6", id: 6, category: "category 6" },
		{ missionName: "miss 7", id: 7, category: "category 7" },
	],
	status: 200,
};

const InformationQuices = () => {
	const navigate = useNavigate();
	const rxDispatch = useDispatch();
	const [error, setError] = useState(false);
	const [noDataMissions, setNoDataMissions] = useState(false);
	const [noDataTLs, setNoDataTLs] = useState(false);
	const [noDataAgents, setNoDataAgents] = useState(false);
	const [loadingAgents, setLoadingAgents] = useState(false);
	const [loadingTLs, setLoadingTLs] = useState(false);
	const [loadingMissions, setLoadingMissions] = useState(false);
	const [agents, setAgents] = useState([]);
	const [teamLs, setTeamLs] = useState([]);
	const [missions, setMissions] = useState([]);

	useEffect(
		() => {
			const getData = async () => {
				setLoadingTLs(true);
				setLoadingAgents(true);
				setLoadingMissions(true);
				const allTLs = dataTLs; //await getMissions(1, 1032);
				if (allTLs && allTLs.status === 200 && allTLs.data.length > 0) {
					if (allTLs.data[0].id !== "0" && allTLs.data[0].tlName !== "0") {
						const allAgents = dataAgents; // await  request
						if (
							allAgents &&
							allAgents.status === 200 &&
							allAgents.data.length > 0
						) {
							if (
								allAgents.data[0].id !== "0" &&
								allAgents.data[0].Agent !== "0"
							) {
								const allMissions = dataMissions; ///await request
								if (
									allMissions &&
									allMissions.status === 200 &&
									allMissions.data.length > 0
								) {
									if (
										allMissions.data[0].id !== "0" &&
										allMissions.data[0].Agent !== "0"
									) {
										setLoadingTLs(false);
										setLoadingAgents(false);
										setLoadingMissions(false);
										//settear toda la info
										setTeamLs(allTLs);
										setAgents(allAgents);
										setMissions(allMissions);
									} else {
										setLoadingTLs(false);
										setLoadingAgents(false);
										setLoadingMissions(false);
										//settear Team Leaders y agentes
										setTeamLs(allTLs);
										setAgents(allAgents);
										setNoDataMissions(true);
									}
								} else if (
									allMissions &&
									allMissions.data === "UnauthorizedError"
								) {
									rxDispatch(logoutAction());
									navigate("/");
								} else {
									setLoadingTLs(false);
									setLoadingAgents(false);
									setLoadingMissions(false);
									setError(true);
								}
							} else {
								setLoadingTLs(false);
								setLoadingAgents(false);
								setLoadingMissions(false);
								/// settear Team leaders
								setTeamLs(allTLs);
								setNoDataMissions(true);
								setNoDataAgents(true);
							}
						} else if (allAgents && allAgents.data === "UnauthorizedError") {
							rxDispatch(logoutAction());
							navigate("/");
						} else {
							setLoadingTLs(false);
							setLoadingAgents(false);
							setLoadingMissions(false);
							setError(true);
						}
					} else {
						setLoadingTLs(false);
						setLoadingAgents(false);
						setLoadingMissions(false);
						setNoDataTLs(true);
						setNoDataAgents(true);
						setNoDataMissions(true);
					}
				} else if (allTLs && allTLs.data === "UnauthorizedError") {
					rxDispatch(logoutAction());
					navigate("/");
				} else {
					setLoadingTLs(false);
					setLoadingAgents(false);
					setLoadingMissions(false);
					setError(true);
				}
			};
			getData();
		},
		// eslint-disable-next-line
		[]
	);

	const handleTL = () => {};
	const handleAgent = () => {};
	const removeMission = () => {};

	return (
		<MainPage>
			<Header />
			<Typography variant="h5">Information Quizes</Typography>

			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<Typography variant="h6" textAlign="center" color="#3047B0">
						Teams
					</Typography>
					<BoxContain mt={1}>
						{error ? (
							<Typography variant="body1">Server Problems</Typography>
						) : noDataTLs ? (
							<Typography variant="body1">no se han creado equipos</Typography>
						) : loadingTLs ? (
							<LoadingComponent />
						) : (
							//map
							teamLs?.map((tl) => (
								<CardButton
									index={tl.id}
									title={tl.tlName}
									subtitle={tl.Rol}
									icon="arrow"
								/>
							))
						)}
					</BoxContain>
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography variant="h6" textAlign="center" color="#3047B0">
						Team Members
					</Typography>
					<BoxContain mt={1}>
						{error ? (
							<Typography variant="body1">Server Problems</Typography>
						) : noDataAgents ? (
							<Typography variant="body1">no se han creado equipos</Typography>
						) : loadingAgents ? (
							<LoadingComponent />
						) : (
							//map
							agents?.map((ag) => (
								<CardButton
									index={ag.id}
									title={ag.tlName}
									subtitle={ag.Rol}
									icon="arrow"
								/>
							))
						)}
					</BoxContain>
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography variant="h6" textAlign="center" color="#3047B0">
						Missions Assigned
					</Typography>
					<BoxContain mt={1}>
						{error ? (
							<Typography variant="body1">Server Problems</Typography>
						) : noDataMissions ? (
							<Typography variant="body1">no se han creado equipos</Typography>
						) : loadingMissions ? (
							<LoadingComponent />
						) : (
							//map
							missions?.map((miss) => (
								<CardButton
									index={miss.id}
									title={miss.tlName}
									subtitle={miss.Rol}
									icon="trash"
								/>
							))
						)}
						{/* <CardButton title="Quiz1" subtitle="Quiz Topic" icon="trash" /> */}
					</BoxContain>
				</Grid>
			</Grid>

			<Footer />
		</MainPage>
	);
};

export default InformationQuices;
