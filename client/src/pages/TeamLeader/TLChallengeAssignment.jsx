import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, styled, Typography, Box, Button } from "@mui/material";
import Header from "../../components/homeUser/Header";
import Footer from "../../components/Footer";
import {
	downloadActivities,
	downloadUsers,
	assingChallenges,
} from "../../utils/api";
import LoadingComponent from "../../components/LoadingComponent";
import { ModalLoading } from "../../components/ModalLoading";
import { UserChallenge } from "../../components/Agents/Challenges/UserChallenge";
import { ChallengeCard } from "../../components/Agents/Challenges/ChallengeCard";

import { validateDataCheck } from "../../helpers/helpers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ButtonAction, MainPage } from "../../assets/styled/muistyled";
import FormCreateNewChallenge from "../../components/Modals/FormCreateNewChallenge";
import TLChallengeCard from "../../components/Agents/Challenges/TLChallengeCard";
import ShowUserActivity from "../../components/teamLeader/ShowUserActivity";

const MySwal = withReactContent(Swal);

const BoxSelectBadge = styled(Grid)(() => ({
	button: {
		textTransform: "none",
		background: "#fff",
		margin: "5px",
		width: "9rem",
		fontWeight: "600",
		border: "1px solid #00000009",
	},

	margin: "2rem 0",
}));

const BoxActivity = styled(Grid)(() => ({
	background: "#f2f2f2",
	padding: "1rem",
	borderRadius: "20px",
	height: "55vh",
}));

const Boxview = styled(Grid)(() => ({
	overflowY: "scroll",
	height: "40vh",
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
const BoxviewCh = styled(Grid)(() => ({
	overflowY: "scroll",
	height: "45vh",
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
const selectButton = {
	boxShadow: "0px 3px 6px #00000029",
	borderRadius: "10px",
	textTransform: "none",
};

export const TLChallengeAssignment = ({ count }) => {
	const [loading, setLoading] = useState(false);
	const [fullLoading, setFullLoading] = useState(false);
	const userData = useSelector((store) => store.loginUser.userData);
	const idccms = userData.Idccms;
	const userName = userData.Nombre;
	const [activity, setActivity] = useState([]);
	const [error, setError] = useState(false);
	const [users, setUsers] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);
	useEffect(() => {
		const getData = async () => {
			const user = await downloadUsers(idccms);
			if (user && user.status === 200 && user.data.length > 1) {
				setLoading(true);
				let ccmsAgent = user.data[0].Agents[0].ident;
				user.data[0].Agents[0].isChecked = true;
				setUsers(user.data[0].Agents);
				const activities = await downloadActivities(ccmsAgent, idccms);
				if (
					activities &&
					activities.status === 200 &&
					activities.data.length > 1
				) {
					setActivity(activities.data);
					setLoading(false);
				} else {
					setError(true);
				}
			} else {
				setError(true);
			}
		};

		getData();
		// eslint-disable-next-line
	}, []);

	//funcion de asingacion de usuarios
	const handleUser = (e) => {
		const { name, checked } = e.target;
		if (name === "selecct-all") {
			let tempUser = users.map((user) => {
				return { ...user, isChecked: checked };
			});

			setUsers(tempUser);
		} else {
			let tempUser = users.map((user) =>
				user.Agent === name ? { ...user, isChecked: checked } : user
			);
			setUsers(tempUser);
		}
	};

	///Función Envio de Challenges
	const handleSubmit = async (data) => {
		setFullLoading(true);
		const dataToSendChallenge = await validateDataCheck(users, data, userName);
		const sendChallenge = await assingChallenges(
			dataToSendChallenge[0],
			idccms
		);
		if (sendChallenge && sendChallenge.status === 200) {
			setFullLoading(false);
			MySwal.fire({
				title: <p>Successful Assignments</p>,
				icon: "success",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					window.location.reload();
				}
			});
		} else {
			setLoading(false);
			MySwal.fire({
				title: <p>Send Error</p>,
				icon: "error",
			});
		}
	};
	return (
		<>
			{fullLoading && <ModalLoading />}
			<FormCreateNewChallenge openModal={openModal} handleClose={handleClose} />

			<MainPage>
				<Header count={count} />
				<Grid container>
					<Grid item xs={6}>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography variant="h5" fontWeight={500}>
								Challenge Assignment
							</Typography>

							<ButtonAction onClick={handleOpen} disabled>
								Create New Challenge
							</ButtonAction>
						</Box>
					</Grid>

					<BoxSelectBadge item xs={4}></BoxSelectBadge>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6} padding={1}>
						<BoxActivity>
							<Box marginBottom={2}></Box>
							<BoxviewCh>
								{!error ? (
									activity?.map((act, index) => (
										<TLChallengeCard
											key={index}
											challenge={act}
											handleChallenge={handleSubmit}
										/>
									))
								) : (
									<Typography variant="h5" fontWeight={500}>
										The Game Starts Soon
									</Typography>
								)}
							</BoxviewCh>
						</BoxActivity>
					</Grid>
					<Grid item xs={12} md={5} padding={1}>
						<BoxActivity>
							<Box marginBottom={2}>
								<Button sx={selectButton}>
									<input
										type="checkbox"
										name="selecct-all"
										onChange={handleUser}
										checked={
											users.filter((user) => user?.isChecked !== true).length <
											1
										}
									/>
									Select all
								</Button>
							</Box>
							<Boxview>
								{!error ? (
									users.map((user, index) => (
										<ShowUserActivity
											key={index}
											user={user}
											handleUser={handleUser}
										/>
									))
								) : (
									<Typography variant="h5" fontWeight={500}>
										The Game Starts Soon
									</Typography>
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
		</>
	);
};
