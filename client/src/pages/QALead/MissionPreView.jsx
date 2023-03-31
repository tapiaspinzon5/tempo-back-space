import {
	Box,
	Button,
	Grid,
	IconButton,
	styled,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { CgTrash } from "react-icons/cg";
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

const myQuiz = {
	PreguntasCorrectas: 1,
	TotalPreguntas: 2,
	ApprovalExam: 80,
	Calificación: 50,
	EstadoExamen: "REPROBADO",
	IdExamen: 58,
	NameExam: "Mision Pruebas 07022023",
	DescriptionExam: "Mision Pruebas 07022023",
	UrlBadge:
		"https://firebasestorage.googleapis.com/v0/b/storage-296723/o/Gamification%2FbadgesImages%2F46%20-%20Testing%20badgeImage?alt=media&token=69a15bd3-b8f3-4f0b-a201-360c05298a8a",
	Respuestas: [
		{
			Pregunta:
				"Pregunta 1 Pruebas dsdsdsdsdsdsdsdsds dsdsdsdsdsds dsdsdsds dsdsdsd sdsdsdsds dsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsds dsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsds dsdsdsdsdsdsdsdsds dsdsdsdsdsdsdsdsdsds",
			Respuesta1: "true",
			Respuesta2: "false",
			Answer: "false",
			AnswerUser: "true",
			Respuesta3: null,
			Respuesta4: null,
			Idpregunta: 1,
			TypeQuestionId: 2,
			TypeQuestion: "Verdadero / Falso",
		},
		{
			IdExamen: 58,

			Pregunta: "Pregunta 2 Pruebas",
			Respuesta1: "Respuesta 1",
			Respuesta2: "Respuesta 2",
			Respuesta3: "Respuesta 3",
			Respuesta4: "Respuesta 4",
			Answer: "Respuesta 1",
			AnswerUser: "Respuesta 3",
			Idpregunta: 5,
			TypeQuestionId: 1,
			TypeQuestion: "Unica Respuesta",
		},
		{
			Pregunta: "Como se sienten trabajando con nosotros ",
			Respuesta1: "Super",
			Respuesta2: "Bien",
			Respuesta3: "Excelente",
			Respuesta4: "DPM",
			Idpregunta: 1,
			Answer1: "Super",
			Answer2: "Excelente",
			Answer3: "DPM",
			AnswerUser1: "Excelente",
			AnswerUser2: "Super",
			AnswerUser3: "DPM",
			TypeQuestionId: 3,
			TypeQuestion: "Multiple Respuesta",
		},
		{
			Pregunta: "Que tal todo",
			Respuesta1: "super",
			Respuesta2: "bien",
			Respuesta3: "excelente",
			Respuesta4: "mejor",
			Answer: "excelente",
			AnswerUser: "excelente",
			Idpregunta: 5,
			TypeQuestionId: 1,
			TypeQuestion: "Unica Respuesta",
		},
		{
			Pregunta: "quedo todo super",
			Respuesta1: "true",
			Respuesta2: "false",
			Respuesta3: null,
			Respuesta4: null,
			Answer: "false",
			AnswerUser: "false",
			Idpregunta: 9,
			TypeQuestionId: 2,
			TypeQuestion: "Verdadero / Falso",
		},
	],
};

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
	useEffect(() => {
		getMissInfo(myQuiz);
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
	const {
		NameExamTemp,
		NameExam,
		DescriptionExam,
		DescriptionExamTemp,
		ApprovalExam,
		ApprovalExamTemp,
		UrlBadge,
		Respuestas,
		reset,
	} = state;
	const numberQ = Math.ceil((Respuestas.length * ApprovalExamTemp) / 100);

	return (
		<MainPage>
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
												Respuestas.length}
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
					{Respuestas.map((question, index) => (
						<QuestionPreView
							key={index}
							index={index + 1}
							question={question}
						/>
					))}
				</Grid>
				<Box
					sx={{
						display: "flex",
						alignItems: " center",
						justifyContent: "center",
					}}
				>
					<Button onClick={() => console.log("first")}> {"➕"} </Button>
				</Box>
				<Box sx={{ display: "flex", flexFlow: "row-reverse wrap" }}>
					<Button onClick={() => navigate("/upquiz")}>
						Return All Missions
					</Button>
					{reset && (
						<Button onClick={() => console.log("first")}>
							Reset all Changes
						</Button>
					)}
					<Button onClick={() => console.log("first")}>Save Changes</Button>
				</Box>
			</BoxContain>
		</MainPage>
	);
};

export default MissionPreView;
