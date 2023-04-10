import {
	Box,
	Button,
	Grid,
	IconButton,
	Modal,
	styled,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { BoxContain, MainPage } from "../../assets/styled/muistyled";
import Header from "../../components/homeUser/Header";
import QuestionPreView from "../../components/Quizes/QuestionPreView";
import {
	missionsEditInitialState,
	missionsEditReducer,
	TYPES,
} from "../../reducers/missionsEdit";
import { requestWithData } from "../../utils/api";
import AddQuestion from "../../components/Modals/AddQuestion";
import { dtsEditMissions } from "../../helpers/helperEditMissions";
const MySwal = withReactContent(Swal);
const BoxDetails = styled(Box)({
	display: "flex",
	minHeight: "5rem",
	justifyContent: "space-between",
	alignItems: "center",
	paddingY: "2rem",
});
const BoxTitle = styled(Box)({
	background: "linear-gradient(#3047B0, #0087FF)",
	height: "5rem",
	padding: "0 2rem",
	display: "flex",
	borderRadius: "10px",
	justifyContent: "center",
	alignItems: "center",
	minWidth: "100px",
	p: {
		color: "#fff",
		fontWeight: "semibold",
		fontSize: "24px",
	},
});

const ModalBox = styled(Box)(() => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	//width: 400,
	borderRadius: "20px",
	boxShadow: "2px 2px 5px #2f2f2f",
	padding: "1rem",
	backgroundColor: "RGBA(255,255,255,0.9)",
}));

const MainButtons = styled(Box)(() => ({
	button: {
		marginLeft: "1rem",
		textTransform: "none",
		color: "white",
		width: "177px",
		height: "41px",
		background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
	},
}));

