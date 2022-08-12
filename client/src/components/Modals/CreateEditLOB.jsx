import React, { useEffect, useState } from "react";
import {
	Box,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
	styled,
	FormHelperText,
	Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import { ButtonActionBlue, InputText } from "../../assets/styled/muistyled";
import {
	createLobOperationManager,
	getInfoAgent,
	getLobs,
	requestWithData,
} from "../../utils/api";

import {
	createTeamLeaderList,
	filterTeamLeaderList,
	getLobNameDuplicate,
	getTLDuplicates,
	nextHelper,
	filterLobList,
	dataLobsToSend,
	editLobsToSend,
	orderKpis,
	redistributeValidate,
	dataToSendTLEdit,
} from "../../helpers/helperLOBCreation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingComponent from "../LoadingComponent";
import KPISetup from "../OpsManager/KPISetup";
import DeleteTL from "../OpsManager/DeleteTL";
const MySwal = withReactContent(Swal);

const TableCont = styled(Box)(() => ({
	color: "#3047B0",
	background: "#E8E8E8",
	borderRadius: "20px",
	padding: "5px",
	marginTop: "5px",
}));
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

const CreateEditLOB = ({
	allData,
	setOpen,
	dataLOB,
	userData,
	getData,
	setLob,
	setAllData,
	setNoData,
	disabled,
	setDisabled,
}) => {
	const [dataTL, setDataTL] = useState([]);
	const [nameLOB, setNameLOB] = useState("");
	const [error, setError] = useState(false);
	const [msgError, setMsgError] = useState("");
	const [errorList, setErrorList] = useState(false);
	const [msgErrorList, setMsgErrorList] = useState("");
	const [errorccms, setErrorccms] = useState(false);
	const [msgErrorccms, setMsgErrorccms] = useState("");
	const [tempCcms, setTempCcms] = useState("");
	const [errorKpisList, setErrorKpisList] = useState(false);
	const [loadingKpi, setLoadingKpi] = useState(false);
	const [change, setChange] = useState(false);
	const [kpisList, setKpisList] = useState([]);
	const [msgErrorKpisList, setMsgErrorKpisList] = useState("");
	const [next, setNext] = useState(false);
	const [del, setDel] = useState(false);
	//const [disabled, setDisabled] = useState(false);
	const [kpiWork, setKpiWork] = useState([]);
	const [dbKpiWork, setDbKpiWork] = useState([]);
	const [tlListDel, setTlListDel] = useState([]);

	useEffect(
		() => {
			const getData = async () => {
				const tls = await getLobs(2, dataLOB.idLob);
				if (tls && tls.status === 200 && tls.data.length > 0) {
					const TLList = await filterTeamLeaderList(tls.data);
					setDataTL(TLList);
					setNameLOB(dataLOB.name);
				}
			};

			if (dataLOB.length !== 0) {
				getData();
			}
		},
		// eslint-disable-next-line
		[]
	);

	const handleSearch = async (ccms) => {
		setChange(false);
		if (ccms) {
			const info = await getInfoAgent(ccms);
			if (
				info &&
				info.status === 200 &&
				info.data.length > 0 &&
				info.data[0].status === "Active"
			) {
				const duplicates = await getTLDuplicates(allData, dataTL, info.data[0]);
				if (
					dataTL.length === 0 &&
					!duplicates &&
					info.data[0].StatusGP !== "Active"
				) {
					setErrorList(false);
					setMsgErrorList("");
					setDataTL([
						...dataTL,
						{
							name: info.data[0].FullName,
							idccms: info.data[0].ident,
							checked: false,
							Email: info.data[0].email,
						},
					]);
					setTempCcms("");
				} else if (duplicates) {
					setErrorccms(true);
					setMsgErrorccms("The user is in the list or in other Team");
				} else {
					if (info.data[0].StatusGP === "Active") {
						setErrorccms(true);
						setMsgErrorccms("The user is in the list or in other Team");
					} else {
						setErrorList(false);
						setMsgErrorList("");
						setDataTL([
							...dataTL,
							{
								name: info.data[0].FullName,
								idccms: info.data[0].ident,
								checked: false,
								Email: info.data[0].email,
							},
						]);
						setTempCcms("");
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

	const handleCheck = (info) => {
		let tempList = dataTL.map((tl) =>
			tl.idccms === info.idccms ? { ...tl, checked: !tl.checked } : tl
		);
		setDataTL(tempList);
	};
	/* 
	const submit = async (context, idLob) => {
		const dataToSend = createTeamLeaderList(dataTL, nameLOB, userData);
		const data = await createLobOperationManager(
			context,
			dataToSend.lobName,
			idLob, /// id lob seleccionada
			dataToSend.tlIdccms,
			dataToSend.emails
		);
		if (data && data.status === 200) {
			MySwal.fire({
				title: <p>{context === 2 ? "Saved!" : "Created LOB successfully!"}</p>,
				icon: "success",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					//window.location.reload();
					getData();
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
					//window.location.reload();
					getData();
				}
			});
		}
	}; */

	const handleCreate = async () => {
		setDisabled(true);
		const dts = dataLobsToSend(kpiWork, nameLOB);
		if (dts[0] === "Some field in the kpis is empty") {
			notifyModalError(dts[0]);
			setDisabled(false);
		} else if (dts[0] === "Some field is empty") {
			notifyModalError(dts[0]);
			setDisabled(false);
		} else if (
			dts[0] ===
				"If you select ASC, the targets in each quartile must be greater than the critical point and descending from Q1 to Q4." ||
			dts[0] ===
				"If you select DSC, the targets in each quartile must be less than the critical point and drop from Q4 to Q1."
		) {
			setDisabled(false);
			notifyModalError(dts[0]);
		} else {
			if (dts.length > 5) {
				notifyModalError("Max. Five KPI´s");
				setDisabled(false);
			} else {
				const dataToSend = createTeamLeaderList(dataTL, nameLOB, userData);
				//trae targets kpis (nuevo endpoint)
				const data = await requestWithData("postcreatelob", {
					lobName: dataToSend.lobName,
					context: 1,
					idLob: 0,
					createNewTL: dataToSend.tlIdccms,
					changeTL: [],
					reassingTeam: [],
					inactivateTeam: [],
					emails: dataToSend.emails,
				});
				if (data && data.status === 200) {
					const sendDataLob = await requestWithData("postsetlobskpis", {
						...dts,
						idLob: data.data[0].idLob,
					});
					if (sendDataLob.status === 200) {
						const TLList = await filterLobList(sendDataLob.data);
						setLob(TLList);
						setAllData(sendDataLob.data);
						setNoData(false);
						setNext(false);
						setOpen(false);
						setDisabled(false);
					} else {
						setNext(false);
						setOpen(false);
						setDisabled(false);
						MySwal.fire({
							title: <p>Internal Server Error!</p>,
							icon: "error",
							confirmButtonText: "Accept",
							allowOutsideClick: false,
						}).then((resultado) => {
							if (resultado.value) {
								window.location.reload();
							}
						});
					}
				} else {
					MySwal.fire({
						title: <p>Internal Server Error!</p>,
						icon: "error",
						confirmButtonText: "Accept",
						allowOutsideClick: false,
					}).then((resultado) => {
						if (resultado.value) {
							window.location.reload();
						}
					});
					setDisabled(false);
					setNext(false);
					setOpen(false);
				}
				/* const sendDataLob = await requestWithData("postsetlobskpis", dts);
				if (sendDataLob.status === 200) {
					const TLList = await filterLobList(sendDataLob.data);
					setLob(TLList);
					setAllData(sendDataLob.data);
					setNoData(false);
					setNext(false);
					setOpen(false);
					setDisabled(false);
				} else {
					setNext(false);
					setOpen(false);
					setDisabled(false);
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
				} */
			}
		}
		/* if (nameLOB) {
			if (dataTL.length > 0) {
				const TLList = dataTL.filter((tl) => tl.checked === true);
				if (TLList.length > 0) {
					setOpen(false);
					MySwal.fire({
						title: (
							<p>{`Are you sure you want create the LOB with name ${nameLOB}?`}</p>
						),
						icon: "info",
						showDenyButton: true,
						confirmButtonText: "Accept",
						allowOutsideClick: false,
					}).then((result) => {
						if (result.isConfirmed) {
							submit(1, 0);
						} else if (result.isDenied) {
							Swal.fire("Changes are not saved", "", "info");
						}
					});
				} else {
					setErrorList(true);
					setMsgErrorList("Check Team Leader is required (min. 1)");
				}
			} else {
				setErrorList(true);
				setMsgErrorList("No data");
			}
		} else {
			setError(true);
			setMsgError("No data");
		} */
	};

	const handleEdit = async () => {
		setDisabled(true);
		const tlsLob = allData.filter((tl) => tl.idLob === dataTL[0].idLob);
		const valtledit = dataTL.filter(
			(item1) => !tlsLob.some((item2) => item1.idccms === item2.identTL)
		);
		const dts = editLobsToSend(kpiWork, dbKpiWork);
		if (dts[0] === "Some field in the kpis is empty") {
			notifyModalError(dts[0]);
			setDisabled(false);
			//agregar validacion de si se movieron los tl
		} else if (
			dts[0] === "You did not edit any field" &&
			valtledit.length === 0 &&
			tlListDel.length === 0
		) {
			notifyModalError(dts[0]);
			setDisabled(false);
		} else if (dts[0] === "Some field is empty") {
			notifyModalError(dts[0]);
			setDisabled(false);
		} else if (
			dts[0] ===
				"If you select ASC, the targets in each quartile must be greater than the critical point and descending from Q1 to Q4." ||
			dts[0] ===
				"If you select DSC, the targets in each quartile must be less than the critical point and drop from Q4 to Q1."
		) {
			notifyModalError(dts[0]);
			setDisabled(false);
		} else {
			if (dts.length > 5) {
				notifyModalError("Max. Five KPI´s");
				setDisabled(false);
			} else {
				const tls = dataToSendTLEdit(
					valtledit,
					tlListDel,
					nameLOB,
					dataTL[0].idLob
				);

				const editDataLob = await requestWithData("postcreatelob", tls);
				if (editDataLob.status === 200) {
					if (dts[0] === "You did not edit any field") {
						//se debe actualizar
						getData();
						setNext(false);
						setOpen(false);
						setDisabled(false);
					} else {
						const sendDataLob = await requestWithData(
							"postupdatecampaigninfo",
							{
								...dts,
								idLob: dataTL[0].idLob,
							}
						);
						if (sendDataLob.status === 200) {
							const TLList = await filterLobList(sendDataLob.data);
							setAllData(sendDataLob.data);
							setLob(TLList);
							setNext(false);
							setOpen(false);
							setDisabled(false);
						} else {
							setNext(false);
							setOpen(false);
							setDisabled(false);
							MySwal.fire({
								title: <p>Internal Server Error!</p>,
								icon: "error",
								confirmButtonText: "Accept",
								allowOutsideClick: false,
							}).then((resultado) => {
								if (resultado.value) {
									window.location.reload();
								}
							});
						}
					}
				} else {
					setNext(false);
					setOpen(false);
					setDisabled(false);
					MySwal.fire({
						title: <p>Internal Server Error!</p>,
						icon: "error",
						confirmButtonText: "Accept",
						allowOutsideClick: false,
					}).then((resultado) => {
						if (resultado.value) {
							window.location.reload();
						}
					});
				}
			}
		}
	};

	const handleBlur = async () => {
		const duplicates = await getLobNameDuplicate(allData, nameLOB);
		if (duplicates) {
			setError(true);
			setMsgError("LOB name already exists");
		}
	};

	const handleNext = async (action) => {
		setDisabled(true);
		setError(false);
		setMsgError("");
		setErrorccms(false);
		setMsgErrorccms("");
		setErrorList(false);
		setMsgErrorList("");
		if (action === "Next") {
			if (dataLOB.length !== 0) {
				//editar
				if (nameLOB) {
					if (dataTL.length > 0) {
						const TLList = dataTL.filter((tl) => tl.checked === true);
						if (TLList.length > 0) {
							const TLDelList = dataTL.filter((tl) => tl.checked === false);
							if (TLDelList.length > 0) {
								//interseccion
								const delList = TLDelList.filter((item1) =>
									allData.some((item2) => item1.idccms === item2.identTL)
								);
								if (delList.length > 0) {
									setDisabled(false);
									setNext(true);
									setDel(true);
									setTlListDel(delList);
								} else {
									//no se elimina ningun TL pasas a targets
									if (kpiWork.length === 0) {
										const kpis = await requestWithData("getLobsKpis", {
											idLob: dataLOB.idLob,
											context: 2,
										});
										if (kpis && kpis.status === 200) {
											const dwc = kpis.data.map((el) =>
												el.cheked === 1
													? {
															...el,
															checked: true,
													  }
													: {
															...el,
															checked: false,
															CriticalPoint: "",
															Q1: "",
															Q2: "",
															Q3: "",
															Q4: "",
															OrderKpi: "",
													  }
											);

											//setTlListDel([]);
											setKpiWork(dwc);
											setDbKpiWork(dwc);
											setNext(true);
											setDel(false);
											setDisabled(false);
										} else {
											MySwal.fire({
												title: <p>Error in server!</p>,
												icon: "error",
												confirmButtonText: "Accept",
												allowOutsideClick: false,
											}).then((resultado) => {
												if (resultado.value) {
													window.location.reload();
												}
											});
											setNext(false);
											setOpen(false);
											setDisabled(false);
										}
									} else {
										setNext(true);
										setDel(false);
										setDisabled(false);
										//setTlListDel([]);
									}
								}
							} else {
								if (kpiWork.length === 0) {
									const kpis = await requestWithData("getLobsKpis", {
										idLob: dataLOB.idLob,
										context: 2,
									});
									if (kpis && kpis.status === 200) {
										const dwc = kpis.data.map((el) =>
											el.cheked === 1
												? {
														...el,
														checked: true,
												  }
												: {
														...el,
														checked: false,
														CriticalPoint: "",
														Q1: "",
														Q2: "",
														Q3: "",
														Q4: "",
														OrderKpi: "",
												  }
										);
										//setTlListDel([]);
										setKpiWork(dwc);
										setDbKpiWork(dwc);
										setNext(true);
										setDel(false);
										setDisabled(false);
									} else {
										MySwal.fire({
											title: <p>Error in server!</p>,
											icon: "error",
											confirmButtonText: "Accept",
											allowOutsideClick: false,
										}).then((resultado) => {
											if (resultado.value) {
												window.location.reload();
											}
										});
										setNext(false);
										setOpen(false);
										setDisabled(false);
									}
								} else {
									setNext(true);
									setDel(false);
									setDisabled(false);
									//setTlListDel([]);
								}
							}
						} else {
							setErrorList(true);
							setMsgErrorList("Check Team Leader is required (min. 1)");
							setDisabled(false);
						}
					} else {
						setErrorList(true);
						setMsgErrorList("No data");
						setDisabled(false);
					}
				} else {
					setError(true);
					setMsgError("No data");
					setDisabled(false);
				}
			} else {
				//creacion
				if (nameLOB) {
					if (dataTL.length > 0) {
						const TLList = dataTL.filter((tl) => tl.checked === true);
						if (TLList.length > 0) {
							if (kpiWork.length === 0) {
								const kpis = await requestWithData("getLobsKpis", {
									idLob: 0,
									context: 1,
								});
								if (kpis && kpis.status === 200) {
									const dwc = kpis.data.map((el) =>
										el.cheked === 1
											? {
													...el,
													checked: true,
											  }
											: {
													...el,
													checked: false,
													CriticalPoint: "",
													Q1: "",
													Q2: "",
													Q3: "",
													Q4: "",
													OrderKpi: "",
											  }
									);
									setKpiWork(dwc);
									setDbKpiWork(dwc);
									setNext(true);
									setDel(false);
									setDisabled(false);
								} else {
									MySwal.fire({
										title: <p>Error in server!</p>,
										icon: "error",
										confirmButtonText: "Accept",
										allowOutsideClick: false,
									}).then((resultado) => {
										if (resultado.value) {
											window.location.reload();
										}
									});
									setNext(false);
									setOpen(false);
									setDisabled(false);
								}
							} else {
								setNext(true);
								setDel(false);
								setDisabled(false);
							}
						} else {
							setErrorList(true);
							setMsgErrorList("Check Team Leader is required (min. 1)");
							setDisabled(false);
						}
					} else {
						setErrorList(true);
						setMsgErrorList("No data");
						setDisabled(false);
					}
				} else {
					setError(true);
					setMsgError("No data");
					setDisabled(false);
				}
			}
		} else {
			if (tlListDel.length > 0) {
				if (action === "Back Del") {
					setNext(false);
					setDel(false);
					setDisabled(false);
					setTlListDel([]);
				} else {
					setNext(true);
					setDel(true);
					setDisabled(false);
				}
			} else {
				setNext(false);
				setDel(false);
				setDisabled(false);
			}
		}
	};

	const handleNextDelete = async () => {
		//validaciones
		const redistVal = redistributeValidate(tlListDel);
		const nextValidate = tlListDel.filter(
			(tl) =>
				tl.action === "" ||
				(tl.action === "Change" &&
					(tl.replacement.length === 0 || tl.redistribute.length > 0)) ||
				(tl.action === "Delete" &&
					(tl.replacement.length > 0 || tl.redistribute.length > 0)) ||
				(tl.action === "Redistribute" &&
					(tl.redistribute.length === 0 ||
						tl.replacement.length > 0 ||
						redistVal.length > 0))
		);
		if (nextValidate.length === 0) {
			if (kpiWork.length === 0) {
				const kpis = await requestWithData("getLobsKpis", {
					idLob: dataLOB.idLob,
					context: 2,
				});
				if (kpis && kpis.status === 200) {
					const dwc = kpis.data.map((el) =>
						el.cheked === 1
							? {
									...el,
									checked: true,
							  }
							: {
									...el,
									checked: false,
									CriticalPoint: "",
									Q1: "",
									Q2: "",
									Q3: "",
									Q4: "",
									OrderKpi: "",
							  }
					);
					//setTlListDel([]);
					setKpiWork(dwc);
					setDbKpiWork(dwc);
					setNext(true);
					setDel(false);
					setDisabled(false);
				} else {
					MySwal.fire({
						title: <p>Error in server!</p>,
						icon: "error",
						confirmButtonText: "Accept",
						allowOutsideClick: false,
					}).then((resultado) => {
						if (resultado.value) {
							window.location.reload();
						}
					});
					setNext(false);
					setOpen(false);
					setDisabled(false);
				}
			} else {
				setNext(true);
				setDel(false);
				setDisabled(false);
				//setTlListDel([]);
			}
		} else {
			//error
			if (redistVal.length === 0) {
				//algun tl no tiene RadioButton Seleccionado
				const agts = tlListDel.map((tl) =>
					nextValidate.filter((el) => tl.idccms === el.idccms).length > 0
						? {
								...tl,
								error: true,
								msgError: "You did not select any option",
						  }
						: tl
				);
				setTlListDel(agts);
			} else {
				//alguno de los que tienen redistribute le falta algun agente por asignar nuevo equipo
				const agts = tlListDel.map((tl) =>
					redistVal.filter((el) => tl.idccms === el.idccms).length > 0
						? {
								...tl,
								error: true,
								msgError: "An agent is missing to assign a team",
						  }
						: tl
				);
				setTlListDel(agts);
			}
		}
	};

	const notifyModalError = (msgError) => {
		toast.info(
			<div>
				<p>
					<b>{msgError}</b>
				</p>
			</div>
		);
	};

	return (
		<Box>
			<Typography
				variant="h6"
				textAlign="center"
				color="#3047B0"
				marginY={3}
				fontWeight={700}
			>
				{dataLOB.length !== 0 ? `Edit LOB - ${nameLOB}` : "Creation LOB"}
			</Typography>

			{!next ? (
				<>
					<InputText
						error={error}
						name="lobName"
						label="Name LOB"
						variant="outlined"
						type="text"
						fullWidth
						onChange={(e) => {
							setNameLOB(e.target.value);
							setError(false);
							setMsgError("");
						}}
						value={nameLOB}
						helperText={error && msgError}
						onBlur={handleBlur}
					/>

					{/*ASIGNACION DE TEAM LEADER */}
					<Box marginY={3}>
						<Typography variant="body1" gutterBottom color="#3047B0">
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
									setMsgError("");
								}}
								endAdornment={
									<InputAdornment position="end" sx={{ mr: "1rem" }}>
										<ButtonActionBlue
											aria-label="toggle search visibility"
											edge="end"
											onClick={() => handleSearch(tempCcms)}
											sx={{ mr: "1rem" }}
										>
											Search
										</ButtonActionBlue>
									</InputAdornment>
								}
								label="Search CCMS Id"
							/>
							{errorccms && (
								<FormHelperText error>{msgErrorccms}</FormHelperText>
							)}
						</FormControl>

						<Box sx={{ width: "100%" }}>
							{dataLOB.length !== 0 ? (
								<Typography variant="body1" gutterBottom color="#3047B0">
									Edit Team Leader Assignment
								</Typography>
							) : (
								<Typography variant="body1" gutterBottom color="#3047B0">
									Team Leader List
								</Typography>
							)}
							<BoxTL
								sx={{
									border: errorList ? "1px solid red" : "1px solid #3047B0",
								}}
							>
								<Box display="flex" textAlign="center">
									<Box width="50%" color="#3047B0">
										<Typography variant="body1" fontWeight={700}>
											CCMS ID
										</Typography>
									</Box>
									<Box width="45%" color="#3047B0">
										<Typography variant="body1" fontWeight={700}>
											Team Leader
										</Typography>
									</Box>
									<Box width="10%" />
								</Box>
								<BoxCeldas>
									{dataTL.map((item, index) => (
										<TableCont
											display="flex"
											textAlign="center"
											key={index}
											flexDirection="column"
										>
											<Box display="flex" textAlign="center">
												<Box width="40%">
													<Typography variant="body2">{item.idccms}</Typography>
												</Box>
												<Box width="40%">
													<Typography variant="body2">{item.name}</Typography>
												</Box>
												<Box width="10%">
													<input
														type="checkbox"
														id="isChecked"
														checked={item.checked}
														onChange={() => handleCheck(item)}
													/>
												</Box>
											</Box>
										</TableCont>
									))}
								</BoxCeldas>
							</BoxTL>
						</Box>
					</Box>
					{/*END ASIGNACION DE TEAM LEADER */}

					{errorList && <FormHelperText error>{msgErrorList}</FormHelperText>}
				</>
			) : del ? (
				<DeleteTL
					tlListDel={tlListDel}
					setTlListDel={setTlListDel}
					allData={allData}
				/>
			) : (
				<KPISetup
					kpiWork={kpiWork}
					setKpiWork={setKpiWork}
					kpisList={kpisList}
					setKpisList={setKpisList}
				/>
			)}
			<Box display="flex" justifyContent="flex-end" marginY={3}>
				{next ? (
					<>
						{!disabled && (
							<Tooltip
								title={
									del
										? "If you click, you will lose the information in the Team Leader Remove section and will have to re-manage each Team Leader to be removed."
										: ""
								}
								placement="top"
								arrow
							>
								<ButtonActionBlue
									sx={{ width: "10rem" }}
									//disabled={disabled}
									onClick={() =>
										del ? handleNext("Back Del") : handleNext("Back")
									}
								>
									{"Back"}
								</ButtonActionBlue>
							</Tooltip>
						)}
						{del && (
							<ButtonActionBlue
								sx={{ width: "10rem", marginLeft: "2rem" }}
								disabled={disabled}
								onClick={() => handleNextDelete()}
							>
								{"Next to set KPIs"}
							</ButtonActionBlue>
						)}
					</>
				) : (
					<ButtonActionBlue
						sx={{ width: "10rem" }}
						disabled={disabled}
						onClick={() => handleNext("Next")}
					>
						{"Next"}
					</ButtonActionBlue>
				)}
				{/* {disabled&&<LoadingComponent/>} */}
				{next &&
					!del &&
					(dataLOB.length === 0 ? (
						disabled ? (
							<LoadingComponent />
						) : (
							<ButtonActionBlue
								sx={{ width: "10rem", marginLeft: "2rem" }}
								disabled={disabled}
								onClick={handleCreate}
							>
								Create
							</ButtonActionBlue>
						)
					) : disabled ? (
						<LoadingComponent />
					) : (
						<ButtonActionBlue
							sx={{ width: "10rem", marginLeft: "2rem" }}
							disabled={disabled}
							onClick={handleEdit}
						>
							Update
						</ButtonActionBlue>
					))}
			</Box>
		</Box>
	);
};

export default CreateEditLOB;
