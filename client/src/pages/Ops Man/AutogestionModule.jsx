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
import { ModalLoading } from "../../components/ModalLoading";
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
	requestWithData,
} from "../../utils/api";
import LoadingComponent from "../../components/LoadingComponent";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const BoxRole = styled(Grid)(() => ({
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

const AutogestionModule = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector((store) => store.loginUser.userData);
	const [om, setom] = useState({});
	const [newOM, setNewOM] = useState({});
	const [changeOM, setChangeOM] = useState(true);
	const [assignOM, setAssignOM] = useState(true);
	const [noDataOM, setNoDataOM] = useState(false);
	const [loadingfull, setLoadingfull] = useState(false);
	const [errorccmsOM, setErrorccmsOM] = useState(false);
	const [msgErrorccmsOM, setMsgErrorccmsOM] = useState("");
	const [tempCcmsOM, setTempCcmsOM] = useState("");
	const [loadingOM, setLoadingOM] = useState(false);
	const [error, setError] = useState(false);

	const getData = async () => {
		setom({
			Name: userData.Nombre,
			RoleAgent: userData.Role,
			Ident: userData.Idccms,
			//Email: userData.email,
		});
		setNoDataOM(false);
		setLoadingOM(false);
		/* setLoadingQA(true);
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
				} else if (roles.data[0].RoleAgent === "QA Lead") {
					setDBQA(true);
					setom(roles.data[0]);
				} else {
					setNoDataQA(true);
					setLoadingQA(false);
				}
			} else {
				setDBQA(true);
				setNoDataQA(false);
				setom(roles.data[0]);
				setLoadingQA(false);
			}
		} else if (roles && roles.data === "UnauthorizedError") {
			dispatch(logoutAction());
			navigate("/");
		} else {
			setLoadingQA(false);
			setError(true);
		} */
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line
	}, []);

	const handleSearchOM = async (ccms) => {
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
					setNewOM({
						Name: info.data[0].FullName,
						RoleAgent: info.data[0].Rol,
						Ident: info.data[0].ident,
						Email: info.data[0].email,
					});
					setErrorccmsOM(false);
					setChangeOM(false);
					setMsgErrorccmsOM("");
					setTempCcmsOM("");
					setNoDataOM(false);
					setLoadingOM(false);
				} else {
					setErrorccmsOM(true);
					setMsgErrorccmsOM("The user is in other Team or Campaign");
				}
			} else {
				setErrorccmsOM(true);
				setMsgErrorccmsOM(
					"CCMS does not exist or is not active in the database"
				);
			}
		} else {
			setErrorccmsOM(true);
			setMsgErrorccmsOM("You did not enter any ccms");
		}
	};

	const submit = async (info, rol) => {
		const com = await requestWithData("postchangeuserrole", {
			idccmsUser: info.Ident,
			role: rol,
			context: 1,
			idLob: 0,
			idTeam: 0,
			idCampaign: [0],
			emails: [
				{
					email: info.Email,
					name: info.Name,
					rol: "Operations Commander",
					manager: userData.Nombre,
					rolManager: "Operations Commander",
				},
			],
		});
		console.log(com);
		if (com && com.status === 200) {
			MySwal.fire({
				title: <p>{"Assigned!"}</p>,
				icon: "success",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					dispatch(logoutAction());
					setLoadingfull(false);
				}
			});
		} else {
			MySwal.fire({
				title: <p>Internal Error Server!</p>,
				icon: "error",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					//window.location.reload();
					getData();
					setLoadingfull(false);
					setNewOM({});
				}
			});
		}
	};

	const handleSubmitOM = async (acQA, nQA) => {
		//editar OM */
		MySwal.fire({
			title: (
				/// se cambia este modal por seguro quiere dejar de ser el om de la campaña
				//<p>{"Are you sure?"}</p>
				<p>{`If you click on continue, you will release your role of Operation Manager to ${nQA.Name} and you will lose your access to the platform`}</p>
			),
			icon: "info",
			showDenyButton: true,
			confirmButtonText: "Accept",
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				setLoadingfull(true);
				submit(nQA, "Operation Manager");
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	};

	return (
		<MainPage>
			{loadingfull && <ModalLoading />}
			<Box>
				<Header />
				<Typography variant="h5">Permission Release</Typography>
			</Box>
			<Grid container spacing={1}>
				<Grid item xs={12} md={2}>
					<Box display="flex" alignItems="center" height="100%">
						<Typography variant="h6" color="#3047b0">
							{" "}
							Operation Manager
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={newOM.Ident ? 10 : 7}>
					<BoxRole>
						<Box width="40%">
							<FormControl sx={{ width: "100%" }} variant="outlined">
								<InputLabel
									htmlFor="outlined-adornment-search"
									error={errorccmsOM}
								>
									Search CCMS Id
								</InputLabel>
								<OutlinedInput
									error={errorccmsOM}
									id="outlined-adornment-search"
									type="number"
									value={tempCcmsOM}
									onChange={(e) => {
										setTempCcmsOM(e.target.value);
										setErrorccmsOM(false);
										setMsgErrorccmsOM("");
									}}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												onClick={() => handleSearchOM(tempCcmsOM)}
												aria-label="toggle search visibility"
												edge="end"
											>
												<img src={search} alt="Search" />
											</IconButton>
										</InputAdornment>
									}
									label="Search CCMS Id"
								/>
								{errorccmsOM && (
									<FormHelperText error>{msgErrorccmsOM}</FormHelperText>
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
									disabled={changeOM}
									onClick={() => handleSubmitOM(om, newOM)}
									sx={{ background: "#fff", marginRight: "1rem" }}
								>
									<MdCached color="#3047B0" />
								</IconButton>
								<ButtonActionBlue
									disabled={assignOM}
									onClick={() => handleSubmitOM(om, newOM)}
								>
									Assignment
								</ButtonActionBlue>
							</Box>
						</Box>

						{error ? (
							<Typography variant="body1">Server Error</Typography>
						) : noDataOM ? (
							<Typography variant="body1">
								There is no Operation Manager assigned
							</Typography>
						) : loadingOM ? (
							<LoadingComponent />
						) : (
							<CardUser width="48%" marginLeft={1}>
								<Avatar
									alt="user"
									src={imgAvatar}
									sx={{ width: 70, height: 70, marginRight: "1rem" }}
								/>
								<Box textAlign="left">
									<Typography variant="body1">{om.Name}</Typography>
									<Typography variant="body2">{om.RoleAgent}</Typography>
									{newOM.Ident && (
										<Typography color={"red"} variant="body2">
											Actual
										</Typography>
									)}
								</Box>
							</CardUser>
						)}
						{newOM.Ident && (
							<CardUser width="48%" marginLeft={1}>
								<Avatar
									alt="user"
									src={imgAvatar}
									sx={{ width: 70, height: 70, marginRight: "1rem" }}
								/>
								<Box textAlign="left">
									<Typography variant="body1">{newOM.Name}</Typography>
									<Typography variant="body2">{newOM.RoleAgent}</Typography>
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

export default AutogestionModule;
