import React, { useEffect, useState } from "react";
import {
	Grid,
	Box,
	Typography,
	styled,
	Avatar,
	Modal,
	Button,
} from "@mui/material";
import {
	BoxData,
	ButtonAction,
	CardUser,
	MainPage,
	ModalBox,
	ScrollContainer,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { FiEdit3 } from "react-icons/fi";
import { BsClock, BsPercent } from "react-icons/bs";
import CreateEditCampaign from "../../components/Modals/CreateEditCampaign";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingComponent from "../../components/LoadingComponent";
import { requestWithData } from "../../utils/api";

const MySwal = withReactContent(Swal);

const BoxCampaing = styled(Button)(() => ({
	backgroundColor: "#fff",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: "10px",
	marginTop: ".5rem",
	marginBottom: "5px",
	width: "98%",
	border: "1px solid #f9f9f9",
	padding: "1rem",
	textTransform: "none",
	"&:hover": {
		boxShadow: "3px 3px 5px #00000029",
	},
}));

const kpis = {
	data: [
		{
			Operation: { Name: "matilde", Rol: "Operation Manager", id: 123456 },
			kpis: [
				{ kpi: "KPI 1 ", Actual: 25, Target: 30, unitKpi: "Percentage" },
				{ kpi: "kpi 2 ", Actual: 25, Target: 30, unitKpi: "hour" },
				{ kpi: "kpi  3", Actual: 25, Target: 30, unitKpi: "Percentage" },
				{ kpi: "kpi  4", Actual: 25, Target: 30, unitKpi: "seconds" },
				{ kpi: "kpi  5", Actual: 25, Target: 30, unitKpi: "Avg" },
			],
		},
	],
	status: 200,
};
const campaing = {
	data: [
		{ name: "campaing 1 ", id: 1 },
		{ name: "campaing 2 ", id: 2 },
		{ name: "campaing  3", id: 3 },
		{ name: "campaing  4", id: 4 },
		{ name: "campaing  5", id: 5 },
	],
	status: 200,
};

const AccountCreation = () => {
	const navigate = useNavigate();
	const rxDispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [dataCampaign, setDataCampaign] = useState([]);
	const [dataInfoCKpis, setDataInfoKpis] = useState([]);
	const [dataInfoOpsMan, setDataInfoOpsMan] = useState([]);
	const [loadingCamp, setLoadingCamp] = useState(false);
	const [loadingInfo, setLoadingInfo] = useState(false);
	const [infoView, setInfoView] = useState(false);
	const [error, setError] = useState(false);
	const [noDataCamp, setNoDataCamp] = useState(false);
	const [noDataInfo, setNoDataInfo] = useState(false);

	useEffect(
		() => {
			const getData = async () => {
				setLoadingCamp(true);
				setInfoView(false);
				/* const allCamps = await requestWithData("getmissionsinformation", {
					idccmsAgent: "",
					idTeam: 0,
					context: 1,
				}); */
				const allCamps = campaing;
				if (allCamps && allCamps.status === 200 && allCamps.data.length > 0) {
					if (
						allCamps.data[0].idCampaign !== "0" &&
						allCamps.data[0].NameCampaign !== "0"
					) {
						//setDataCampaign(allCamps.data[0].campaigns);
						setDataCampaign(allCamps.data);
						setLoadingCamp(false);
					} else {
						setLoadingCamp(false);
						setNoDataCamp(true);
					}
				} else if (allCamps && allCamps.data === "UnauthorizedError") {
					rxDispatch(logoutAction());
					navigate("/");
				} else {
					setLoadingCamp(false);
					setError(true);
				}
			};
			getData();
		},
		// eslint-disable-next-line
		[]
	);

	const handleCampaign = async () => {
		setInfoView(true);
		setLoadingInfo(true);
		setDataInfoKpis([]);
		console.log(kpis.data[0].Operation);
		/* const agents = await requestWithData("getmissionsinformation", {
        idccmsAgent: "",
        idTeam,
        context: 2,
      }); */

		const info = kpis.data[0];
		if (info && info.status === 200 && info.data.length > 0) {
			if (info.data[0].Ident !== "0" && info.data[0].Agent !== "0") {
				setLoadingInfo(true);
				setDataInfoKpis(info.kpis);
				setDataInfoOpsMan(info.Operation);
			} else {
				setLoadingInfo(true);
				setNoDataInfo(true);
			}
		} else if (info && info.data === "UnauthorizedError") {
			rxDispatch(logoutAction());
			navigate("/");
		} else {
			setLoadingInfo(true);
			setInfoView(false);
			setError(true);
		}
	};

	const handleOpen = (camp) => {
		if (camp) {
			setDataCampaign(camp);
		}
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		setDataCampaign([]);
	};
	return (
		<MainPage>
			<Box>
				<Header />
				<Typography variant="h5">Account Creation Section</Typography>
			</Box>
			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<BoxData>
						<ButtonAction onClick={() => handleOpen()}>
							Create campaign
						</ButtonAction>
						<ScrollContainer maxHeight="60vh">
							{error ? (
								<Typography variant="body1">Server Problems</Typography>
							) : noDataCamp ? (
								<Typography variant="body1">Teams are not loaded</Typography>
							) : loadingCamp ? (
								<LoadingComponent />
							) : (
								dataCampaign.map((camp, index) => (
									<BoxCampaing
										height="3rem"
										key={index}
										onClick={() => handleCampaign(camp)}
									>
										<Typography variant="body1">{camp.name}</Typography>
										<ButtonAction onClick={() => handleOpen(camp)}>
											<FiEdit3 />
										</ButtonAction>
									</BoxCampaing>
								))
							)}
						</ScrollContainer>
					</BoxData>
				</Grid>
				{!error && infoView && (
					<Grid item xs={12} md={6}>
						<BoxData>
							<ScrollContainer height="60vh">
								<Box>
									<Typography variant="h6">Operation Manager</Typography>
									{loadingInfo ? (
										<LoadingComponent />
									) : (
										<CardUser width="92%" marginY={2}>
											<Avatar
												alt="user"
												src="./user.png"
												sx={{ width: 70, height: 70, marginRight: "1rem" }}
											/>
											<Box textAlign="left">
												<Typography variant="body1">Matilde Puentes</Typography>
												<Typography variant="body2">
													Analista desarrollador Senior
												</Typography>
											</Box>
										</CardUser>
									)}
								</Box>

								<Box>
									<Typography variant="h6">KPI's</Typography>

									{noDataInfo ? (
										<Typography variant="body1">
											Agents are not loaded
										</Typography>
									) : loadingInfo ? (
										<LoadingComponent />
									) : (
										kpis.map((kpi, index) => (
											<BoxCampaing key={index}>
												<Typography variant="body1">{kpi.kpi}</Typography>
												<Box>
													<Box width="8rem" display="flex">
														{kpi.unitKpi === "Percentage" ||
														kpi.unitKpi === "Avg" ? (
															<BsPercent />
														) : (
															<BsClock />
														)}
														<Typography
															variant="body1"
															fontWeight="bold"
															fontSize="12px"
															marginLeft={2}
														>
															{`${kpi.Actual.toFixed(2)} / ${kpi.Target}`}
														</Typography>
													</Box>
												</Box>
											</BoxCampaing>
										))
									)}
								</Box>
							</ScrollContainer>
						</BoxData>
					</Grid>
				)}
			</Grid>
			<Footer />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalBox sx={{ width: { xs: "390px", md: "500px", lg: "700px" } }}>
					<CreateEditCampaign
						dataCampaign={dataCampaign}
						handleClose={handleClose}
					/>
				</ModalBox>
			</Modal>
		</MainPage>
	);
};

export default AccountCreation;
