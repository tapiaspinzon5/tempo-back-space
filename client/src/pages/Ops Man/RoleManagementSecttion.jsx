import React, { useEffect, useState } from "react";
import {
	Box,
	Grid,
	Typography,
	styled,
	InputAdornment,
	IconButton,
	OutlinedInput,
	InputLabel,
	FormControl,
	Avatar,
	FormHelperText,
} from "@mui/material";
import imgAvatar from "../../assets/temp-image/avatar.png";
import {
	ButtonActionBlue,
	CardUser,
	MainPage,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import search from "../../assets/Icons/search-ico.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { MdCached } from "react-icons/md";
import {
	createTeamOperationManager,
	getInfoAgent,
	getQARLCount,
} from "../../utils/api";
import LoadingComponent from "../../components/LoadingComponent";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const BoxRole = styled(Box)(() => ({
	height: "8rem",
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	background: "#F9F9F9",
	boxShadow: "3px 3px 5px #00000029",
	borderRadius: "10px",
	padding: "0.5rem",
}));

const RoleManagementSecttion = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector((store) => store.loginUser.userData);
	const [qaLead, setQaLead] = useState({});
	const [rLead, setRLead] = useState({});
	const [newQA, setNewQA] = useState({});
	const [newRL, setNewRL] = useState({});
	const [changeQA, setChangeQA] = useState(true);
	const [changeRL, setChangeRL] = useState(true);
	const [assignQA, setAssignQA] = useState(true);
	const [assignRL, setAssignRL] = useState(true);
	const [noDataQA, setNoDataQA] = useState(false);
	const [noDataRL, setNoDataRL] = useState(false);
	const [DBQA, setDBQA] = useState(false);
	const [DBRL, setDBRL] = useState(false);
	const [errorccmsRL, setErrorccmsRL] = useState(false);
	const [msgErrorccmsRL, setMsgErrorccmsRL] = useState("");
	const [tempCcmsRL, setTempCcmsRL] = useState("");
	const [errorccmsQA, setErrorccmsQA] = useState(false);
	const [msgErrorccmsQA, setMsgErrorccmsQA] = useState("");
	const [tempCcmsQA, setTempCcmsQA] = useState("");
	const [loadingRL, setLoadingRL] = useState(false);
	const [loadingQA, setLoadingQA] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const getData = async () => {
			setLoadingRL(true);
			setLoadingQA(true);
			const roles = await getQARLCount();
			if (
				roles &&
				roles.status === 200 &&
				roles.data.length > 0 &&
				Array.isArray(roles.data)
			) {
				if (roles.data.length === 1) {
					if (roles.data[0].Ident === "0") {
						setNoDataQA(true);
						setNoDataRL(true);
					} else if (roles.data[0].RoleAgent === "QA Lead") {
						setDBQA(true);
						setNoDataQA(false);
						setQaLead(roles.data[0]);
						setLoadingQA(false);
						setNoDataRL(true);
						setLoadingRL(false);
					} else {
						setDBRL(true);
						setNoDataRL(false);
						setRLead(roles.data[0]);
						setLoadingRL(false);
						setNoDataQA(true);
						setLoadingQA(false);
					}
				} else {
					setDBQA(true);
					setDBRL(true);
					setNoDataQA(false);
					setNoDataRL(false);
					setQaLead(roles.data[0]);
					setLoadingQA(false);
					setRLead(roles.data[1]);
					setLoadingRL(false);
				}
			} else if (roles && roles.data === "UnauthorizedError") {
				dispatch(logoutAction());
				navigate("/");
			} else {
				setLoadingQA(false);
				setLoadingRL(false);
				setError(true);
			}
		};
		getData();
		// eslint-disable-next-line
	}, []);

	const handleSearchQA = async (ccms) => {
		if (ccms) {
			const info = await getInfoAgent(ccms);
			if (
				info &&
				info.status === 200 &&
				info.data.length > 0 &&
				Array.isArray(info.data) &&
				info.data[0].status === "Active"
			) {
				if (info.data[0].StatusGP !== "Active") {
					if (!DBQA) {
						setQaLead({
							Name: info.data[0].FullName,
							RoleAgent: info.data[0].Rol,
							Ident: info.data[0].ident,
							Email: info.data[0].email,
						});
						setErrorccmsQA(false);
						setAssignQA(false);
						setMsgErrorccmsQA("");
						setTempCcmsQA("");
						setNoDataQA(false);
						setLoadingQA(false);
					} else {
						setNewQA({
							Name: info.data[0].FullName,
							RoleAgent: info.data[0].Rol,
							Ident: info.data[0].ident,
							Email: info.data[0].email,
						});
						setErrorccmsQA(false);
						setChangeQA(false);
						setMsgErrorccmsQA("");
						setTempCcmsQA("");
						setNoDataQA(false);
						setLoadingQA(false);
					}
				} else {
					setErrorccmsQA(true);
					setMsgErrorccmsQA("The user is in other Team or Campaign");
				}
			} else {
				setErrorccmsQA(true);
				setMsgErrorccmsQA(
					"CCMS does not exist or is not active in the database"
				);
			}
		} else {
			setErrorccmsQA(true);
			setMsgErrorccmsQA("You did not enter any ccms");
		}
	};

	const handleSearchRL = async (ccms) => {
		if (ccms) {
			const info = await getInfoAgent(ccms);
			if (
				info &&
				info.status === 200 &&
				info.data.length > 0 &&
				info.data[0].status === "Active"
			) {
				if (info.data[0].StatusGP !== "Active") {
					if (!DBRL) {
						setRLead({
							Name: info.data[0].FullName,
							RoleAgent: info.data[0].Rol,
							Ident: info.data[0].ident,
							Email: info.data[0].email,
						});
						setErrorccmsRL(false);
						setAssignRL(false);
						setMsgErrorccmsRL("");
						setTempCcmsRL("");
						setNoDataRL(false);
						setLoadingRL(false);
					} else {
						setNewRL({
							Name: info.data[0].FullName,
							RoleAgent: info.data[0].Rol,
							Ident: info.data[0].ident,
							Email: info.data[0].email,
						});
						setErrorccmsRL(false);
						setChangeRL(false);
						setMsgErrorccmsRL("");
						setTempCcmsRL("");
						setNoDataRL(false);
						setLoadingRL(false);
					}
				} else {
					setErrorccmsRL(true);
					setMsgErrorccmsRL("The user is in other Team or Campaign");
				}
			} else {
				setErrorccmsRL(true);
				setMsgErrorccmsRL(
					"CCMS does not exist or is not active in the database"
				);
			}
		} else {
			setErrorccmsRL(true);
			setMsgErrorccmsRL("You did not enter any ccms");
		}
	};

	const submit = async (context, info, cas, rol) => {
		const cqa = await createTeamOperationManager(
			context,
			info.Ident,
			[
				{
					email: info.Email,
					name: info.Name,
					rol: rol,
					manager: userData.Nombre,
					rolManager: "Operations Commander",
				},
			],
			cas
		);
		if (cqa && cqa.status === 200) {
			MySwal.fire({
				title: <p>{cas === 2 ? "Saved!" : "Assigned!"}</p>,
				icon: "success",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					window.location.reload();
				}
			});
		} else {
			MySwal.fire({
				title: <p>Send Error!</p>,
				icon: "error",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					window.location.reload();
				}
			});
		}
	};

	const handleSubmitQA = async (acQA, nQA) => {
		if (!changeQA) {
			//editar Qa
			MySwal.fire({
				title: (
					<p>{`Are you sure you want to swap ${acQA.Name} for ${nQA.Name} as QA Lead?`}</p>
				),
				icon: "info",
				showDenyButton: true,
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((result) => {
				if (result.isConfirmed) {
					submit(1, nQA, 2, "QA Lead");
				} else if (result.isDenied) {
					Swal.fire("Changes are not saved", "", "info");
				}
			});
		} else {
			//Crear o asignar QA
			MySwal.fire({
				title: <p>{`Are you sure to assign ${acQA.Name} as QA lead?`}</p>,
				icon: "info",
				showDenyButton: true,
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((result) => {
				if (result.isConfirmed) {
					submit(1, acQA, 1, "QA Lead");
				} else if (result.isDenied) {
					Swal.fire("Assignment not saved", "", "info");
				}
			});
		}
	};

	const handleSubmitRL = (acRL, nRL) => {
		if (!changeRL) {
			//editar RL
			MySwal.fire({
				title: (
					<p>{`Are you sure you want to swap ${acRL.Name} for ${nRL.Name} as Reporting Lead?`}</p>
				),
				icon: "info",
				showDenyButton: true,
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((result) => {
				if (result.isConfirmed) {
					submit(2, nRL, 2, "Reporting Lead");
				} else if (result.isDenied) {
					Swal.fire("Changes are not saved", "", "info");
				}
			});
		} else {
			//Crear o asignar RL
			MySwal.fire({
				title: (
					<p>{`Are you sure to assign ${acRL.Name} as Reporting Lead?`}</p>
				),
				icon: "info",
				showDenyButton: true,
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((result) => {
				if (result.isConfirmed) {
					submit(2, acRL, 1, "Reporting Lead");
				} else if (result.isDenied) {
					Swal.fire("Assignment not saved", "", "info");
				}
			});
		}
	};
	return (
		<MainPage>
			<Box>
				<Header />
				<Typography variant="h5">Role Management Section</Typography>
			</Box>
			<Grid container spacing={1}>
				<Grid item xs={12} md={2}>
					<Box display="flex" alignItems="center" height="100%">
						<Typography variant="h6" color="#3047b0">
							{" "}
							QA Lead
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={newQA.Ident ? 10 : 7}>
					<BoxRole>
						<Box width="40%">
							<FormControl sx={{ width: "100%" }} variant="outlined">
								<InputLabel
									htmlFor="outlined-adornment-search"
									error={errorccmsQA}
								>
									Search CCMS Id
								</InputLabel>
								<OutlinedInput
									error={errorccmsQA}
									id="outlined-adornment-search"
									type="number"
									value={tempCcmsQA}
									onChange={(e) => {
										setTempCcmsQA(e.target.value);
										setErrorccmsQA(false);
										setMsgErrorccmsQA("");
									}}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												onClick={() => handleSearchQA(tempCcmsQA)}
												aria-label="toggle search visibility"
												edge="end"
											>
												<img src={search} alt="Search" />
											</IconButton>
										</InputAdornment>
									}
									label="Search CCMS Id"
								/>
								{errorccmsQA && (
									<FormHelperText error>{msgErrorccmsQA}</FormHelperText>
								)}
							</FormControl>
							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-end",
									marginTop: "3px",
								}}
							>
								<IconButton
									disabled={changeQA}
									onClick={() => handleSubmitQA(qaLead, newQA)}
									sx={{ background: "#fff", marginRight: "1rem" }}
								>
									<MdCached color="#3047B0" />
								</IconButton>
								<ButtonActionBlue
									disabled={assignQA}
									onClick={() => handleSubmitQA(qaLead, newQA)}
								>
									Assignment
								</ButtonActionBlue>
							</Box>
						</Box>

						{error ? (
							<Typography variant="body1">Server Error</Typography>
						) : noDataQA ? (
							<Typography variant="body1">
								There is no QA Lead assigned
							</Typography>
						) : loadingQA ? (
							<LoadingComponent />
						) : (
							<CardUser width="48%" marginLeft={1}>
								<Avatar
									alt="user"
									src={imgAvatar}
									sx={{ width: 70, height: 70, marginRight: "1rem" }}
								/>
								<Box textAlign="left">
									<Typography variant="body1">{qaLead.Name}</Typography>
									<Typography variant="body2">{qaLead.RoleAgent}</Typography>
									{newQA.Ident && (
										<Typography color={"red"} variant="body2">
											Actual
										</Typography>
									)}
								</Box>
							</CardUser>
						)}
						{newQA.Ident && (
							<CardUser width="48%" marginLeft={1}>
								<Avatar
									alt="user"
									src={imgAvatar}
									sx={{ width: 70, height: 70, marginRight: "1rem" }}
								/>
								<Box textAlign="left">
									<Typography variant="body1">{newQA.Name}</Typography>
									<Typography variant="body2">{newQA.RoleAgent}</Typography>
									<Typography color={"green"} variant="body2">
										New
									</Typography>
								</Box>
							</CardUser>
						)}
					</BoxRole>
				</Grid>
			</Grid>
			<Grid container spacing={1} mt={2}>
				<Grid item xs={12} md={2}>
					<Box display="flex" alignItems="center" height="100%">
						<Typography variant="h6" color="#3047b0">
							Reporting Lead
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={newRL.Ident ? 10 : 7}>
					<BoxRole>
						<Box width="40%">
							<FormControl sx={{ width: "100%" }} variant="outlined">
								<InputLabel
									htmlFor="outlined-adornment-search"
									error={errorccmsRL}
								>
									Search CCMS Id
								</InputLabel>
								<OutlinedInput
									error={errorccmsRL}
									id="outlined-adornment-search"
									type="number"
									value={tempCcmsRL}
									onChange={(e) => {
										setTempCcmsRL(e.target.value);
										setErrorccmsRL(false);
										setMsgErrorccmsRL("");
									}}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												onClick={() => handleSearchRL(tempCcmsRL)}
												aria-label="toggle search visibility"
												edge="end"
											>
												<img src={search} alt="Search" />
											</IconButton>
										</InputAdornment>
									}
									label="Search CCMS Id"
								/>
								{errorccmsRL && (
									<FormHelperText error>{msgErrorccmsRL}</FormHelperText>
								)}
							</FormControl>
							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-end",
									marginTop: "3px",
								}}
							>
								<IconButton
									disabled={changeRL}
									onClick={() => handleSubmitRL(rLead, newRL)}
									sx={{ background: "#fff", marginRight: "1rem" }}
								>
									<MdCached color="#3047B0" />
								</IconButton>
								<ButtonActionBlue
									disabled={assignRL}
									onClick={() => handleSubmitRL(rLead, newRL)}
								>
									Assignment
								</ButtonActionBlue>
							</Box>
						</Box>

						{error ? (
							<Typography variant="body1">Server Error</Typography>
						) : noDataRL ? (
							<Typography variant="body1">
								There is no Reporting Lead assigned
							</Typography>
						) : loadingRL ? (
							<LoadingComponent />
						) : (
							<CardUser width="48%" marginLeft={1}>
								<Avatar
									alt="user"
									src={imgAvatar}
									sx={{ width: 70, height: 70, marginRight: "1rem" }}
								/>
								<Box textAlign="left">
									<Typography variant="body1">{rLead.Name}</Typography>
									<Typography variant="body2">{rLead.RoleAgent}</Typography>
									{newRL.Ident && (
										<Typography color={"red"} variant="body2">
											Actual
										</Typography>
									)}
								</Box>
							</CardUser>
						)}
						{newRL.Ident && (
							<CardUser width="48%" marginLeft={1}>
								<Avatar
									alt="user"
									src={imgAvatar}
									sx={{ width: 70, height: 70, marginRight: "1rem" }}
								/>
								<Box textAlign="left">
									<Typography variant="body1">{newRL.Name}</Typography>
									<Typography variant="body2">{newRL.RoleAgent}</Typography>
									<Typography color={"green"} variant="body2">
										New
									</Typography>
								</Box>
							</CardUser>
						)}
					</BoxRole>
				</Grid>
			</Grid>
			<Footer />
		</MainPage>
	);
};

export default RoleManagementSecttion;
