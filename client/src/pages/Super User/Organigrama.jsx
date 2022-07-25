import React, { useEffect, useReducer, useState } from "react";
import { InputText, MainPage, BoxContain } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { Grid, Typography, Box, styled, Avatar, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {
	TYPES,
	organigramaInitialState,
	organigramaReducer,
} from "../../reducers/organigramaReducer";
import {
	MdOutlineFontDownload,
	MdArrowForward,
	MdArrowForwardIos,
} from "react-icons/md";
import bgNoData from "../../assets/images/bg2.png";

const BoxNoData = styled(Box)(() => ({
	height: "67vh",
	width: "100%",
	backgroundImage: `url(${bgNoData})`,
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center center",
	borderRadius: "10px 10px 0 0",
	boxShadow: "0px 0px 15px #3047B0",
	opacity: "0.3",
}));

const BoxSection = styled(Box)(() => ({
	background: "#f9f9f9",
	borderRadius: "10px",
	marginRight: "0.31rem",
	padding: ".31rem",
}));

const BoxCard = styled(Box)(() => ({
	height: "4rem",
	width: "25vw",
	background: "#fff",
	display: "flex",
	alignItems: "center",
	justifyContent: "left",
	marginTop: ".5rem",
	marginRight: ".5rem",
	paddingLeft: ".5rem",
	borderRadius: "10px",
	p: {
		color: "#3047B0",
	},
}));

const GridScroll = styled(Grid)(() => ({
	overflowX: "scroll",
	display: "flex",
	padding: "2rem 0",
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
const ButtonCard = styled(Button)(() => ({
	height: "4rem",
	width: "25vw",
	background: "#fff",
	display: "flex",
	alignItems: "center",
	marginTop: ".5rem",
	marginRight: ".5rem",
	paddingLeft: ".5rem",
	borderRadius: "10px",
	textTransform: "none",
	p: {
		color: "#3047B0",
	},
}));
const dataCampaign = [
	{ label: "Bavaria", idCampaign: 1994 },
	{ label: "Netflix", idCampaign: 1972 },
	{ label: "Microsoft", idCampaign: 1974 },
	{ label: "P&G", idCampaign: 2008 },
	{ label: "Disney", idCampaign: 1957 },
	{ label: "Lenovo", idCampaign: 1993 },
	{ label: "HP", idCampaign: 1994 },
];

const Organigrama = () => {
	const [campaign, setCampaign] = React.useState(null);

	const defaultProps = {
		options: dataCampaign,
		getOptionLabel: (option) => option.label,
	};

	const handleInput = (e) => {
		// console.log(e);
	};
	//console.log(campaign);

	return (
		<MainPage
			sx={{
				h6: {
					color: "#3047B0",
					textAlign: "center",
					fontWeight: 700,
				},
			}}
		>
			<Grid>
				<Header />
				<Grid container>
					<Grid
						Grid
						item
						xs={12}
						md={6}
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography variant="h5" marginRight={4}>
							Organizational Units
						</Typography>

						<Autocomplete
							{...defaultProps}
							disablePortal
							id="combo-box-demo"
							options={dataCampaign}
							value={campaign}
							onChange={(e, newValue) => {
								setCampaign(newValue);
							}}
							sx={{ width: 300 }}
							renderInput={(params) => (
								<InputText
									{...params}
									label="Campaign"
									onChange={handleInput}
								/>
							)}
						/>
					</Grid>
				</Grid>

				{campaign ? (
					<GridScroll>
						<Grid item xs={12} sm={6} lg={3}>
							<Typography variant="h6" color="initial">
								Admin Roles
							</Typography>
							<BoxSection>
								<BoxContain
									sx={{
										height: "14.4rem",
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-around",
									}}
								>
									<BoxCard>
										<Avatar>OM</Avatar>
										<Typography variant="body1" color="initial" marginLeft={3}>
											Matilde Puentes Gutierrez
										</Typography>
									</BoxCard>
									<BoxCard>
										<Avatar>QA</Avatar>
										<Typography variant="body1" color="initial" marginLeft={3}>
											Daniel Moreno Salas
										</Typography>
									</BoxCard>
									<BoxCard>
										<Avatar>RL</Avatar>
										<Typography variant="body1" color="initial" marginLeft={3}>
											Diego Alejandro Tapias Pinzon
										</Typography>
									</BoxCard>
								</BoxContain>
							</BoxSection>

							<Typography variant="h6" color="initial">
								KPIS
							</Typography>
							<BoxSection>
								<BoxContain sx={{ height: "15rem" }}>
									<BoxCard>
										<Typography variant="h6">AHT</Typography>
										<Box
											display="flex"
											alignItems="center"
											justifyContent="space-around"
											width="100%"
										>
											<Typography variant="body1" marginLeft={3}>
												Average Handle Time
											</Typography>
											<MdOutlineFontDownload size={25} color="3047B0" />
										</Box>
									</BoxCard>
								</BoxContain>
							</BoxSection>
						</Grid>
						<Grid item xs={12} sm={6} lg={3}>
							<Typography variant="h6" color="initial">
								LOBS
							</Typography>
							<BoxSection>
								<BoxContain>
									<ButtonCard sx={{ justifyContent: "space-between" }}>
										<Typography variant="body1" color="initial" marginLeft={3}>
											LOB con el nombre Jum
										</Typography>
										<MdArrowForwardIos size={25} color="3047B0" />
									</ButtonCard>
									<ButtonCard sx={{ justifyContent: "space-between" }}>
										<Typography variant="body1" color="initial" marginLeft={3}>
											Otro LOB
										</Typography>
										<MdArrowForwardIos size={25} color="3047B0" />
									</ButtonCard>
								</BoxContain>
							</BoxSection>
						</Grid>
						<Grid item xs={12} sm={6} lg={3}>
							<Typography variant="h6" color="initial">
								Teams
							</Typography>
							<BoxSection>
								<BoxContain>
									<ButtonCard sx={{ justifyContent: "space-between" }}>
										<Box>
											<Typography variant="body1" color="initial">
												Nombre del Equipo
											</Typography>
											<Typography variant="caption" color="initial">
												Diego Alejando Tapias
											</Typography>
										</Box>
										<MdArrowForwardIos size={25} color="3047B0" />
									</ButtonCard>
								</BoxContain>
							</BoxSection>
						</Grid>
						<Grid item xs={12} sm={6} lg={3}>
							<Typography variant="h6" color="initial">
								Agents
							</Typography>
							<BoxSection>
								<BoxContain>
									<BoxCard>
										<Avatar alt="Reporting Lead" />
										<Typography variant="body1" color="initial" marginLeft={3}>
											Diego Alejandro Tapias Pinzon
										</Typography>
									</BoxCard>
								</BoxContain>
							</BoxSection>
						</Grid>
					</GridScroll>
				) : (
					<BoxNoData />
				)}
			</Grid>
			<Footer />
		</MainPage>
	);
};

export default Organigrama;
