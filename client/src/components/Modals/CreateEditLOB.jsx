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
} from "../../helpers/helperLOBCreation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingComponent from "../LoadingComponent";
import KPISetup from "../OpsManager/KPISetup";
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
	const [kpisList, setKpisList] = useState([]);
	const [msgErrorKpisList, setMsgErrorKpisList] = useState("");
	const [next, setNext] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [kpiWork, setKpiWork] = useState([]);
	const [dbKpiWork, setDbKpiWork] = useState([]);

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
		const dts = dataLobsToSend(kpiWork);
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
			const sendDataLob = await requestWithData("postsetlobskpis", dts);
			if (sendDataLob.status === 200) {
				const TLList = await filterLobList(sendDataLob.data);
				setLob(TLList);
				setNext(false);
				setOpen(false);
				setDisabled(false);
				//console.log(sendDataLob.data);
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
		//setDisabled(true);
		const dts = editLobsToSend(kpiWork, dbKpiWork);
		console.log("data to send", dts);
		const editDataLob = await requestWithData("postupdatecampaigninfo", dts);
		if (editDataLob.status === 200) {
			const TLList = await filterLobList(editDataLob.data);
			setLob(TLList);
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
		}
		/* if (nameLOB) {
			if (dataTL.length > 0) {
				const TLList = dataTL.filter((tl) => tl.checked === true);
				if (TLList.length > 0) {
					setOpen(false);
					MySwal.fire({
						title: <p>{`Are you sure you want edit the LOB as ${nameLOB}?`}</p>,
						icon: "info",
						showDenyButton: true,
						confirmButtonText: "Accept",
						allowOutsideClick: false,
					}).then((result) => {
						if (result.isConfirmed) {
							submit(2, dataLOB.idLob);
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
							//acciones
							const dataToSend = createTeamLeaderList(
								dataTL,
								nameLOB,
								userData
							);
							const data = await createLobOperationManager(
								2,
								dataToSend.lobName,
								dataLOB.idLob,
								dataToSend.tlIdccms,
								dataToSend.emails
							);
							if (data && data.status === 200) {
								const kpis = await requestWithData("getLobsKpis", {
									idLob: dataLOB.idLob,
								});
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
								setDisabled(false);
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
								setNext(false);
								setOpen(false);
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
			} else {
				if (nameLOB) {
					if (dataTL.length > 0) {
						const TLList = dataTL.filter((tl) => tl.checked === true);
						if (TLList.length > 0) {
							const dataToSend = createTeamLeaderList(
								dataTL,
								nameLOB,
								userData
							);
							const data = await createLobOperationManager(
								1,
								dataToSend.lobName,
								0,
								dataToSend.tlIdccms,
								dataToSend.emails
							);
							if (data && data.status === 200) {
								const dwc = data.data.map((el) =>
									el.checked
										? el
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
								setNext(true);
								setKpiWork(dwc);
								setDisabled(false);
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
								setDisabled(false);
								setNext(false);
								setOpen(false);
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
			setNext(false);
			setDisabled(false);
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
									<InputAdornment position="end">
										<ButtonActionBlue
											aria-label="toggle search visibility"
											edge="end"
											onClick={() => handleSearch(tempCcms)}
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
									<Box width="45%" color="#3047B0">
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
										<TableCont display="flex" textAlign="center" key={index}>
											<Box width="45%">
												<Typography variant="body2">{item.idccms}</Typography>
											</Box>
											<Box width="45%">
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
										</TableCont>
									))}
								</BoxCeldas>
							</BoxTL>
						</Box>
					</Box>
					{/*END ASIGNACION DE TEAM LEADER */}

					{errorList && <FormHelperText error>{msgErrorList}</FormHelperText>}
				</>
			) : (
				<KPISetup
					kpiWork={kpiWork}
					setKpiWork={setKpiWork}
					kpisList={kpisList}
					setKpisList={setKpisList}
				/>
			)}

			{/* <Box display="flex" justifyContent="flex-end" marginY={3}>
        <ButtonActionBlue
          onClick={dataLOB.length !== 0 ? handleEdit : handleCreate}
        >
          Save
        </ButtonActionBlue>
      </Box> */}

			<Box display="flex" justifyContent="flex-end" marginY={3}>
				{!next && (
					<ButtonActionBlue
						sx={{ width: "10rem" }}
						disabled={disabled}
						onClick={() => handleNext("Next")}
					>
						{"Next"}
					</ButtonActionBlue>
				)}
				{next &&
					(dataLOB.length === 0 ? (
						<ButtonActionBlue
							sx={{ width: "10rem", marginLeft: "2rem" }}
							disabled={disabled}
							onClick={handleCreate}
						>
							Create
						</ButtonActionBlue>
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
