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
import imgAvatar from "../../assets/temp-image/avatar.png";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { FiEdit3 } from "react-icons/fi";
import { BsClock, BsPercent } from "react-icons/bs";
import CreateEditCampaign from "../../components/Modals/CreateEditCampaign";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingComponent from "../../components/LoadingComponent";
import { requestWithData } from "../../utils/api";
import { campsWithDate } from "../../helpers/helperCreateEditCamp";

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

const AccountCreation = () => {
	const navigate = useNavigate();
	const rxDispatch = useDispatch();
	const userData = useSelector((store) => store.loginUser.userData);
	const [open, setOpen] = useState(false);
	const [dataCampaign, setDataCampaign] = useState([]);
	const [dataInfoKpis, setDataInfoKpis] = useState([]);
	const [dataInfoOpsMan, setDataInfoOpsMan] = useState([]);
	const [dataToEdit, setDataToEdit] = useState(null);
	const [loadingCamp, setLoadingCamp] = useState(false);
	const [loadingInfo, setLoadingInfo] = useState(false);
	const [infoView, setInfoView] = useState(false);
	const [error, setError] = useState(false);
	const [noDataCamp, setNoDataCamp] = useState(false);
	const [noDataInfo, setNoDataInfo] = useState(false);
	const [active, setActive] = useState(0);

	useEffect(
		() => {
			const getData = async () => {
				setLoadingCamp(true);
				setInfoView(false);
				const allCamps = await requestWithData("getcampaigninfo", {
					idcampaign: 0,
					context: 1,
				});
				if (allCamps && allCamps.status === 200 && allCamps.data.length > 0) {
					if (
						allCamps.data[0].Result[0].IdCampaign !== "0" &&
						allCamps.data[0].Result[0].nameCampaign !== "0"
					) {
						const data = campsWithDate(allCamps.data[0].Result);
						setDataCampaign(data);
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

	const handleCampaign = async (id) => {
		setInfoView(true);
		setLoadingInfo(true);
		setDataInfoKpis([]);
		setDataInfoOpsMan({});
		const info = await requestWithData("getcampaigninfo", {
			idcampaign: id,
			context: 2,
		});
		if (info && info.status === 200 && info.data.length > 0) {
			if (
				info.data[0].Result[0].NameOperationManager !== "0" &&
				info.data[0].Result[0].IdCampaign !== "0"
			) {
				setLoadingInfo(false);
				setDataInfoKpis(info.data[0].Result);
				setActive(id);
				setDataInfoOpsMan({
					name: info.data[0].Result[0].NameOperationManager,
					rol: "Operation Manager",
				});
			} else {
				setLoadingInfo(false);
				setNoDataInfo(true);
			}
		} else if (info && info.data === "UnauthorizedError") {
			rxDispatch(logoutAction());
			navigate("/");
		} else {
			setLoadingInfo(false);
			setInfoView(false);
			setError(true);
		}
	};

	const handleOpen = async (camp) => {
		if (camp) {
			setDataToEdit(camp.IdCampaign);
		}
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		setDataToEdit(null);
	};

	const editSubmit = async (data, idcampaign, emails) => {
		const cqa = await requestWithData("postupdatecampaigninfo", {
			data,
			idcampaign,
			emails: [
				{
					...emails[0],
					rolManager: "Spacecraft Commander",
					manager: userData.Nombre,
				},
			],
		});

		if (cqa && cqa.status === 200) {
			setOpen(false);
			setDataToEdit(null);
			MySwal.fire({
				title: <p>{"Update Campaign!"}</p>,
				icon: "success",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					setDataCampaign(cqa.data);
					setInfoView(false);
					setLoadingCamp(false);
					setNoDataCamp(false);
				}
			});
		} else {
			MySwal.fire({
				title: <p>Send Error!</p>,
				icon: "Server Error",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					window.location.reload();
				}
			});
		}
	};

	const createSubmit = async (data, emails) => {
		const cqa = await requestWithData("postcreatecampaign", {
			data,
			emails: [
				{
					...emails[0],
					rolManager: "Spacecraft Commander",
					manager: userData.Nombre,
				},
			],
		});

		if (cqa && cqa.status === 200) {
			setOpen(false);
			setDataToEdit(null);
			MySwal.fire({
				title: <p>{"Campaign Created!"}</p>,
				icon: "success",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					setDataCampaign(cqa.data);
					setInfoView(false);
					setLoadingCamp(false);
					setNoDataCamp(false);
				}
			});
		} else {
			MySwal.fire({
				title: <p>Send Error!</p>,
				icon: "Server Error",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					window.location.reload();
				}
			});
		}
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
								<Typography variant="body1">Teams are not created</Typography>
							) : loadingCamp ? (
								<LoadingComponent />
							) : (
								dataCampaign.map((camp, index) => (
									<BoxCampaing
										sx={
											active === camp.IdCampaign
												? { boxShadow: "4px 4px 8px #a2a2a2" }
												: {}
										}
										height="3rem"
										key={index}
										onClick={() => handleCampaign(camp.IdCampaign)}
									>
										<Box textAlign="left">
											<Typography variant="body1">
												{camp.nameCampaign}
											</Typography>
											<Typography variant="caption">
												{`Created: ${camp.DateRegistry}`}
											</Typography>
										</Box>
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
												src={imgAvatar}
												sx={{ width: 70, height: 70, marginRight: "1rem" }}
											/>
											<Box textAlign="left">
												<Typography variant="body1">
													{dataInfoOpsMan.name}
												</Typography>
												<Typography variant="body2">
													{dataInfoOpsMan.rol}
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
										dataInfoKpis.map((kpi, index) => (
											<BoxCampaing key={index}>
												<Typography variant="body1">{kpi.Kpi}</Typography>
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
															{`${kpi.Q1?.toFixed(2)} / ${kpi.CriticalPoint}`}
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
						dataToEdit={dataToEdit}
						createCamp={createSubmit}
						editCamp={editSubmit}
					/>
				</ModalBox>
			</Modal>
		</MainPage>
	);
};

export default AccountCreation;
