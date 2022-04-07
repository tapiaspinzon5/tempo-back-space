import React, { useState } from "react";
import {
	Box,
	Modal,
	Typography,
	styled,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	OutlinedInput,
} from "@mui/material";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ButtonActionBlue } from "../../assets/styled/muistyled";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "#fff",
	border: "2px solid #fff",
	borderRadius: "20px",
	boxShadow: "3px 3px 5px #f9f9f9",
	p: 4,
};

const inicialDataNC = {
	action: "",
	kpi: "",
	unit: "",
	quantity: "",
};

const FormCreateNewChallenge = ({
	openModal,
	setOpenModal,
	handleSubmitNC,
	kpisInfo,
}) => {
	const [date, setDate] = useState([null, null]);
	const [newChallenge, setNewChallenge] = useState(inicialDataNC);
	const handleClose = () => {
		setOpenModal(false);
		setNewChallenge(inicialDataNC);
		setDate([null, null]);
	};

	return (
		<Modal
			open={openModal}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h5"
					component="h2"
					fontWeight={700}
					color="#3047B0"
				>
					Create a new Challenge
				</Typography>
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					noValidate
					autoComplete="off"
				>
					<div>
						<FormControl fullWidth sx={{ marginTop: "1rem" }}>
							<InputLabel id="action-select-label">Action</InputLabel>
							<Select
								labelid="action-select-label"
								id="action-select-label"
								value={newChallenge.action}
								label="Action"
								onChange={(e) =>
									setNewChallenge({ ...newChallenge, action: e.target.value })
								}
							>
								<MenuItem value="Increase">Increase</MenuItem>
								<MenuItem value="Decrease">Decrease</MenuItem>
								<MenuItem value="Keep">Keep</MenuItem>
								<MenuItem value="Under">Under</MenuItem>
								<MenuItem value="Keep over">Keep over</MenuItem>
							</Select>
						</FormControl>

						<FormControl fullWidth sx={{ marginTop: "1rem" }}>
							<InputLabel id="kpi-select-label">KPI</InputLabel>
							<Select
								labelid="kpi-select-label"
								id="kpi-select"
								value={newChallenge.kpi}
								label="KPI"
								onChange={(e) =>
									setNewChallenge({
										...newChallenge,
										kpi: e.target.value.Kpi,
										unit: e.target.value.unitKpi,
									})
								}
							>
								{kpisInfo.map((kpi, index) => (
									<MenuItem key={index + 13} value={kpi}>
										{kpi.Kpi}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth sx={{ marginTop: "1rem" }}>
							<InputLabel id="unit-textarea">Quantity</InputLabel>
							<OutlinedInput
								type="number"
								labelid="unit-textarea"
								variant="outline"
								label="Quantity"
								placeholder="Number"
								value={newChallenge.quantity}
								onChange={(e) =>
									setNewChallenge({ ...newChallenge, quantity: e.target.value })
								}
							/>
						</FormControl>

						<FormControl fullWidth sx={{ marginTop: "1rem" }}>
							<InputLabel id="unit-textarea">Measure Unit</InputLabel>
							<OutlinedInput
								labelid="unit-textarea"
								variant="outline"
								label="Measure Unit"
								placeholder="Unit"
								value={newChallenge.unit}
								onChange={(e) =>
									setNewChallenge({ ...newChallenge, unit: e.target.value })
								}
							/>
						</FormControl>
						<FormControl fullWidth sx={{ marginTop: "1rem" }}>
							<LocalizationProvider
								dateAdapter={AdapterDateFns}
								sx={{ width: "20rem" }}
							>
								<DateRangePicker
									startText="Start"
									endText="End"
									value={date}
									onChange={(newValue) => {
										setDate(newValue);
									}}
									renderInput={(startProps, endProps) => (
										<React.Fragment>
											<TextField {...startProps} />
											<Box sx={{ mx: 2 }}> to </Box>
											<TextField {...endProps} />
										</React.Fragment>
									)}
								/>
							</LocalizationProvider>
						</FormControl>
						<Box display="flex" justifyContent="flex-end" marginTop="1rem">
							<ButtonActionBlue
								sx={{ fontSize: "20px" }}
								onClick={() => handleSubmitNC(newChallenge, date)}
								disabled={
									!newChallenge.action ||
									!newChallenge.kpi ||
									!newChallenge.quantity ||
									!newChallenge.unit ||
									!date[0] ||
									!date[1]
								}
							>
								Let's do it
							</ButtonActionBlue>
						</Box>
					</div>
				</Box>
			</Box>
		</Modal>
	);
};

export default FormCreateNewChallenge;
