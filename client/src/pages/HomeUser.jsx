import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, styled, Typography, Box, Skeleton } from "@mui/material";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import ProgressHome from "../components/homeUser/ProgressHome";
import Podium from "../components/progressCharts/Podium";
import Circle from "../components/progressCharts/Circle";
import Diamond from "../components/progressCharts/Diamond";
import StarProgress from "../components/progressCharts/StarProgress";
import Ranking from "../components/homeUser/Ranking";
import {
	getKpisHome,
	//downloadHomeData,
	tokenNotification,
} from "../utils/api";
import { requestForToken } from "../utils/firebase";
import LoadingComponent from "../components/LoadingComponent";
import { useSelector, useDispatch } from "react-redux";
import { downloadHomeData } from "../redux/homeDataDuck";
import { logoutAction } from "../redux/loginDuck";

const MainHomeUser = styled(Grid)(({ theme }) => ({
	position: "relative",
	overflow: "hidden",
	minHeight: "95vh",
	width: "100%",
	padding: "0 2rem",
	[theme.breakpoints.down("md")]: {
		top: "15px",
	},
}));

const BoxVinetas = styled(Box)(({ theme }) => ({
	ackground: "#f9f9f9",
	borderRadius: "10pbx",
	h6: {
		color: "#3047B0",
	},
}));

const HomeUser = ({ count }) => {
	const dispatch = useDispatch();

	const homeData = useSelector((store) => store.homeData.homeData);
	const userData = useSelector((store) => store.loginUser.userData);
	const useName = userData.Nombre;
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [texp, setTExp] = useState(0);
	const [cw, setCw] = useState(0);
	const [gp, setGp] = useState(0);
	const [badge, setBadge] = useState(0);
	const [podium, setPodium] = useState([]);

	useEffect(() => {
		const getData = async () => {
			dispatch(downloadHomeData());

			const token = await requestForToken();

			await tokenNotification(token);
		};

		getData();

		// eslint-disable-next-line
	}, []);
	const getData = async () => {
		const rol = userData.Role === "Agent" ? 1 : 2;
		const kpis = await getKpisHome(rol, null);
		if (kpis && kpis.status === 200 && kpis.data.length > 0) {
			setData(kpis.data[0].KPI);
		} else {
			setData([]);
		}
	};
	useEffect(() => {
		if (homeData === "UnauthorizedError") {
			dispatch(logoutAction());
			navigate("/");
		} else if (homeData !== null && homeData.length > 1) {
			getData();
			setTExp(homeData[5]);
			setCw(homeData[2]);
			setGp(homeData[3]);
			setBadge(() => homeData[4]);
			setPodium(homeData[6].Podium);
		}

		// eslint-disable-next-line
	}, [homeData]);

	const ranking =
		homeData?.length > 1 && Array.isArray(homeData)
			? homeData[0].AgentsRanking.sort(
					(a, b) => b.ResObtenidoExp - a.ResObtenidoExp
			  )
			: [];
	return (
		<>
			<MainHomeUser
				sx={{ bgcolor: "background.default", color: "text.primary" }}
			>
				{texp ? (
					<Header count={count} />
				) : (
					<Skeleton variant="rectangular" width="50%" height="11vh" />
				)}

				<Grid container spacing={1}>
					<Grid item xs={12} lg={6} xl={6}>
						{ranking && <ProgressHome dataKPI={data} />}
					</Grid>
					<Grid item xs={12} md={6} lg={3} xl={3}>
						{ranking && <Podium podio={podium} />}
					</Grid>
					<Grid item xs={12} md={6} lg={3} xl={3}>
						<Ranking ranking={ranking} useName={useName} />
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<BoxVinetas>
							<Typography variant="h6" align="center" fontWeight="bold">
								Total Exp
							</Typography>
							{texp ? <Circle info={texp} /> : <LoadingComponent />}
						</BoxVinetas>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<BoxVinetas>
							<Typography variant="h6" align="center" fontWeight="bold">
								Challenges Won
							</Typography>
							{cw ? <Diamond info={cw} /> : <LoadingComponent />}
						</BoxVinetas>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<BoxVinetas>
							<Typography variant="h6" align="center" fontWeight="bold">
								Missions Progress
							</Typography>
							{gp ? <StarProgress info={gp} /> : <LoadingComponent />}
						</BoxVinetas>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<BoxVinetas>
							<Typography variant="h6" align="center" fontWeight="bold">
								Latest Achievement
							</Typography>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									height: "22vh",
								}}
							>
								{badge ? (
									<img
										src={badge && badge?.Badge[0].ImageBadge}
										alt="Your Last Badge"
										height="100%"
									/>
								) : (
									<LoadingComponent />
								)}
							</Box>
						</BoxVinetas>
					</Grid>
				</Grid>

				<Footer />
			</MainHomeUser>
		</>
	);
};

export default HomeUser;
