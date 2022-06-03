import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import RL_AgentUP from "../assets/images/HomeAdmin/RL_AgentUP.png";
import RL_OpenAnalytics from "../assets/images/HomeAdmin/RL_OpenAnalytics.png";
import { useNavigate } from "react-router-dom";
import { MainPage, ButtonHome } from "../assets/styled/muistyled";

export const HomeRL = ({ count }) => {
	const navigate = useNavigate();

	return (
		<MainPage>
			<Box>
				<Header count={count} />
				<Typography variant="h5">
					{" "}
					Welcome to Space GP - Reporting Lead{" "}
				</Typography>
			</Box>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<ButtonHome
						onClick={() => {
							navigate("/uploadAgent");
						}}
					>
						<img src={RL_AgentUP} alt="RL_AgentUP" />
					</ButtonHome>
				</Grid>
				<Grid item xs={12} md={6}>
					<ButtonHome
						onClick={() => {
							navigate("/analytics");
						}}
						//disabled
					>
						<img src={RL_OpenAnalytics} alt="RL_OpenAnalytics" />
					</ButtonHome>
				</Grid>
			</Grid>
			<Footer />
		</MainPage>
	);
};
