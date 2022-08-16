import {
	Box,
	Typography,
	styled,
	Button,
	FormHelperText,
	InputAdornment,
	OutlinedInput,
	InputLabel,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	Avatar,
	Select,
	MenuItem,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import imgAvatar from "../../assets/temp-image/avatar.png";
import {
	ButtonActionBlue,
	CardUser,
	ScrollBox,
} from "../../assets/styled/muistyled";
import KpiSetup from "../SuperAdmin/KpiSetup";
import { getInfoAgent, requestWithData } from "../../utils/api";
import { getTLDuplicates, shortName } from "../../helpers/helperLOBCreation";
import { useEffect } from "react";

const BoxHead = styled(Box)(() => ({
	display: "flex",
	textAlign: "center",
	marginBottom: "1rem",
	color: "#3047B0",
}));

const TableCont = styled(Box)(() => ({
	color: "#3047B0",
	background: "#E8E8E8",
	borderRadius: "20px",
	padding: "5px",
	marginTop: "5px",
}));
const CardTL = styled(Button)(() => ({
	//background: "#fff",
	display: "flex",
	width: "100%",
	height: "2rem",
	//textAlign: "center",
	//flexDirection: "column",
	//border: "1px solid #f9f9f9",
	//alignItems: "center",
	justifyContent: "space-between",
	padding: "1rem",
	borderRadius: "10px",
	textTransform: "none",
	"&:hover": {
		boxShadow: "3px 3px 5px #00000029",
	},
}));
const active = {
	boxShadow: "1px 1px 5px #A2A2A2",
	transform: "scale(1.01)",
};
const BoxTL = styled(Box)(() => ({
	border: "1px solid #3047B0",
	padding: "0.5rem",
	borderRadius: "10px",
}));

const BoxCeldas = styled(Box)(() => ({
	height: "8.5rem",
	overflowY: "scroll",
	padding: "0 .3rem",
	"&::-webkit-scrollbar": {
		width: "6px",
	},

	"&::-webkit-scrollbar-track": {
		background: "white",
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "#e8e8e8",
		borderRadius: "20px",
	},
}));

const DeleteTL = ({ tlListDel, setTlListDel, allData }) => {
	const [errorList, setErrorList] = useState(false);
	const [change, setChange] = useState(false);
	const [deleteTeam, setDeleteTeam] = useState(0);
	const [reorderAgents, setReorderAgents] = useState(false);
	const [select, setSelect] = useState(0);
	const [errorccms, setErrorccms] = useState(false);
	const [loading, setLoading] = useState(false);
	const [tempAgents, setTempAgents] = useState([]);
	const [tempTeams, setTempTeams] = useState([]);
	const [tempUserChange, setTempUserChange] = useState([]);
	const [tempNewUserChange, setTempNewUserChange] = useState([]);
	const [tempCcms, setTempCcms] = useState("");
	const [msgErrorList, setMsgErrorList] = useState("");
	const [msgErrorccms, setMsgErrorccms] = useState("");
	const [tepmUsersChanges, settepmUsersChanges] = useState([]);

	useEffect(
		() => {
			const getTeams = async () => {
				const teams = await requestWithData("getmissionsassignmentinfo", {
					context: 2,
					caso: 2,
				});
				//verificar que los equipos no esten en la lista de eliminacion y en la misma lob
				if (teams.data && teams.data.length > 0) {
					//diferencia
					const activeTeams = teams.data[0].Teams.filter(
						(item1) =>
							!tlListDel.some(
								(item2) =>
									item1.idTeam === item2.idTeam || item1.idLob !== item2.idLob
							)
					);
					if (activeTeams.length > 0) {
						setTempTeams(activeTeams);
					} else {
						//disabled radiobutton Redistribute no se puede presentar el caso
						//sin embargo se deja la posibilidad por si se solicita mas adelante
					}
				} else {
					//modal de error en base de datos
				}
			};
			getTeams();
		},
		// eslint-disable-next-line
		[]
	);

	const getAgents = async (user) => {
		const agents = await requestWithData("getmissionsinformation", {
			idccmsAgent: "",
			idTeam: user.idTeam,
			context: 2,
		});
		if (agents.data && agents.data.length > 0 && agents.status === 200) {
			if (agents.data[0].TeamsMembers[0].Agent !== "0") {
				const ag = agents.data[0].TeamsMembers.map((agt) => {
					return { ...agt, newTeam: "", idNewTeam: 0, idTL: user.idccms };
				});
				const agts = tlListDel.map((tl) =>
					tl.idccms === user.idccms
						? {
								...tl,
								redistribute: ag,
								action: "Redistribute",
								error: false,
								msgError: "",
						  }
						: tl
				);
				setTlListDel(agts);
				setTempAgents(ag);
				setReorderAgents(true);
			} else {
				//no tiene equipo cargado
				const agts = tlListDel.map((tl) =>
					tl.idccms === user.idccms
						? {
								...tl,
								action: "Redistribute",
								error: true,
								msgError:
									"The selected Team Leader has no agents loaded in his team.",
						  }
						: tl
				);
				setTlListDel(agts);
			}
		} else {
			//modal de error en base de datos
		}
	};

	const handleActive = (user) => {
		setSelect(user.idccms);
		if (user.action === "Change") {
			setChange(true);
			setReorderAgents(false);
			setDeleteTeam(false);
			setTempUserChange(user);
			setTempNewUserChange(user.replacement);
		} else if (user.action === "Redistribute") {
			setChange(false);
			setReorderAgents(true);
			setDeleteTeam(false);
			setLoading(true);
			const aglist = tlListDel.filter((tl) => tl.idccms === user.idccms);
			setTempAgents(aglist[0].redistribute);
			setTempNewUserChange([]);
		} else {
			setTempNewUserChange([]);
			setChange(false);
			setReorderAgents(false);
			setDeleteTeam(true);
		}
	};

	const handleChange = (e, user) => {
		const chanAct = tlListDel.map((tl) =>
			tl.idccms === user.idccms
				? {
						...tl,
						action: e.target.value,
						redistribute: [],
						replacement: [],
						error: false,
						msgError: "",
				  }
				: tl
		);
		setTlListDel(chanAct);
		if (e.target.value === "Change") {
			setChange(true);
			setReorderAgents(false);
			setDeleteTeam(false);
			setTempUserChange({ ...user, action: e.target.value, redistribute: [] });
		} else if (e.target.value === "Redistribute") {
			setChange(false);
			setDeleteTeam(false);
			setLoading(true);
			getAgents(user);
			setTempNewUserChange([]);
		} else {
			setTempNewUserChange([]);
			setChange(false);
			setReorderAgents(false);
			setDeleteTeam(user.idccms);
		}
	};

	const handleSearch = async (ccms) => {
		if (ccms) {
			const info = await getInfoAgent(ccms);
			if (
				info &&
				info.status === 200 &&
				info.data.length > 0 &&
				info.data[0].status === "Active"
			) {
				const duplicates = await getTLDuplicates(
					allData,
					tlListDel,
					info.data[0]
				);
				if (duplicates) {
					setErrorccms(true);
					setMsgErrorccms("The user is in the list or in other Team");
				} else {
					if (info.data[0].StatusGP === "Active") {
						setErrorccms(true);
						setMsgErrorccms("The user is in the list or in other Team");
					} else {
						//settepmUsersChanges
						if (tepmUsersChanges.length === 0) {
							setErrorList(false);
							setMsgErrorList("");
							setTempNewUserChange({
								name: info.data[0].FullName,
								idccms: info.data[0].ident,
								checked: false,
								Email: info.data[0].email,
							});
							settepmUsersChanges([
								...tepmUsersChanges,
								{
									name: info.data[0].FullName,
									idccms: info.data[0].ident,
									checked: false,
									Email: info.data[0].email,
								},
							]);
							//hacer la busqueda del usuario en tldellist, actualizar replacement y setear la variable
							const atdl = tlListDel.map((tl) =>
								tl.idccms === tempUserChange.idccms
									? {
											...tempUserChange,
											replacement: {
												name: info.data[0].FullName,
												idccms: info.data[0].ident,
												checked: false,
												Email: info.data[0].email,
												error: false,
												msgError: "",
											},
									  }
									: tl
							);
							setTlListDel(atdl);
							setTempCcms("");
						} else {
							const validate = tepmUsersChanges.filter(
								(u) => u.idccms === info.data[0].ident
							);
							if (validate.length === 0) {
								setErrorList(false);
								setMsgErrorList("");
								setTempNewUserChange({
									name: info.data[0].FullName,
									idccms: info.data[0].ident,
									checked: false,
									Email: info.data[0].email,
								});
								settepmUsersChanges([
									...tepmUsersChanges,
									{
										name: info.data[0].FullName,
										idccms: info.data[0].ident,
										checked: false,
										Email: info.data[0].email,
									},
								]);
								//hacer la busqueda del usuario en tldellist, actualizar replacement y setear la variable
								const atdl = tlListDel.map((tl) =>
									tl.idccms === tempUserChange.idccms
										? {
												...tempUserChange,
												replacement: {
													name: info.data[0].FullName,
													idccms: info.data[0].ident,
													checked: false,
													Email: info.data[0].email,
													error: false,
													msgError: "",
												},
										  }
										: tl
								);
								setTlListDel(atdl);
								setTempCcms("");
							} else {
								setErrorccms(true);
								setMsgErrorccms(
									"The user is already in exchange for another team leader."
								);
							}
						}
					}
				}
			} else {
				setErrorccms(true);
				setMsgErrorccms("CCMS does not exist or is not active in the database");
			}
		} else {
			setErrorccms(true);
			setMsgErrorccms("You did not enter any ccms");
		}
	};

	const handleChangeTeam = (e, agent) => {
		//const { idTeam, Team } = e.target.value;
		const idTeam = parseInt(e.target.value.split("-")[1], 10);
		const asgtm = tlListDel.map((tl) => {
			if (tl.idccms === agent.idTL) {
				const n = tl.redistribute.map((ag) =>
					ag.Ident === agent.Ident
						? {
								...ag,
								newTeam: e.target.value,
								idNewTeam: idTeam,
						  }
						: ag
				);
				setTempAgents(n);
				return {
					...tl,
					redistribute: n,
					action: "Redistribute",
					replacement: [],
					error: false,
					msgError: "",
				};
			} else {
				return tl;
			}
		});
		setTlListDel(asgtm);
	};

	return (
		<div>
			<>
				<Typography variant="body1" gutterBottom color="#3047B0">
					Team Leader Remove List
				</Typography>
				<BoxTL
					sx={{
						border: errorList ? "1px solid red" : "1px solid #3047B0",
					}}
				>
					<Box display="flex" textAlign="center">
						<Box width="20%" color="#3047B0">
							<Typography variant="body1" fontWeight={700}>
								CCMS ID
							</Typography>
						</Box>
						<Box width="30%" color="#3047B0">
							<Typography variant="body1" fontWeight={700}>
								Team Leader
							</Typography>
						</Box>
						<Box width="15%" color="#3047B0">
							<Typography variant="body1" fontWeight={700}>
								Change
							</Typography>
						</Box>
						<Box width="15%" color="#3047B0" marginRight={"0.5rem"}>
							<Typography variant="body1" fontWeight={700}>
								Remove Team
							</Typography>
						</Box>
						<Box width="15%" color="#3047B0">
							<Typography variant="body1" fontWeight={700}>
								Redistribute
							</Typography>
						</Box>
					</Box>
					<BoxCeldas>
						{tlListDel.map((item, index) => (
							<>
								<TableCont
									display="flex"
									textAlign="center"
									key={index}
									flexDirection="column"
									sx={{
										border:
											item.action === "Delete"
												? "1px solid #FFAB32"
												: item.error
												? "1px solid red"
												: "1px solid #3047B0",
									}}
								>
									<CardTL
										onClick={() => handleActive(item)}
										sx={select === item.idccms && active}
									>
										<Box display="flex" alignItems="center" width="100%">
											<Box width="20%">
												<Typography variant="body2">{item.idccms}</Typography>
											</Box>
											<Box width="30%">
												<Typography variant="body2">{item.name}</Typography>
											</Box>
											<Box width="50%">
												<FormControl>
													<RadioGroup
														onChange={(e) => handleChange(e, item)}
														row
														aria-labelledby="demo-radio-buttons-group-label"
														name="radio-buttons-group"
														value={item.action}
													>
														<FormControlLabel
															value="Change"
															control={<Radio />}
															label={
																<Typography marginRight={"4rem"}></Typography>
															}
														/>
														<FormControlLabel
															value="Delete"
															control={<Radio />}
															label={
																<Typography marginRight={"3rem"}></Typography>
															}
														/>
														<FormControlLabel
															value="Redistribute"
															control={<Radio />}
															label={
																<Typography marginLeft={"-2rem"}></Typography>
															}
														/>
													</RadioGroup>
												</FormControl>
											</Box>
										</Box>
									</CardTL>
								</TableCont>
								{item.action === "Delete" && !item.error && (
									<FormHelperText sx={{ color: "#FFD61D" }}>
										{item.msgDel}
									</FormHelperText>
								)}
								{item.error && (
									<FormHelperText sx={{ color: "red" }}>
										{item.msgError}
									</FormHelperText>
								)}
							</>
						))}
					</BoxCeldas>
				</BoxTL>
				{change && (
					<>
						<Typography
							variant="body1"
							gutterBottom
							color="#3047B0"
							marginTop="1rem"
						>
							Assignment Team Leader
						</Typography>
						<FormControl sx={{ width: "100%" }} variant="outlined">
							<InputLabel error={errorccms} htmlFor="outlined-adornment-search">
								Search CCMS Id
							</InputLabel>
							<OutlinedInput
								error={errorccms}
								id="outlined-adornment-search"
								type="number"
								value={tempCcms}
								onChange={(e) => {
									setTempCcms(e.target.value);
									setErrorccms(false);
									//setMsgError("");
								}}
								endAdornment={
									<InputAdornment position="end" sx={{ mr: "1rem" }}>
										<>
											<ButtonActionBlue
												aria-label="toggle search visibility"
												edge="end"
												onClick={() => handleSearch(tempCcms)}
												sx={{ mr: "1rem" }}
											>
												Search
											</ButtonActionBlue>
										</>
									</InputAdornment>
								}
								label="Search CCMS Id"
							/>
							{errorccms && (
								<FormHelperText error>{msgErrorccms}</FormHelperText>
							)}
						</FormControl>
						<Box sx={{ display: "flex", flexDirection: "row", mt: "1rem" }}>
							<CardUser width="48%" marginLeft={1}>
								<Avatar
									alt="user"
									src={imgAvatar}
									sx={{ width: 70, height: 70, marginRight: "1rem" }}
								/>
								<Box textAlign="left">
									<Typography variant="body1">{tempUserChange.name}</Typography>
									<Typography variant="body2">{"Team Leader"}</Typography>

									<Typography color={"red"} variant="body2">
										Actual
									</Typography>
								</Box>
							</CardUser>
							{tempNewUserChange.name && (
								<CardUser width="48%" marginLeft={1}>
									<Avatar
										alt="user"
										src={imgAvatar}
										sx={{ width: 70, height: 70, marginRight: "1rem" }}
									/>
									<Box textAlign="left">
										<Typography variant="body1">
											{tempNewUserChange.name}
										</Typography>
										<Typography variant="body2">
											{tempNewUserChange.idccms}
										</Typography>
										<Typography color={"green"} variant="body2">
											New
										</Typography>
									</Box>
								</CardUser>
							)}
						</Box>
					</>
				)}
				{reorderAgents && (
					<>
						<Typography variant="body1" gutterBottom color="#3047B0">
							Agents List
						</Typography>
						<BoxTL
							sx={{
								border: errorList ? "1px solid red" : "1px solid #3047B0",
							}}
						>
							<Box display="flex" textAlign="center">
								<Box width="30%" color="#3047B0">
									<Typography variant="body1" fontWeight={700}>
										CCMS ID
									</Typography>
								</Box>
								<Box width="30%" color="#3047B0">
									<Typography variant="body1" fontWeight={700}>
										Name
									</Typography>
								</Box>
								<Box width="40%" color="#3047B0">
									<Typography variant="body1" fontWeight={700}>
										New Team
									</Typography>
								</Box>
							</Box>
							<BoxCeldas>
								{
									//agregar falla en servidor y loading
									tempAgents.map((item, index) => (
										<TableCont
											display="flex"
											textAlign="center"
											key={index}
											flexDirection="column"
											//sx={{ background: "blue" }}
										>
											<Box display="flex" alignItems="center">
												<Box width="20%">
													<Typography variant="body2">{item.Ident}</Typography>
												</Box>
												<Box width="50%">
													<Typography variant="body2">{item.Agent}</Typography>
												</Box>
												<Box width="30%">
													<FormControl fullWidth>
														<InputLabel id="newTeam-select-label">
															New Team
														</InputLabel>
														<Select
															labelid="newTeam-select-label"
															id="newTeam-select"
															value={item.newTeam} //este debe ir en cada agente
															label="New Team"
															onChange={(e) => handleChangeTeam(e, item)}
														>
															{tempTeams.map((team, index) => (
																<MenuItem
																	key={index + team.idTeam}
																	//value={team.NameTeamLeader}
																	value={`${team.NameTeamLeader}-${team.idTeam}`}
																>
																	{team.NameTeamLeader}
																</MenuItem>
															))}
														</Select>
													</FormControl>
												</Box>
											</Box>
										</TableCont>
									))
								}
							</BoxCeldas>
						</BoxTL>
					</>
				)}
			</>
		</div>
	);
};

export default DeleteTL;
