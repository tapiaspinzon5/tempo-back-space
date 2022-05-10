import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, styled } from "@mui/material";
import { MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingComponent from "../../components/LoadingComponent";
import CardButtonTLs from "../../components/QALead/informationQuices/CardButtonTLs";
import CardButtonAgets from "../../components/QALead/informationQuices/CardButtonAgents";
import CardButtonMissions from "../../components/QALead/informationQuices/CardButtonMissions";
import { requestWithData } from "../../utils/api";

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
		},
	],
	status: 200,
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
		},
	],
	status: 200,
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
	const [dataToSend, setDataToSend] = useState({});
	const [viewAgents, setViewAgents] = useState(false);
	const [viewMissions, setViewMissions] = useState(false);

	useEffect(
		() => {
			const getData = async () => {
				setLoadingTLs(true);
				setViewAgents(false);
				setViewMissions(false);
				const allTLs = await requestWithData("getmissionsinformation", {
					idccmsAgent: "",
					idTeam: 0,
					context: 1,
				});
				if (allTLs && allTLs.status === 200 && allTLs.data.length > 0) {
					if (
						allTLs.data[0].idTeam !== "0" &&
						allTLs.data[0].NameTeam !== "0"
					) {
						setTeamLs(allTLs.data[0].Teams);
						setLoadingTLs(false);
					} else {
						setLoadingTLs(false);
						setNoDataTLs(true);
					}
				} else if (allTLs && allTLs.data === "UnauthorizedError") {
					rxDispatch(logoutAction());
					navigate("/");
				} else {
					setLoadingTLs(false);
					setError(true);
				}
			};
			getData();
		},
		// eslint-disable-next-line
		[]
	);

	const handleTL = async (idTeam) => {
		setAgents([]);
		setMissions([]);
		setLoadingAgents(true);
		setViewAgents(true);
		const agents = await requestWithData("getmissionsinformation", {
			idccmsAgent: "",
			idTeam,
			context: 2,
		});
		if (agents && agents.status === 200 && agents.data.length > 0) {
			if (agents.data[0].Ident !== "0" && agents.data[0].Agent !== "0") {
				setLoadingAgents(false);
				setAgents(agents.data[0].TeamsMembers);
			} else {
				setLoadingAgents(false);
				setNoDataAgents(true);
			}
		} else if (agents && agents.data === "UnauthorizedError") {
			rxDispatch(logoutAction());
			navigate("/");
		} else {
			setLoadingAgents(false);
			setViewAgents(false);
			setViewMissions(false);
			setError(true);
		}
	};

	const handleAgent = async (data) => {
		setLoadingMissions(true);
		setViewMissions(true);
		setDataToSend({ ...dataToSend, name: data.name, idccms: data.idccms });
		const dbMissions = await requestWithData("getmissionsinformation", {
			idccmsAgent: data.idccms,
			idTeam: 0,
			context: 3,
		});
		if (dbMissions && dbMissions.status === 200 && dbMissions.data.length > 0) {
			if (
				dbMissions.data[0].MissionAssigned[0].idQuiz !== "0" &&
				dbMissions.data[0].MissionAssigned[0].Topic !== "0"
			) {
				console.log(dbMissions.data[0].MissionAssigned);
				setLoadingMissions(false);
				setMissions(dbMissions.data[0].MissionAssigned);
			} else {
				setLoadingMissions(false);
				setNoDataMissions(true);
			}
		} else if (dbMissions && dbMissions.data === "UnauthorizedError") {
			rxDispatch(logoutAction());
			navigate("/");
		} else {
			setLoadingMissions(false);
			setViewAgents(false);
			setViewMissions(false);
			setError(true);
		}
	};

	const submit = async (ag, miss) => {
		const cqa = await await requestWithData("inactivatemissionagent", {
			idccmsAgent: ag.idccms,
			idMission: miss.Id,
		});

		if (cqa && cqa.status === 200) {
			MySwal.fire({
				title: <p>{"Removed!"}</p>,
				icon: "success",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					window.location.reload();
				}
			});
		} else {
			MySwal.fire({
				title: <p>Send Error!</p>,
				icon: "error",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					window.location.reload();
				}
			});
		}
	};

	const removeMission = (data) => {
		MySwal.fire({
			title: (
				<p>{`Are you sure you want to remove the "examName" mission from the "Agent"?`}</p>
			),
			icon: "info",
			showDenyButton: true,
			confirmButtonText: "Accept",
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				submit(dataToSend, data);
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	};

	return (
		<MainPage>
			<Header />
			<Typography variant="h5">Mission Information</Typography>

			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<Typography variant="h6" textAlign="center" color="#3047B0">
						Teams
					</Typography>
					<BoxContain mt={1}>
						{error ? (
							<Typography variant="body1">Server Problems</Typography>
						) : noDataTLs ? (
							<Typography variant="body1">Teams are not loaded</Typography>
						) : loadingTLs ? (
							<LoadingComponent />
						) : (
							teamLs?.map((tl) => (
								<CardButtonTLs
									index={tl.id}
									tl={tl}
									handleAgent={handleTL}
									icon="arrow"
								/>
							))
						)}
					</BoxContain>
				</Grid>
				{!error && viewAgents && (
					<Grid item xs={12} md={4}>
						<Typography variant="h6" textAlign="center" color="#3047B0">
							Team Members
						</Typography>
						<BoxContain mt={1}>
							{noDataAgents ? (
								<Typography variant="body1">Agents are not loaded</Typography>
							) : loadingAgents ? (
								<LoadingComponent />
							) : (
								agents?.map((ag) => (
									<CardButtonAgets
										index={ag.Ident}
										ag={ag}
										handleAgent={handleAgent}
										icon="arrow"
									/>
								))
							)}
						</BoxContain>
					</Grid>
				)}
				{!error && viewMissions && (
					<Grid item xs={12} md={4}>
						<Typography variant="h6" textAlign="center" color="#3047B0">
							Missions Assigned
						</Typography>
						<BoxContain mt={1}>
							{noDataMissions ? (
								<Typography variant="body1">
									This agent has no assigned missions
								</Typography>
							) : loadingMissions ? (
								<LoadingComponent />
							) : (
								missions?.map((miss) => (
									<CardButtonMissions
										index={miss.idQuiz}
										miss={miss}
										removeMission={removeMission}
										icon="trash"
									/>
								))
							)}
						</BoxContain>
					</Grid>
				)}
			</Grid>
			<Footer />
		</MainPage>
	);
};

export default InformationQuices;
