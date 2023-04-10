import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	styled,
	Typography,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import React, { useReducer, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { InputText } from "../../assets/styled/muistyled";
import {
	missionsEditInitialState,
	missionsEditReducer,
	TYPES,
} from "../../reducers/missionsEdit";

const Item = styled(Box)({
	background: "linear-gradient(#3047B0, #0087FF)",
	height: "2.3rem",
	width: "2.3rem",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "10px",
	p: {
		color: "#fff",
		fontWeight: "bold",
		padding: 0,
		margin: 0,
	},
});

const BoxCard = styled(Box)({
	margin: "1rem",
	background: "#E9E9E9",
	//border: "1px solid blue",
	borderRadius: "10px",
	padding: "1rem",
});

const BoxAnswer = styled(Box)({
	display: "flex",
	alignItems: "center",
	margin: "5px 0",
	padding: "5px",
	borderRadius: "10px",
});
const BoxCheck = styled(Box)({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "50%",
	width: "2rem",
	height: "2rem",
	border: "1px solid #3047B0",
});

const Check = styled(Box)({
	display: "flex",
	borderRadius: "50%",
	width: "1.42rem",
	height: "1.42rem",
	background: "linear-gradient(#3047B0, #0087FF)",
});

const BoxCheckbox = styled(Box)({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "10px",
	width: "2rem",
	height: "2rem",
	border: "1px solid #3047B0",
});

const Checkbox = styled(Box)({
	display: "flex",
	borderRadius: "5px",
	width: "1.42rem",
	height: "1.42rem",
	background: "linear-gradient(#3047B0, #0087FF)",
});

const teniorProfile = [
	{ q: "all", t: "All" },
	{ q: "T1", t: "T1" },
	{ q: "T2", t: "T2" },
	{ q: "T3", t: "T3" },
	{ q: "T4", t: "T4" },
];

const QuestionPreView = ({
	question,
	index,
	handleQuestion,
	handleQuestionCheck,
	handleDelete,
}) => {
	const { TypeQuestionId, idP, Tenior } = question;

	const [edit, setEdit] = useState(false);

	return (
		<BoxCard>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					width: "100%",
				}}
			>
				{edit ? (
					<FormControl
						sx={{ width: "15%", marginLeft: "2rem", marginBottom: "1rem" }}
					>
						<InputLabel id="quartile-label">Tenior</InputLabel>
						<Select
							labelId="quartile-label"
							name="Tenior"
							value={question.Tenior}
							label="Quartile"
							onChange={(e) =>
								handleQuestion({
									type: TYPES.EDIT_TENIOR,
									payload: {
										data: e.target.value,
										idP,
									},
								})
							}
							required
						>
							{teniorProfile.map((q, index) => (
								<MenuItem value={q.q} key={index}>
									{q.t}
								</MenuItem>
							))}
						</Select>
						{/* <FormHelperText color="red">{"Field Requiered"}</FormHelperText> */}
					</FormControl>
				) : (
					<Typography sx={{ flex: "50%" }} variant="h6" fontWeight={"bold"}>
						{"Tenior " + Tenior}
					</Typography>
				)}
				{question.edit && (
					<Typography
						sx={{ flex: "50%", textAlign: "right", marginTop: 0 }}
						variant="h6"
						color={"blue"}
						fontSize={15}
					>
						Edited
					</Typography>
				)}
			</Box>
			<Box display="flex">
				<Item>
					<Typography variant="body1">{index}</Typography>
				</Item>
				<Box ml={3} flex={1}>
					{edit ? (
						<>
							<InputText
								sx={{
									whiteSpace: "pre-line",
								}}
								name="question"
								label="Question"
								variant="outlined"
								multiline
								rows={3}
								fullWidth
								value={question.Pregunta || ""}
								onChange={(e) =>
									handleQuestion({
										type: TYPES.EDIT_QUESTION,
										payload: {
											type: "question",
											data: e.target.value,
											idP,
										},
									})
								}
								required
								error={question.Pregunta === ""}
								helperText={question.Pregunta === "" && "Field Requiered"}
							/>
						</>
					) : (
						<Typography variant="h6" color="initial" fontWeight={700}>
							{question.Pregunta}
						</Typography>
					)}
				</Box>
			</Box>

			{TypeQuestionId === 3 ? (
				<>
					{question.RespuestasAG.map((respuesta, index) =>
						edit ? (
							<InputText
								fullWidth
								name={`Answer ${index + 1}`}
								label={`Answer ${index + 1}`}
								variant="outlined"
								onChange={(e) =>
									handleQuestion({
										type: TYPES.EDIT_QUESTION,
										payload: {
											type: "option",
											data: { ...respuesta, value: e.target.value },
											option: index,
											idP,
										},
									})
								}
								value={respuesta?.value || ""}
								required
								size="small"
								sx={{ marginTop: ".5rem" }}
								error={respuesta?.value === ""}
								helperText={respuesta?.value === "" && "Field Requiered"}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<input
												type="checkbox"
												style={{ height: "1.5rem", width: "1.5rem" }}
												id="answer"
												name="answer"
												checked={respuesta?.checked}
												onChange={(e) =>
													handleQuestion({
														type: TYPES.EDIT_QUESTION,
														payload: {
															type: "check",
															data: {
																...respuesta,
																checked: !respuesta?.checked,
															},
															option: index,
															idP,
														},
													})
												}
											/>
										</InputAdornment>
									),
								}}
							/>
						) : (
							<Box key={index}>
								<BoxAnswer
									sx={respuesta.checked ? { background: "#00AF9B" } : {}}
								>
									<BoxCheckbox>
										{respuesta.checked ? <Checkbox /> : ""}
									</BoxCheckbox>
									<Box ml={3} flex={1}>
										<Typography variant="body2" color="initial">
											{respuesta.value}
										</Typography>
									</Box>
								</BoxAnswer>
							</Box>
						)
					)}
					<Box sx={{ display: "flex", flexFlow: "row-reverse wrap" }}>
						{edit ? (
							<Button
								onClick={() => {
									setEdit(!edit);
									handleQuestionCheck({
										type: TYPES.CHECKED_QUESTION,
										payload: {
											value: false,
											idP,
										},
									});
								}}
							>
								{" "}
								{"❌"}{" "}
							</Button>
						) : (
							<IconButton
								onClick={() =>
									handleDelete({
										type: TYPES.DELETE_QUESTION,
										payload: { idP },
									})
								}
							>
								<CgTrash size={20} color={"#3047B0"} />
							</IconButton>
						)}
						{edit ? (
							<Button onClick={() => setEdit(!edit)}> {"\u2714\uFE0F"} </Button>
						) : (
							<IconButton onClick={() => setEdit(!edit)}>
								<FiEdit3 size={20} color={"#3047B0"} />
							</IconButton>
						)}
					</Box>
				</>
			) : (
				<>
					{question.RespuestasAG.map(
						(respuesta, index) =>
							respuesta.value &&
							(edit ? (
								<InputText
									fullWidth
									name={`Answer ${index + 1}`}
									label={`Answer ${index + 1}`}
									variant="outlined"
									disabled={TypeQuestionId === 2}
									onChange={(e) =>
										handleQuestion({
											type: TYPES.EDIT_QUESTION,
											payload: {
												type: "option",
												data: { ...respuesta, value: e.target.value },
												option: index,
												idP,
											},
										})
									}
									value={respuesta.value || ""}
									required
									size="small"
									sx={{ marginTop: ".5rem" }}
									error={respuesta.value === ""}
									helperText={respuesta.value === "" && "Field Requiered"}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<input
													type="radio"
													style={{ height: "1.5rem", width: "1.5rem" }}
													checked={respuesta.checked}
													onChange={(e) =>
														handleQuestion({
															type: TYPES.EDIT_QUESTION,
															payload: {
																type: "check2",
																data: {
																	...respuesta,
																	checked: !respuesta?.checked,
																},
																option: index,
																idP,
															},
														})
													}
												/>
											</InputAdornment>
										),
									}}
								/>
							) : (
								<Box key={index}>
									<BoxAnswer
										sx={respuesta.checked ? { background: "#00AF9B" } : {}}
									>
										<BoxCheck>{respuesta.checked && <Check />}</BoxCheck>
										<Box ml={3} flex={1}>
											<Typography variant="body2" color="initial">
												{respuesta.value}
											</Typography>
										</Box>
									</BoxAnswer>
								</Box>
							))
					)}
					<Box sx={{ display: "flex", flexFlow: "row-reverse wrap" }}>
						{edit ? (
							<Button
								onClick={() => {
									setEdit(!edit);
									handleQuestionCheck({
										type: TYPES.CHECKED_QUESTION,
										payload: {
											value: false,
											idP,
										},
									});
								}}
							>
								{" "}
								{"❌"}{" "}
							</Button>
						) : (
							<IconButton
								onClick={() =>
									handleDelete({
										type: TYPES.DELETE_QUESTION,
										payload: { idP },
									})
								}
							>
								<CgTrash size={20} color={"#3047B0"} />
							</IconButton>
						)}
						{edit ? (
							<Button
								onClick={() => {
									setEdit(!edit);
									handleQuestionCheck({
										type: TYPES.CHECKED_QUESTION,
										payload: {
											value: true,
											idP,
										},
									});
								}}
							>
								{" "}
								{"\u2714\uFE0F"}{" "}
							</Button>
						) : (
							<IconButton onClick={() => setEdit(!edit)}>
								<FiEdit3 size={20} color={"#3047B0"} />
							</IconButton>
						)}
					</Box>
				</>
			)}
		</BoxCard>
	);
};

export default QuestionPreView;