const MissionPreView = ({ count }) => {
	const [state, dispatch] = useReducer(
		missionsEditReducer,
		missionsEditInitialState
	);
	const navigate = useNavigate();
	const idMission = useParams();
	const idMiss = atob(idMission.idquiz);
	const [target, setTarget] = useState(false);
	const [title, setTitle] = useState(false);
	const [description, setDescription] = useState(false);
	const [modal, setModal] = useState(false);
	useEffect(() => {
		getMissInfo();
	}, []);
	const getMissInfo = async () => {
		const missInfo = await requestWithData("getexamdetail", {
			idExam: idMiss,
		});
		dispatch({
			type: TYPES.GET_DATA_MISSION,
			payload: {
				missInfo: missInfo.data,
			},
		});
	};

	const handleQuestion = (data) => {
		dispatch(data);
	};

	const handleQuestionCheck = (data) => {
		dispatch(data);
	};

	const handleAdd = (type) => {
		setModal(false);
		dispatch({
			type: TYPES.ADD_QUESTION,
			payload: {
				new: true,
				idP: RespuestasTemp.length + 1,
				Pregunta: "Write you question",
				RespuestasAG:
					type === "trueFalse"
						? [
								{
									value: "true",
									checked: false,
								},
								{
									value: "false",
									checked: false,
								},
						  ]
						: [
								{
									value: "Write your option A",
									checked: false,
								},
								{
									value: "Write your option B",
									checked: false,
								},
								{
									value: "Write your option C",
									checked: false,
								},
								{
									value: "Write your option D",
									checked: false,
								},
						  ],
				RespuestaCorrecta: "",
				Tenior: "all",
				edit: true,
				TypeQuestionId:
					type === "multipleAnswer" ? 3 : type === "multipleChoice" ? 1 : 2,
			},
		});
	};

	const handleDelete = (data) => {
		MySwal.fire({
			title: <p>Do you want to delete this question?</p>,
			icon: "question",
			confirmButtonText: "Accept",
			showDenyButton: true,
			allowOutsideClick: false,
		}).then((resultado) => {
			if (resultado.value) {
				dispatch(data);
			}
		});
	};
	const handleReset = () => {
		MySwal.fire({
			title: <p>Do you want to reset all changes?</p>,
			icon: "question",
			confirmButtonText: "Accept",
			showDenyButton: true,
			allowOutsideClick: false,
		}).then((resultado) => {
			if (resultado.value) {
				dispatch({ type: TYPES.RESET_ALL, payload: {} });
			}
		});
	};

	const handleEdit = () => {
		MySwal.fire({
			title: <p>Do you want to save all changes?</p>,
			icon: "question",
			confirmButtonText: "Accept",
			showDenyButton: true,
			allowOutsideClick: false,
		}).then((resultado) => {
			if (resultado.value) {
				const dts = dtsEditMissions(state);
				console.log(dts);
			}
		});
	};

	const {
		NameExamTemp,
		NameExam,
		DescriptionExam,
		DescriptionExamTemp,
		ApprovalExam,
		ApprovalExamTemp,
		UrlBadge,
		RespuestasTemp,
		reset,
	} = state;
	//console.log("aquiiiiiiiii", state);
	const numberQ = Math.ceil((RespuestasTemp.length * ApprovalExamTemp) / 100);
	return (
		<MainPage>
			<Modal
				open={modal}
				onClose={() => setModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
					<AddQuestion setModal={setModal} handleAdd={handleAdd} />
				</ModalBox>
			</Modal>
			<Grid>
				<Header count={count} />
			</Grid>
			{/* contenido  */}
			<BoxContain margin="1rem 0">
				<BoxDetails>
					<Box display="flex" alignItems="center">
						<Box>
							<img src={UrlBadge} alt={NameExamTemp} width={120} />
						</Box>
						<Box textAlign="left" ml={4}>
							<>
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										width: "100%",
									}}
								>
									{title ? (
										<textarea
											rows={5}
											cols={90}
											value={NameExamTemp}
											onChange={(e) =>
												dispatch({
													type: TYPES.EDIT_NAME,
													payload: e.target.value,
												})
											}
										/>
									) : (
										<Typography
											sx={{ marginRight: "1rem", maxWidth: "90%" }}
											variant="h6"
											fontWeight="bold"
										>
											{NameExamTemp}
										</Typography>
									)}
									{title ? (
										<Tooltip
											title={
												NameExamTemp === "" ? "This field can't be empty" : ""
											}
											placement="top"
											arrow
										>
											<Button
												onClick={
													NameExamTemp === ""
														? null
														: () => {
																setTitle(!title);
																dispatch({
																	type: TYPES.CHECKED_NAME,
																	payload: true,
																});
														  }
												}
											>
												{" "}
												{"\u2714\uFE0F"}{" "}
											</Button>
										</Tooltip>
									) : (
										<IconButton onClick={() => setTitle(!title)}>
											<FiEdit3 size={20} color={"#3047B0"} />
										</IconButton>
									)}
									{title && (
										<Button
											onClick={() => {
												setTitle(!title);
												dispatch({
													type: TYPES.CHECKED_NAME,
													payload: false,
												});
											}}
										>
											{" "}
											{"❌"}{" "}
										</Button>
									)}

									{NameExam !== NameExamTemp && (
										<Typography
											variant="h6"
											color={"blue"}
											fontSize={15}
											mt={1}
										>
											Edited
										</Typography>
									)}
								</Box>
							</>
							<Box sx={{ display: "flex", marginTop: "1rem" }}>
								{description ? (
									<textarea
										rows={5}
										cols={90}
										value={DescriptionExamTemp}
										onChange={(e) =>
											dispatch({
												type: TYPES.EDIT_DESCRIPTION,
												payload: e.target.value,
											})
										}
									/>
								) : (
									<Typography
										sx={{ marginRight: "1rem", maxWidth: "90%" }}
										align="left"
										variant="body1"
									>
										{DescriptionExamTemp}
									</Typography>
								)}
								<Box sx={{ display: "flex" }}>
									{description ? (
										<Tooltip
											title={
												DescriptionExamTemp === ""
													? "This field can't be empty"
													: ""
											}
											placement="top"
											arrow
										>
											<Button
												onClick={
													DescriptionExamTemp === ""
														? null
														: () => {
																setDescription(!description);
																dispatch({
																	type: TYPES.CHECKED_DESCRIPTION,
																	payload: true,
																});
														  }
												}
											>
												{" "}
												{"\u2714\uFE0F"}{" "}
											</Button>
										</Tooltip>
									) : (
										<IconButton onClick={() => setDescription(!description)}>
											<FiEdit3 size={20} color={"#3047B0"} />
										</IconButton>
									)}
									{description && (
										<Button
											onClick={() => {
												setDescription(!description);
												dispatch({
													type: TYPES.CHECKED_DESCRIPTION,
													payload: false,
												});
											}}
										>
											{" "}
											{"❌"}{" "}
										</Button>
									)}
									{DescriptionExam !== DescriptionExamTemp && (
										<Typography
											variant="h6"
											color={"blue"}
											fontSize={15}
											mt={1}
										>
											Edited
										</Typography>
									)}
								</Box>
							</Box>
						</Box>
					</Box>
					<BoxTitle>
						<Typography variant="body1">View</Typography>
					</BoxTitle>
				</BoxDetails>
				<Box display="flex" marginY={2} alignItems="center">
					<BoxTitle width="3rem">
						<Typography variant="body1" color="initial">
							Target
						</Typography>
					</BoxTitle>
					<Box marginLeft={4}>
						<>
							<Box sx={{ display: "flex", flexFlow: "row-reverse wrap" }}>
								{ApprovalExam !== ApprovalExamTemp && (
									<Typography variant="h6" color={"blue"} fontSize={15} mt={1}>
										Edited
									</Typography>
								)}
								{target && (
									<Button
										onClick={() => {
											setTarget(!target);
											dispatch({
												type: TYPES.CHECKED_TARGET,
												payload: false,
											});
										}}
									>
										{" "}
										{"❌"}{" "}
									</Button>
								)}
								{target ? (
									<Tooltip
										title={
											ApprovalExamTemp === "" ? "This field can't be empty" : ""
										}
										placement="top"
										arrow
									>
										<Button
											onClick={
												ApprovalExamTemp === ""
													? null
													: () => {
															setTarget(!target);
															dispatch({
																type: TYPES.CHECKED_TARGET,
																payload: true,
															});
													  }
											}
										>
											{" "}
											{"\u2714\uFE0F"}{" "}
										</Button>
									</Tooltip>
								) : (
									<IconButton onClick={() => setTarget(!target)}>
										<FiEdit3 size={20} color={"#3047B0"} />
									</IconButton>
								)}
								{target ? (
									<input
										type="text"
										value={ApprovalExamTemp}
										onChange={(e) =>
											isNaN(e.target.value) || e.target.value > 100
												? null
												: dispatch({
														type: TYPES.EDIT_TARGET,
														payload: e.target.value,
												  })
										}
									/>
								) : (
									<>
										<Typography variant="h6" fontWeight="bold">
											{numberQ +
												" respuestas correctas de " +
												RespuestasTemp.length}
										</Typography>
										<Typography mr="2rem" variant="h6" fontWeight="bold">
											{ApprovalExamTemp + "%"}
										</Typography>
									</>
								)}
							</Box>
						</>
					</Box>
				</Box>
				<Grid item xs={12}>
					{RespuestasTemp.map((question, index) => (
						<QuestionPreView
							key={index}
							index={index + 1}
							question={question}
							handleQuestion={handleQuestion}
							handleQuestionCheck={handleQuestionCheck}
							handleDelete={handleDelete}
						/>
					))}
				</Grid>
				<Box
					sx={{
						display: "flex",
						alignItems: " center",
						justifyContent: "center",
						marginBottom: "1rem",
					}}
				>
					<Button onClick={() => setModal(true)}> {"➕ Add question"} </Button>
				</Box>
				<Box sx={{ display: "flex", flexFlow: "row-reverse wrap" }}>
					<MainButtons>
						<Button onClick={() => navigate("/upquiz")}>
							Return All Missions
						</Button>
					</MainButtons>
					{reset && (
						<MainButtons>
							<Button onClick={handleReset}>Reset all Changes</Button>
						</MainButtons>
					)}
					{reset && (
						<MainButtons>
							<Button onClick={handleEdit}>Save Changes</Button>
						</MainButtons>
					)}
				</Box>
			</BoxContain>
		</MainPage>
	);
};

export default MissionPreView;
