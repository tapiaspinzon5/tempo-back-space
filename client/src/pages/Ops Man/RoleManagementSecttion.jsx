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
import {
	ButtonActionBlue,
	CardUser,
	MainPage,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import search from "../../assets/Icons/search-ico.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { MdCached } from "react-icons/md";
import {
	createTeamOperationManager,
	getInfoAgent,
	getQARLCount,
} from "../../utils/api";
import LoadingComponent from "../../components/LoadingComponent";

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
	const [qaLead, setQaLead] = useState([]);
	const [rLead, setrLead] = useState([]);
	const [errorRL, setErrorRL] = useState(false);
	const [msgErrorRL, setMsgErrorRL] = useState("");
	const [errorQA, setErrorQA] = useState(false);
	const [msgErrorQA, setMsgErrorQA] = useState("");
	const [errorccmsRL, setErrorccmsRL] = useState(false);
	const [msgErrorccmsRL, setMsgErrorccmsRL] = useState("");
	const [tempCcmsRL, setTempCcmsRL] = useState("");
	const [errorccmsQA, setErrorccmsQA] = useState(false);
	const [msgErrorccmsQA, setMsgErrorccmsQA] = useState("");
	const [tempCcmsQA, setTempCcmsQA] = useState("");
	const [loadingRL, setLoadingRL] = useState(false);
	const [loadingQA, setLoadingQA] = useState(false);
	const [fullLoading, setFullLoading] = useState(false);
	const [error, setError] = useState(false);
	//createTeamOperationManager
	useEffect(() => {
		const getData = async () => {
			setLoadingRL(true);
			setLoadingQA(true);
			const roles = getQARLCount();
			if (roles && roles.status === 200 && roles.data.length > 0) {
				console.log(roles);
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
	}, []);

	const handleSearchQA = async (ccms) => {
		if (ccms) {
			const info = await getInfoAgent(ccms);
			if (info && info.status === 200 && info.data.length > 0) {
				setErrorQA(false);
				setMsgErrorQA("");
				setQaLead(info);
				setTempCcmsQA("");
			} else {
				setErrorccmsQA(true);
				setMsgErrorccmsQA("CCMS not exist");
			}
		} else {
			setErrorccmsQA(true);
			setMsgErrorccmsQA("No data");
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
				<Grid item xs={12} md={7}>
					<BoxRole>
						<Box width="50%">
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
										setMsgErrorQA("");
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
								<IconButton sx={{ background: "#fff", marginRight: "1rem" }}>
									<MdCached color="#3047B0" />
								</IconButton>
								<ButtonActionBlue>Assignment</ButtonActionBlue>
							</Box>
						</Box>

						<CardUser width="48%" marginLeft={1}>
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
				<Grid item xs={12} md={7}>
					<BoxRole>
						<Box width="48%">
							<FormControl sx={{ width: "100%" }} variant="outlined">
								<InputLabel htmlFor="outlined-adornment-search">
									Search CCMS Id
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-search"
									type="number"
									//value={}
									//onChange={}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
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
								<IconButton sx={{ background: "#fff", marginRight: "1rem" }}>
									<MdCached color="#3047B0" />
								</IconButton>
								<ButtonActionBlue>Assignment</ButtonActionBlue>
							</Box>
						</Box>

						<CardUser width="48%" marginLeft={1}>
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
								{/* <Typography variant="body2">New</Typography> */}
							</Box>
						</CardUser>
						{/* <CardUser width="48%" marginLeft={1}>
							<Avatar
								alt="user"
								src="./user.png"
								sx={{ width: 70, height: 70, marginRight: "1rem" }}
							/>
							<Box textAlign="left">
								<Typography variant="body1">Daniel Moreno</Typography>
								<Typography variant="body2">
									Analista desarrollador Senior
								</Typography>
							</Box>
						</CardUser> */}
					</BoxRole>
				</Grid>
			</Grid>
			<Footer />
		</MainPage>
	);
};

export default RoleManagementSecttion;
