import React, { useState } from "react";
import {
	Typography,
	Box,
	styled,
	Button,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	FormHelperText,
} from "@mui/material";

const MainModal = styled(Box)(() => ({
	minHeight: "50vh",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	textAlign: "center",

	h5: {
		fontWeight: 900,
		marginBottom: "2rem",
	},
}));

const MainButtons = styled(Box)(() => ({
	button: {
		textTransform: "none",
		color: "white",
		width: "177px",
		height: "61px",
		background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
	},
}));
const BoxFormControl = styled(FormControl)(() => ({
	width: "15rem",
	margin: "2rem 2rem",
}));

const AddQuestion = ({ setModal, handleAdd }) => {
	const [type, setType] = useState("");
	const [error, setError] = useState(false);
	return (
		<MainModal>
			<Typography variant="h3" color="initial">
				Select Question Type
			</Typography>
			<Box>
				<BoxFormControl>
					<InputLabel id="time-label">Question Type</InputLabel>
					<Select
						labelId="question-type-label"
						value={type || ""}
						label="Question Type"
						onChange={(e) => {
							setError(false);
							setType(e.target.value);
						}}
					>
						<MenuItem value="trueFalse">True or False</MenuItem>
						<MenuItem value="multipleChoice">Multiple Choice</MenuItem>
						<MenuItem value="multipleAnswer">Multiple Answer</MenuItem>
					</Select>
					{error && <FormHelperText error>{"Field Requiered"}</FormHelperText>}
				</BoxFormControl>
			</Box>
			<MainButtons>
				<Button sx={{ marginRight: "2rem" }} onClick={() => setModal(false)}>
					Return
				</Button>
				<Button
					sx={{ marginRight: "2rem" }}
					onClick={() => (type === "" ? setError(true) : handleAdd(type))}
				>
					Add Question
				</Button>
			</MainButtons>
		</MainModal>
	);
};

export default AddQuestion;
