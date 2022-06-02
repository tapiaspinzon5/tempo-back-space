import React, { useState } from "react";
import { Typography, Box, styled, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DownloadingComponent from "../DownloadingComponent";
import ExcelJS from "exceljs";

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

export const DownLoadReportRL = ({ setModal }) => {
	const [date1, setDate1] = useState(null);
	const [date2, setDate2] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleReport = () => {
		setLoading(true);
	};

	return (
		<MainModal>
			<Typography variant="h3" color="initial">
				Select Report Dates
			</Typography>
			{loading ? (
				<>
					<Typography variant="body1" color="initial">
						This process can take time, please do not close the window until the
						report is downloaded.
					</Typography>
					<DownloadingComponent theme={"Report"} />
				</>
			) : (
				<Box
					sx={{
						display: "flex",
						margin: "2rem 0 0 2rem",
						justifyContent: "center",
						textAlign: "center",
					}}
				>
					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						sx={{ width: "20rem" }}
					>
						<DatePicker
							label="Start"
							value={date1}
							onChange={(newValue) => {
								setDate1(
									`${newValue.getFullYear()}-${
										newValue.getMonth() + 1
									}-${newValue.getDate()}`
								);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
						<DatePicker
							label="End"
							value={date2}
							onChange={(newValue) => {
								setDate2(
									`${newValue.getFullYear()}-${
										newValue.getMonth() + 1
									}-${newValue.getDate()}`
								);
							}}
							renderInput={(params) => (
								<TextField {...params} sx={{ m: "0 4rem" }} />
							)}
						/>
					</LocalizationProvider>
				</Box>
			)}
			<MainButtons>
				<Button sx={{ marginRight: "2rem" }} onClick={() => setModal(false)}>
					Return
				</Button>
				<Button sx={{ marginRight: "2rem" }} onClick={handleReport}>
					Download Report
				</Button>
			</MainButtons>
		</MainModal>
	);
};
