import React, { useEffect, useState } from "react";
import {
	Box,
	Grid,
	Typography,
	styled,
	Avatar,
	Modal,
	Button,
} from "@mui/material";
import {
	BoxContain,
	ButtonAction,
	CardUser,
	MainPage,
	BoxData,
} from "../../assets/styled/muistyled";
import LoadingComponent from "../../components/LoadingComponent";
import Header from "../../components/homeUser/Header";
import Footer from "../../components/Footer";
import { FiEdit3 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import CreateEditLOB from "../../components/Modals/CreateEditLOB";
import { getLobs } from "../../utils/api";
import { filterLobList, teamLeaderList } from "../../helpers/helpers";
import imgAvatar from "../../assets/temp-image/avatar.png";

const CardLOB = styled(Button)(() => ({
	background: "#fff",
	display: "flex",
	width: "95%",
	border: "1px solid #f9f9f9",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "1rem",
	borderRadius: "10px",
	marginTop: ".5rem",
	textTransform: "none",
	"&:hover": {
		boxShadow: "3px 3px 5px #00000029",
	},
}));

const ModalBox = styled(Box)(() => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 300,
	borderRadius: "20px",
	boxShadow: "2px 2px 5px #2f2f2f",
	padding: "1rem",
	backgroundColor: "RGBA(255,255,255,0.9)",
}));

const LOBManagementSection = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector((store) => store.loginUser.userData);
	const [open, setOpen] = useState(false);
	const [lob, setLob] = useState([]);
	const [noData, setNoData] = useState(false);
	const [dataLOB, setDataLOB] = useState([]);
	const [teamLeads, setTeamLeads] = useState([]);
	const [allData, setAllData] = useState([]);
	const [loadingLob, setLoadingLob] = useState(false);
	const [loadingTl, setLoadingTl] = useState(false);
	const [error, setError] = useState(false);

	useEffect(
		() => {
			const getData = async () => {
				setLoadingLob(true);
				setLoadingTl(true);
				const allLobs = await getLobs(1, 1032);
				if (allLobs && allLobs.status === 200 && allLobs.data.length > 0) {
					if (
						allLobs.data[0].idCampaign !== "0" &&
						allLobs.data[0].nameCampaign !== "0"
					) {
						const filterLobs = await filterLobList(allLobs.data);
						const TLList = await teamLeaderList(allLobs.data, filterLobs[0]);
						setAllData(allLobs.data);
						setLob(filterLobs);
						setTeamLeads(TLList);
						setLoadingLob(false);
						setLoadingTl(false);
					} else {
						setLoadingLob(false);
						setLoadingTl(false);
						setNoData(true);
					}
				} else if (allLobs && allLobs.data === "UnauthorizedError") {
					dispatch(logoutAction());
					navigate("/");
				} else {
					setLoadingLob(false);
					setLoadingTl(false);
					setError(true);
				}
			};
			getData();
		},
		// eslint-disable-next-line
		[]
	);

	const handleOpen = async (item, name) => {
		setOpen(true);
		if (item) {
			setDataLOB({ idLob: item, name });
		}
	};
	const handleClose = () => {
		setOpen(false);
		setDataLOB([]);
	};
	const handleLob = async (datalob) => {
		setLoadingTl(true);
		const TLList = await teamLeaderList(allData, datalob);
		setTeamLeads(TLList);
		setLoadingTl(false);
	};
	return (
		<MainPage>
			<Box>
				<Header />
				<Typography variant="h5">LOB Management Section</Typography>
			</Box>
			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<BoxData>
						<Box marginY={1}>
							<ButtonAction onClick={() => handleOpen()}>
								Create New LOB
							</ButtonAction>
						</Box>
						<BoxContain>
							{error ? (
								<Typography variant="body1">Server Problems</Typography>
							) : noData ? (
								<Typography variant="body1"></Typography>
							) : loadingLob ? (
								<LoadingComponent />
							) : (
								lob.map((item) => (
									<CardLOB index={item.idLob} onClick={() => handleLob(item)}>
										<Box textAlign="left">
											<Typography variant="body1"> {item.NameLob}</Typography>
											<Typography variant="caption">
												{`Created: ${item.DateRegistry}`}
											</Typography>
										</Box>
										<ButtonAction
											onClick={() => handleOpen(item.idLob, item.NameLob)}
										>
											<FiEdit3 />
										</ButtonAction>
									</CardLOB>
								))
							)}
						</BoxContain>
					</BoxData>
				</Grid>
				<Grid item xs={12} md={6}>
					<BoxData>
						<Box marginY={1}>
							<Typography variant="h6" textAlign="center">
								Team Lead's
							</Typography>
						</Box>
						<BoxContain>
							{error ? (
								<Typography variant="body1">Server Problems</Typography>
							) : noData ? (
								<Typography variant="body1">Create new Lob</Typography>
							) : loadingTl ? (
								<LoadingComponent />
							) : (
								teamLeads.map((item) => (
									<CardUser
										sx={{ width: "92%", marginY: ".5rem" }}
										index={item.idTeam}
									>
										<Avatar
											alt="user"
											src={imgAvatar}
											sx={{ width: 50, height: 50, marginRight: "2rem" }}
										/>
										<Box textAlign="left">
											<Typography variant="body1">{item.NameTL}</Typography>
											<Typography variant="body2">Team Leader</Typography>
										</Box>
									</CardUser>
								))
							)}
						</BoxContain>
					</BoxData>
				</Grid>
			</Grid>
			<Footer />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalBox sx={{ width: { xs: "390px", md: "500px", lg: "500px" } }}>
					<CreateEditLOB
						allData={allData}
						setOpen={setOpen}
						dataLOB={dataLOB}
						userData={userData.Nombre}
					/>
				</ModalBox>
			</Modal>
		</MainPage>
	);
};

export default LOBManagementSection;
