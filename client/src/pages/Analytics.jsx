import React, { useState, useEffect, useRef } from "react";
import { Typography, Grid, Box, Modal, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { MainPage, BoxContain } from "../assets/styled/muistyled";
import Header from "../components/homeUser/Header";
import { getDataLeaderboard } from "../utils/api";
import LeaderRankBoard from "../components/LeaderBoard/LeaderRankBoard";
import Footer from "../components/Footer";
import LoadingComponent from "../components/LoadingComponent";
import TableAnalytics from "../components/Analytics/TableAnalytics";
import {
	deleteDuplicatesKpis,
	deleteDuplicatesScore,
} from "../helpers/helpers";
import { logoutAction } from "../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import { DownLoadReportTL } from "../components/Modals/DownLoadReportTL";

const ModalBox = styled(Box)(() => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	//width: 400,
	borderRadius: "20px",
	boxShadow: "2px 2px 5px #2f2f2f",
	padding: "1rem",
	backgroundColor: "RGBA(255,255,255,0.9)",
}));

const Analytics = ({ count }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const ref = useRef();
	const [data, setData] = useState([]);
	const [kpis, setKpis] = useState([]);
	const [modal, setModal] = useState(false);
	const [width, setWidth] = useState(0);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({
		time: "Day",
		group: "My Team",
	});

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			const initialData = await getDataLeaderboard(1, "", "day", "My Team");
			if (
				initialData &&
				initialData.status === 200 &&
				initialData.data.length === 4
			) {
				const dataOrder = await deleteDuplicatesScore(
					initialData.data[0].ScoreExp
				);
				setKpis(initialData.data[1].ListKpi);
				setData(dataOrder);
				setLoading(false);
			} else if (initialData.data === "UnauthorizedError") {
				dispatch(logoutAction());
				navigate("/");
			}
		};
		getData();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setLoading(true);
		if (filters.kpi === "") {
			const getData = async () => {
				const initialData = await getDataLeaderboard(
					1,
					"",
					filters.time,
					filters.group
				);
				if (
					initialData &&
					initialData.status === 200 &&
					initialData.data.length === 4
				) {
					const dataOrder = await deleteDuplicatesScore(
						initialData.data[0].ScoreExp
					);
					setKpis(initialData.data[1].ListKpi);
					setData(dataOrder);
					setLoading(false);
				}
			};
			getData();
		} else {
			const getData = async () => {
				const filterData = await getDataLeaderboard(
					2,
					filters.kpi,
					filters.time,
					filters.group
				);
				if (
					filterData &&
					filterData.status === 200 &&
					filterData.data.length > 1
				) {
					const dataOrder = await deleteDuplicatesKpis(
						filterData.data[2].ScoreResultKpi,
						filters.time
					);

					setKpis(filterData.data[1].ListKpi);
					setData(dataOrder);
					setLoading(false);
				}
			};
			getData();
		}

		// eslint-disable-next-line
	}, [filters]);

	let ancho = ref.current !== undefined ? ref.current.clientWidth : 0;
	useEffect(() => {
		setWidth(ancho);
	}, [ancho]);
	return (
		<MainPage>
			<Modal
				open={modal}
				onClose={() => setModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
					<DownLoadReportTL setModal={setModal} />
				</ModalBox>
			</Modal>

			<Grid marginTop={2}>
				<Header count={count} />
			</Grid>
			<Box margin="1rem 0" color="#3047B0">
				<Typography variant="h5" fontWeight="500">
					Analytics
				</Typography>
			</Box>
			<Grid container columnSpacing={3}>
				<Grid item xs={12}>
					<Box>
						<LeaderRankBoard
							kpis={kpis}
							setFilters={setFilters}
							setModal={setModal}
						/>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<BoxContain ref={ref}>
						{!loading ? (
							<TableAnalytics width={width} data={data} />
						) : (
							<LoadingComponent />
						)}
					</BoxContain>
				</Grid>
			</Grid>
			<Footer />
		</MainPage>
	);
};

export default Analytics;
