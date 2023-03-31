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
import React, { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { InputText } from "../../assets/styled/muistyled";

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
	{ q: "All", t: "All" },
	{ q: "Q1", t: "T1" },
	{ q: "Q2", t: "T2" },
	{ q: "Q3", t: "T3" },
	{ q: "Q4", t: "T4" },
];
/* {
    "Pregunta": "pregunta de multiple opcion con unica respuesta",
    "Respuesta1": "rta 1",
    "Respuesta2": "rta2",
    "Respuesta3": "rta3",
    "Respuesta4": "rta4",
    "RespuestaCorrecta": "rta3",
    "Answer1": "rta3",
    "Answer2": "",
    "Answer3": "",
    "Answer4": "",
    "T1": "T1",
    "T2": "T2",
    "T3": "T3",
    "T4": "T4",
    "TypeQuestionId": 1
} */
const QuestionPreView = ({ question, index }) => {
	const {
		Respuesta1,
		Respuesta2,
		Respuesta3,
		Respuesta4,
		Answer1,
		Answer2,
		Answer3,
		Answer4,
		TypeQuestionId,
	} = question;
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
							value={""}
							label="Quartile"
							//onChange={(e) => setAsk({ ...ask, Q: e.target.value })}
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
						Tenior All
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
								//onChange={handleQuestion}
								required
								//error={!ask.ask && empty}
								/* helperText={
            !ask.ask && empty ? (
              "Field Requiered"
            ) : (
              <p style={{ color: "#3047B0", textAlign: "end", margin: "2px" }}>
                {msj}
              </p>
            ) 
          }*/
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
					{[Respuesta1, Respuesta2, Respuesta3, Respuesta4].map(
						(respuesta, index) =>
							edit ? (
								<InputText
									fullWidth
									name="Answer1"
									label={`Answer ${index + 1}`}
									variant="outlined"
									//onChange={(e) => setAsk({ ...ask, [q]: e.target.value })}
									value={respuesta || ""}
									required
									size="small"
									sx={{ marginTop: ".5rem" }}
									//error={!ask[q] && empty}
									//helperText={!ask[q] && empty ? "Field Requiered" : ""}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<input
													type="checkbox"
													style={{ height: "1.5rem", width: "1.5rem" }}
													id="answer"
													name="answer"
													//value={respuesta === Answer ? true : false}
													checked={
														respuesta === Answer1 ||
														respuesta === Answer2 ||
														respuesta === Answer3 ||
														respuesta === Answer4
															? true
															: false
													}
													//onChange={(e) => setAsk({ ...ask, answer: e.target.value })}
												/>
											</InputAdornment>
										),
									}}
								/>
							) : (
								<Box key={index}>
									<BoxAnswer
										sx={
											respuesta === Answer1 ||
											respuesta === Answer2 ||
											respuesta === Answer3 ||
											respuesta === Answer4
												? { background: "#00AF9B" }
												: {}
										}
									>
										<BoxCheckbox>
											{respuesta === Answer1 ||
											respuesta === Answer2 ||
											respuesta === Answer3 ||
											respuesta === Answer4 ? (
												<Checkbox />
											) : (
												""
											)}
										</BoxCheckbox>
										<Box ml={3} flex={1}>
											<Typography variant="body2" color="initial">
												{respuesta}
											</Typography>
										</Box>
									</BoxAnswer>
								</Box>
							)
					)}
					<Box sx={{ display: "flex", flexFlow: "row-reverse wrap" }}>
						<IconButton onClick={() => console.log("first")}>
							<CgTrash size={20} color={"#3047B0"} />
						</IconButton>
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
					{[Respuesta1, Respuesta2, Respuesta3, Respuesta4].map(
						(respuesta, index) =>
							respuesta &&
							(edit ? (
								<InputText
									fullWidth
									name="Answer1"
									label={`Answer ${index + 1}`}
									variant="outlined"
									//onChange={(e) => setAsk({ ...ask, [q]: e.target.value })}
									value={respuesta || ""}
									required
									size="small"
									sx={{ marginTop: ".5rem" }}
									//error={!ask[q] && empty}
									//helperText={!ask[q] && empty ? "Field Requiered" : ""}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<input
													type="radio"
													style={{ height: "1.5rem", width: "1.5rem" }}
													id="answer"
													name="answer"
													//value={respuesta === Answer ? true : false}
													checked={respuesta === Answer1 ? true : false}
													//onChange={(e) => setAsk({ ...ask, answer: e.target.value })}
												/>
											</InputAdornment>
										),
									}}
								/>
							) : (
								<Box key={index}>
									<BoxAnswer
										sx={respuesta === Answer1 ? { background: "#00AF9B" } : {}}
									>
										<BoxCheck>{respuesta === Answer1 && <Check />}</BoxCheck>
										<Box ml={3} flex={1}>
											<Typography variant="body2" color="initial">
												{respuesta}
											</Typography>
										</Box>
									</BoxAnswer>
								</Box>
							))
					)}
					<Box sx={{ display: "flex", flexFlow: "row-reverse wrap" }}>
						{edit ? (
							<Button onClick={() => setEdit(!edit)}> {"❌"} </Button>
						) : (
							<IconButton onClick={() => console.log("first")}>
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
			)}
		</BoxCard>
	);
};

export default QuestionPreView;
