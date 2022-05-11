import React, { useState } from "react";
import {
	Box,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	styled,
	Typography,
} from "@mui/material";
import {
	ButtonActionBlue,
	InputText,
	ScrollBox,
} from "../../assets/styled/muistyled";
import KpiSetup from "../SuperAdmin/KpiSetup";

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

const BoxHead = styled(Box)(() => ({
	display: "flex",
	textAlign: "center",
	marginBottom: "1rem",
	color: "#3047B0",
}));

const CreateEditCampaign = ({ dataCampaign, handleClose }) => {
	const [next, setNext] = useState(false);

	return (
		<Box>
			<Typography
				variant="h6"
				textAlign="center"
				color="#3047B0"
				marginY={3}
				fontWeight={700}
			>
				{dataCampaign?.id
					? `Edit Campaign - ${dataCampaign.name}`
					: "Creation Campaign"}
			</Typography>

			{!next ? (
				<Box display="flex">
					<Box width="60%">
						<Typography variant="body1" gutterBottom color="#3047B0">
							Campaign Name
						</Typography>
						<InputText
							name="campaignName"
							label="Campaign Name"
							variant="outlined"
							type="text"
							fullWidth
							//onChange={handleQuizSetup}
							value={dataCampaign?.name}
							required
						/>
						<Box marginY={3}>
							<Typography variant="body1" gutterBottom color="#3047B0">
								Assignment Operation Manager
							</Typography>
							<FormControl sx={{ width: "100%" }} variant="outlined">
								<InputLabel htmlFor="outlined-adornment-search">
									Search CCMS Id
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-search"
									type="number"
									//value={}
									//onChange={}
									endAdornment={
										<InputAdornment position="end">
											<ButtonActionBlue
												aria-label="toggle search visibility"
												edge="end"
											>
												Search
											</ButtonActionBlue>
										</InputAdornment>
									}
									label="Search CCMS Id"
								/>
							</FormControl>
						</Box>

						<BoxTL>
							<Box display="flex" textAlign="center">
								<Box width="45%" color="#3047B0">
									<Typography variant="body1" fontWeight={700}>
										CCMS ID
									</Typography>
								</Box>
								<Box width="45%" color="#3047B0">
									<Typography variant="body1" fontWeight={700}>
										Operation Manager
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
					</Box>
					<Box width="40%" paddingLeft={2}>
						<Box>
							<Typography variant="body1" gutterBottom color="#3047B0">
								Kpi Upload Reporting Lead
							</Typography>
							<label className="check">
								<input type="checkbox" />
								<span className="check-1"></span>
							</label>
						</Box>
						<Box marginY={3}>
							<Typography variant="body1" gutterBottom color="#3047B0">
								Assignment Kpi
							</Typography>
							<FormControl sx={{ width: "100%" }} variant="outlined">
								<InputLabel htmlFor="outlined-adornment-search">
									Search Kpi
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-search"
									type="text"
									//value={}
									//onChange={}
									endAdornment={
										<InputAdornment position="end">
											<ButtonActionBlue
												aria-label="toggle search visibility"
												edge="end"
											>
												Search
											</ButtonActionBlue>
										</InputAdornment>
									}
									label="Search Kpi"
								/>
							</FormControl>
						</Box>
						<BoxTL>
							<Box display="flex" textAlign="center">
								<Box width="90%" color="#3047B0">
									<Typography variant="body1" fontWeight={700}>
										KPI
									</Typography>
								</Box>

								<Box width="10%" />
							</Box>
							<BoxCeldas>
								{[1, 2, 3, 4, 5, 6].map((item, index) => (
									<TableCont display="flex" textAlign="center" key={index}>
										<Box width="90%">
											<Typography variant="body2">Kpi Name</Typography>
										</Box>

										<Box width="10%">
											<input type="checkbox" id="idccms" value="idccms" />
										</Box>
									</TableCont>
								))}
							</BoxCeldas>
						</BoxTL>
					</Box>
				</Box>
			) : (
				<>
					<Typography
						variant="h6"
						textAlign="center"
						color="#3047B0"
						marginY={1}
						fontWeight={700}
					>
						KPI's Set up
					</Typography>
					<BoxHead>
						<Box width="20%">
							<Typography variant="body1" fontWeight={700}>
								KPI
							</Typography>
						</Box>
						<Box width="20%">
							<Typography variant="body1" fontWeight={700}>
								Critical
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								Q1
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								Q2
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								Q3
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								Q4
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								ASC
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								DSC
							</Typography>
						</Box>
					</BoxHead>
					<ScrollBox height="18rem">
						{[1, 2, 3, 4, 5, 6].map((item, index) => (
							<KpiSetup key={index} />
						))}
					</ScrollBox>
				</>
			)}
			<Box display="flex" justifyContent="flex-end" marginY={3}>
				<ButtonActionBlue
					sx={{ width: "10rem" }}
					onClick={() => setNext(!next)}
				>
					{next ? "Back" : "Next"}
				</ButtonActionBlue>
				{next && (
					<ButtonActionBlue
						sx={{ width: "10rem", marginLeft: "2rem" }}
						onClick={handleClose}
					>
						{dataCampaign?.id ? "Save" : "Create"}
					</ButtonActionBlue>
				)}
			</Box>
		</Box>
	);
};

export default CreateEditCampaign;
