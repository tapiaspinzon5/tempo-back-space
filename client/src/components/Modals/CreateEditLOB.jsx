import React, { useState } from "react";
import {
	Box,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
	styled,
	FormHelperText,
} from "@mui/material";
import { ButtonActionBlue, InputText } from "../../assets/styled/muistyled";
import { getInfoAgent } from "../../utils/api";

const TableCont = styled(Box)(() => ({
	color: "#3047B0",
	background: "#E8E8E8",
	borderRadius: "20px",
	padding: "5px",
	marginTop: "5px",
}));
const BoxTL = styled(Box)(() => ({
	border: "1px solid #3047B0",
	padding: "0.5rem",
	borderRadius: "10px",
}));

const BoxCeldas = styled(Box)(() => ({
	height: "8.5rem",
	overflowY: "scroll",
	padding: "0 .3rem",
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
const initialDataForm = {
	name: "",
	TeamLeaders: [],
};

const CreateEditLOB = ({ setDataLOB, dataLOB }) => {
	const [dataForm, setDataForm] = useState(
		dataLOB.idLob ? dataLOB : initialDataForm
	);
	const [error, setError] = useState(false);
	const [msgError, setMsgError] = useState("");
	const [errorccms, setErrorccms] = useState(false);
	const [msgErrorccms, setMsgErrorccms] = useState("");
	const [tempCcms, setTempCcms] = useState("");
	const handleSearch = async (ccms) => {
		if (ccms) {
			const info = await getInfoAgent(ccms);
			console.log(ccms, info);
		} else {
			setErrorccms(true);
			setMsgErrorccms("No data");
		}
	};
	return (
		<Box>
			<Typography
				variant="h6"
				textAlign="center"
				color="#3047B0"
				marginY={3}
				fontWeight={700}
			>
				{dataLOB.idLob ? "Edit LOB - Name LOB" : "Creation LOB"}
			</Typography>
			<InputText
				error={error}
				name="lobName"
				label="Name LOB"
				variant="outlined"
				type="text"
				fullWidth
				onChange={() => {}}
				value={dataLOB.nameLob ? dataLOB.nameLob : dataForm.name}
				helperText={error && msgError}
			/>
			<Box marginY={3}>
				<Typography variant="body1" gutterBottom color="#3047B0">
					Assignment Team Leader
				</Typography>
				<FormControl sx={{ width: "100%" }} variant="outlined">
					<InputLabel error={errorccms} htmlFor="outlined-adornment-search">
						Search CCMS Id
					</InputLabel>
					<OutlinedInput
						error={errorccms}
						id="outlined-adornment-search"
						type="number"
						value={tempCcms}
						onChange={(e) => {
							setTempCcms(e.target.value);
							setErrorccms(false);
							setMsgError("");
						}}
						endAdornment={
							<InputAdornment position="end">
								<ButtonActionBlue
									aria-label="toggle search visibility"
									edge="end"
									onClick={() => handleSearch(tempCcms)}
								>
									Search
								</ButtonActionBlue>
							</InputAdornment>
						}
						label="Search CCMS Id"
					/>
					{errorccms && <FormHelperText error>{msgErrorccms}</FormHelperText>}
				</FormControl>
			</Box>

			{dataLOB.idLob && (
				<Typography variant="body1" gutterBottom color="#3047B0">
					Edit Team Leader Assignment
				</Typography>
			)}
			<BoxTL>
				<Box display="flex" textAlign="center">
					<Box width="45%" color="#3047B0">
						<Typography variant="body1" fontWeight={700}>
							CCMS ID
						</Typography>
					</Box>
					<Box width="45%" color="#3047B0">
						<Typography variant="body1" fontWeight={700}>
							Team Leader
						</Typography>
					</Box>
					<Box width="10%" />
				</Box>
				<BoxCeldas>
					{[1, 2, 3, 4, 5, 6].map((item, index) => (
						<TableCont display="flex" textAlign="center" key={index}>
							<Box width="45%">
								<Typography variant="body2">1234567</Typography>
							</Box>
							<Box width="45%">
								<Typography variant="body2">Deiby Niño Garces</Typography>
							</Box>
							<Box width="10%">
								<input type="checkbox" id="idccms" value="idccms" />
							</Box>
						</TableCont>
					))}
				</BoxCeldas>
			</BoxTL>
			<Box display="flex" justifyContent="flex-end" marginY={3}>
				<ButtonActionBlue>Save</ButtonActionBlue>
			</Box>
		</Box>
	);
};

export default CreateEditLOB;
