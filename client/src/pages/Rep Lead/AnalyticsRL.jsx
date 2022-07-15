import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Modal, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { MainPage, BoxContain } from "../../assets/styled/muistyled";
import Header from "../../components/homeUser/Header";
import { requestWithData } from "../../utils/api";
import LeaderRankBoard from "../../components/LeaderBoard/LeaderRankBoard";
import Footer from "../../components/Footer";
import LoadingComponent from "../../components/LoadingComponent";
import { deleteDuplicatesScore } from "../../helpers/helpers";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import TableAnalyticsRL from "../../components/Analytics/TableAnalyticsRL";
import { DownLoadReportRL } from "../../components/Modals/DownLoadReportRL";

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

const AnalyticsRL = ({ count }) => {
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
		start: null,
		end: null,
	});

	let ancho = ref.current !== undefined ? ref.current.clientWidth : 0;
	useEffect(() => {
		setWidth(ancho);
	}, [ancho]);

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			const initialData = await requestWithData("getplatformanalytics", {
				initDate: 0,
				endDate: 0,
				kpi: "0",
				context: 4,
			});
			//console.log("este es el console", initialData.data[0].Kpis);
			if (
				initialData &&
				initialData.status === 200 &&
				initialData.data.length > 0
			) {
				/* const dataOrder = await deleteDuplicatesScore(
					initialData.data[0].ScoreExp
				); */
				setKpis(initialData.data[0].Kpis);
				//setData(dataOrder);
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
		if (filters.kpi !== "" && filters.start && filters.end) {
			setLoading(true);
			const getData = async () => {
				const initialData = await requestWithData("getplatformanalytics", {
					initDate: filters.start,
					endDate: filters.end,
					kpi: filters.kpi,
					context: 2,
				});
				if (
					initialData &&
					initialData.status === 200 &&
					initialData.data.length > 0
				) {
					const dataOrder = await deleteDuplicatesScore(
						initialData.data[0].Analitycs
					);
					setData(dataOrder);
					setLoading(false);
				}
			};
			getData();
		} /* else {
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
		} */

		// eslint-disable-next-line
	}, [filters]);

	return (
		<MainPage>
			<Modal
				open={modal}
				onClose={() => setModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
					<DownLoadReportRL setModal={setModal} />
				</ModalBox>
			</Modal>
			<Header count={count} />
			<Typography variant="h5" fontWeight="500">
				Analytics
			</Typography>
			<Box>
				<LeaderRankBoard
					kpis={kpis}
					setFilters={setFilters}
					setModal={setModal}
				/>
			</Box>

			<BoxContain ref={ref}>
				{!loading ? (
					<TableAnalyticsRL width={width} data={data} />
				) : (
					<LoadingComponent />
				)}
			</BoxContain>

			<Footer />
		</MainPage>
	);
};

export default AnalyticsRL;
