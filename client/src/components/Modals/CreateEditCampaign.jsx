import React, { useState, useEffect } from "react";
import {
	Box,
	FormControl,
	FormHelperText,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	styled,
	Typography,
} from "@mui/material";
import {
	ButtonActionBlue,
	InputText,
	ScrollBox,
} from "../../assets/styled/muistyled";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import KpiSetup from "../SuperAdmin/KpiSetup";
import { getInfoAgent, requestWithData } from "../../utils/api";
import {
	addHelper,
	createHelper,
	editHelper,
	getCampNameDuplicate,
	getCheckToEdit,
	getkpisDuplicates,
	getOMDuplicates,
	nextHelper,
} from "../../helpers/helperCreateEditCamp";

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

const BoxHead = styled(Box)(() => ({
	display: "flex",
	textAlign: "center",
	marginBottom: "1rem",
	color: "#3047B0",
}));

const CreateEditCampaign = ({
	dataCampaign,
	dataToEdit,
	createCamp,
	editCamp,
}) => {
	const navigate = useNavigate();
	const rxDispatch = useDispatch();
	const [next, setNext] = useState(false);
	const [typeLoad, setTypeLoad] = useState(false);
	const [name, setName] = useState("");
	const [errorName, setErrorName] = useState(false);
	const [msgErrorName, setMsgErrorName] = useState("");
	const [OMList, setOMList] = useState([]);
	const [errorOMList, setErrorOMList] = useState(false);
	const [msgErrorOMList, setMsgErrorOMList] = useState("");
	const [errorOMSearch, setErrorOMSearch] = useState(false);
	const [msgErrorOMSearch, setMsgErrorOMSearch] = useState("");
	const [kpisList, setKpisList] = useState([]);
	const [errorKpisList, setErrorKpisList] = useState(false);
	const [msgErrorKpisList, setMsgErrorKpisList] = useState("");
	const [errorKpiSearch, setErrorKpiSearch] = useState(false);
	const [msgErrorKpiSearch, setMsgErrorKpiSearch] = useState("");
	const [tempCcms, setTempCcms] = useState("");
	const [tempKpi, setTempKpi] = useState("");
	const [add, setAdd] = useState(false);
	const [addMsg, setAddMsg] = useState("");
	const [workDataToEdit, setWorkDataToEdit] = useState([]);
	const [kpiWork, setKpiWork] = useState([]);
	const [loadingOM, setLoadingOM] = useState(false);
	const [loadingKpi, setLoadingKpi] = useState(false);

	useEffect(
		() => {
			if (dataToEdit) {
				const getData = async () => {
					setLoadingKpi(true);
					setLoadingOM(true);
					const info = await requestWithData("getcampaigninfo", {
						idcampaign: dataToEdit,
						context: 2,
					});
					if (info && info.status === 200 && info.data.length > 0) {
						if (
							info.data[0].Result[0].IdCampaign !== "0" &&
							info.data[0].Result[0].nameCampaign !== "0"
						) {
							const dataCheck = info.data[0].Result.map((el) =>
								el.checked ? el : { ...el, checked: true }
							);
							const typeLTrue = info.data[0].Result.filter(
								(el) => el.LoadType === 0
							);
							if (typeLTrue.length > 0) {
								setTypeLoad(true);
							}
							setLoadingKpi(false);
							setLoadingOM(false);
							setName(info.data[0].Result[0].nameCampaign);
							setKpisList(dataCheck);
							setWorkDataToEdit(dataCheck);
							setOMList([
								{
									name: info.data[0].Result[0].NameOperationManager,
									idccms: info.data[0].Result[0].identOM,
									checked: true,
									email: null,
								},
							]);
						} else {
							setLoadingKpi(false);
							setLoadingOM(false);
							notifyModalError("Server Problems");
						}
					} else if (info && info.data === "UnauthorizedError") {
						rxDispatch(logoutAction());
						navigate("/");
					} else {
						setLoadingKpi(false);
						setLoadingOM(false);
						notifyModalError("Server Problems");
					}
				};
				getData();
			}
		},
		// eslint-disable-next-line
		[]
	);

	const handleSearchCCMS = async (ccms) => {
		if (ccms) {
			const info = await getInfoAgent(ccms);
			if (
				info &&
				info.status === 200 &&
				info.data.length > 0 &&
				info.data[0].status === "Active"
			) {
				const duplicates = await getOMDuplicates(
					dataCampaign,
					OMList,
					info.data[0]
				);
				if (
					OMList.length === 0 &&
					!duplicates &&
					info.data[0].StatusGP !== "Active"
				) {
					setErrorOMSearch(false);
					setMsgErrorOMSearch("");
					setTempCcms("");
					setOMList([
						...OMList,
						{
							name: info.data[0].FullName,
							idccms: info.data[0].ident,
							checked: false,
							email: info.data[0].email,
						},
					]);
				} else if (duplicates) {
					setErrorOMSearch(true);
					setMsgErrorOMSearch("The user is in the list or in other Team");
				} else {
					if (info.data[0].StatusGP === "Active") {
						setErrorOMSearch(true);
						setMsgErrorOMSearch("The user is in the list or in other Team");
					} else {
						setErrorOMSearch(false);
						setMsgErrorOMSearch("");
						setTempCcms("");
						setOMList([
							...OMList,
							{
								name: info.data[0].FullName,
								idccms: info.data[0].ident,
								checked: false,
								email: info.data[0].email,
							},
						]);
					}
				}
			} else {
				setErrorOMSearch(true);
				setMsgErrorOMSearch(
					"CCMS does not exist or is not active in the database"
				);
			}
		} else {
			setErrorOMSearch(true);
			setMsgErrorOMSearch("You did not enter any ccms");
		}
	};

	const handleSearchKpi = async (kpi) => {
		if (dataToEdit) {
			if (kpi) {
				const info = await requestWithData("getkpisfrommd", { kpi });
				if (info && info.status === 200) {
					if (info.data.length > 0) {
						const duplicates = await getCheckToEdit(
							workDataToEdit,
							kpisList,
							info.data
						);
						setErrorKpiSearch(false);
						setMsgErrorKpiSearch("");
						setTempKpi("");
						setKpisList(duplicates);
					} else if (typeLoad) {
						setAdd(true);
						setAddMsg(
							"No kpi match in master data, if is a manual kpi, click add, otherwise, modify entered kpi."
						);
						setErrorKpiSearch(false);
						setMsgErrorKpiSearch("");
					} else {
						setErrorKpiSearch(true);
						setMsgErrorKpiSearch("Kpi does not exist");
					}
				} else {
					setErrorKpiSearch(true);
					setMsgErrorKpiSearch("Server Error");
				}
			} else {
				setErrorKpiSearch(true);
				setMsgErrorKpiSearch("No data");
			}
		} else {
			if (kpi) {
				const info = await requestWithData("getkpisfrommd", { kpi });
				if (info && info.status === 200) {
					if (info.data.length > 0) {
						const duplicates = await getkpisDuplicates(kpisList, info.data);
						setErrorKpiSearch(false);
						setMsgErrorKpiSearch("");
						setTempKpi("");
						setKpisList(duplicates);
					} else if (typeLoad) {
						setAdd(true);
						setAddMsg(
							"No kpi match in master data, if is a manual kpi, click add, otherwise, modify entered kpi."
						);
						setErrorKpiSearch(false);
						setMsgErrorKpiSearch("");
					} else {
						setErrorKpiSearch(true);
						setMsgErrorKpiSearch("Kpi does not exist");
					}
				} else {
					setErrorKpiSearch(true);
					setMsgErrorKpiSearch("Server Error");
				}
			} else {
				setErrorKpiSearch(true);
				setMsgErrorKpiSearch("No data");
			}
		}
	};

	const handleAdd = (kpi) => {
		if (dataToEdit) {
			if (kpi) {
				const checkData = addHelper(workDataToEdit, kpisList);
				setErrorKpiSearch(false);
				setMsgErrorKpiSearch("");
				setTempKpi("");
				setAdd(false);
				setAddMsg("");
				setKpisList([
					...checkData,
					{
						Kpi: kpi,
						checked: false,
						LoadType: typeLoad,
						CriticalPoint: "",
						Q1: "",
						Q2: "",
						Q3: "",
						Q4: "",
						OrderKpi: "",
						id: 0,
					},
				]);
			}
		} else {
			if (kpi) {
				const checkData = kpisList.filter((kpi) => kpi.checked === true);
				setErrorKpiSearch(false);
				setMsgErrorKpiSearch("");
				setTempKpi("");
				setAdd(false);
				setAddMsg("");
				setKpisList([
					...checkData,
					{
						Kpi: kpi,
						checked: false,
						LoadType: typeLoad,
						CriticalPoint: "",
						Q1: "",
						Q2: "",
						Q3: "",
						Q4: "",
						OrderKpi: "",
						id: 0,
					},
				]);
			}
		}
	};

	const handleCheckOM = (info) => {
		setErrorOMList(false);
		setMsgErrorOMList("");
		let tempList = OMList.map((om) =>
			om.idccms === info.idccms ? { ...om, checked: !om.checked } : om
		);
		setOMList(tempList);
	};

	const handleCheckKpi = (info) => {
		setErrorKpisList(false);
		setMsgErrorKpisList("");
		if (dataToEdit && info.idMD) {
			let tempList = kpisList.map((kpi) =>
				kpi.Kpi === info.Kpi
					? {
							...kpi,
							checked: !kpi.checked,
					  }
					: kpi
			);
			setKpisList(tempList);
		} else {
			let tempList = kpisList.map((kpi) =>
				kpi.Kpi === info.Kpi
					? {
							...kpi,
							checked: !kpi.checked,
					  }
					: kpi
			);
			setKpisList(tempList);
		}
	};

	const handleBlur = async () => {
		const duplicates = await getCampNameDuplicate(dataCampaign, name);
		if (duplicates) {
			setErrorName(true);
			setMsgErrorName("Campaign name already exists");
		}
	};

	const handleNext = (action) => {
		setErrorKpisList(false);
		setMsgErrorKpisList("");
		setErrorOMList(false);
		setMsgErrorOMList("");
		if (action === "Next") {
			const dtw = nextHelper(workDataToEdit, kpisList, OMList);
			if (name) {
				if (dtw.oml.length === 1 && !errorOMList) {
					//setOMList(dtw.oml);
					if (dtw.kpi.length > 0 && !errorKpisList) {
						if (dtw.kpi.length <= 5) {
							setKpisList(dtw.kpi);
							setKpiWork(dtw.kpitw);
							setNext(!next);
						} else {
							setErrorKpisList(true);
							setMsgErrorKpisList("Uncheck KPIs (max. 5)");
						}
					} else {
						setErrorKpisList(true);
						setMsgErrorKpisList("Check KPIs is required (min. 1)");
					}
				} else {
					setErrorOMList(true);
					setMsgErrorOMList("Check Operation Manager is required (only 1)");
				}
			} else {
				setErrorName(true);
				setMsgErrorName("No data");
			}
		} else {
			setNext(!next);
		}
	};

	const handleCreate = () => {
		const dts = createHelper(name, kpisList, OMList);
		if (dts[0] === "Some field in the kpis is empty") {
			notifyModalError(dts[0]);
		} else if (
			dts[0] ===
				"If you select ASC, the targets in each quartile must be greater than the critical point and descending from Q1 to Q4." ||
			dts[0] ===
				"If you select DSC, the targets in each quartile must be less than the critical point and drop from Q4 to Q1."
		) {
			notifyModalError(dts[0]);
		} else {
			createCamp(dts[0], dts[1]);
		}
	};

	const handleUpdate = () => {
		const dts = editHelper(name, kpisList, OMList, workDataToEdit);
		if (dts[0] === "Some field in the kpis is empty") {
			notifyModalError(dts[0]);
		} else if (dts[0] === "You did not edit any field") {
			notifyModalError(dts[0]);
		} else if (
			dts[0] ===
				"If you select ASC, the targets in each quartile must be greater than the critical point and descending from Q1 to Q4." ||
			dts[0] ===
				"If you select DSC, the targets in each quartile must be less than the critical point and drop from Q4 to Q1."
		) {
			notifyModalError(dts[0]);
		} else {
			editCamp(dts[0], dataToEdit, dts[1]);
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
				{dataToEdit ? `Edit Campaign - ${name}` : "Creation Campaign"}
			</Typography>

			{!next ? (
				<Box display="flex">
					<Box width="60%">
						<Typography variant="body1" gutterBottom color="#3047B0">
							Campaign Name
						</Typography>
						<InputText
							error={errorName}
							name="campaignName"
							label="Campaign Name"
							variant="outlined"
							type="text"
							fullWidth
							onChange={(e) => {
								setName(e.target.value);
								setErrorName(false);
								setMsgErrorName("");
							}}
							value={name}
							helperText={errorName && msgErrorName}
							onBlur={handleBlur}
						/>
						<Box marginY={3}>
							<Typography variant="body1" gutterBottom color="#3047B0">
								Assignment Operation Manager
							</Typography>
							<FormControl sx={{ width: "100%" }} variant="outlined">
								<InputLabel
									error={errorOMSearch}
									htmlFor="outlined-adornment-search"
								>
									Search CCMS Id
								</InputLabel>
								<OutlinedInput
									error={errorOMSearch}
									id="outlined-adornment-search"
									type="number"
									value={tempCcms}
									onChange={(e) => {
										setTempCcms(e.target.value);
										setErrorOMSearch(false);
										setMsgErrorOMSearch("");
									}}
									endAdornment={
										<InputAdornment position="end">
											<ButtonActionBlue
												aria-label="toggle search visibility"
												edge="end"
												onClick={() => handleSearchCCMS(tempCcms)}
											>
												Search
											</ButtonActionBlue>
										</InputAdornment>
									}
									label="Search CCMS Id"
								/>
								{errorOMSearch && (
									<FormHelperText error>{msgErrorOMSearch}</FormHelperText>
								)}
							</FormControl>
						</Box>

						<BoxTL
							sx={{
								border: errorOMList ? "1px solid red" : "1px solid #3047B0",
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
										Operation Manager
									</Typography>
								</Box>
								<Box width="10%" />
							</Box>
							<BoxCeldas>
								{loadingOM ? (
									<LoadingComponent />
								) : (
									OMList.map((item, index) => (
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
													id="idccms"
													checked={item.checked}
													onChange={() => handleCheckOM(item)}
												/>
											</Box>
										</TableCont>
									))
								)}
							</BoxCeldas>
						</BoxTL>
						{errorOMList && (
							<FormHelperText error>{msgErrorOMList}</FormHelperText>
						)}
					</Box>
					<Box width="40%" paddingLeft={2}>
						<Box>
							<Typography variant="body1" gutterBottom color="#3047B0">
								Kpi Upload Reporting Lead
							</Typography>
							<label className="check">
								<input
									type="checkbox"
									value={typeLoad}
									checked={typeLoad}
									onChange={() => setTypeLoad(!typeLoad)}
								/>
								<span className="check-1"></span>
							</label>
						</Box>
						<Box marginY={3}>
							<Typography variant="body1" gutterBottom color="#3047B0">
								Assignment Kpi
							</Typography>
							<FormControl sx={{ width: "100%" }} variant="outlined">
								<InputLabel
									htmlFor="outlined-adornment-search"
									error={errorKpiSearch}
								>
									Search Kpi
								</InputLabel>
								<OutlinedInput
									error={errorKpiSearch}
									id="outlined-adornment-search"
									type="text"
									value={tempKpi}
									onChange={(e) => {
										setTempKpi(e.target.value);
										setErrorKpiSearch(false);
										setMsgErrorKpiSearch("");
										setAdd(false);
										setAddMsg("");
									}}
									endAdornment={
										<InputAdornment position="end">
											{add ? (
												<ButtonActionBlue
													aria-label="toggle search visibility"
													edge="end"
													onClick={() => handleAdd(tempKpi)}
												>
													Add
												</ButtonActionBlue>
											) : (
												<ButtonActionBlue
													aria-label="toggle search visibility"
													edge="end"
													onClick={() => handleSearchKpi(tempKpi)}
												>
													Search
												</ButtonActionBlue>
											)}
										</InputAdornment>
									}
									label="Search Kpi"
								/>
								{errorKpiSearch && (
									<FormHelperText error>{msgErrorKpiSearch}</FormHelperText>
								)}
								{add && <FormHelperText>{addMsg}</FormHelperText>}
							</FormControl>
						</Box>
						<BoxTL
							sx={{
								border: errorKpisList ? "1px solid red" : "1px solid #3047B0",
							}}
						>
							<Box display="flex" textAlign="center">
								<Box width="90%" color="#3047B0">
									<Typography variant="body1" fontWeight={700}>
										KPI
									</Typography>
								</Box>

								<Box width="10%" />
							</Box>
							<BoxCeldas>
								{loadingKpi ? (
									<LoadingComponent />
								) : (
									kpisList.map((item, index) => (
										<TableCont display="flex" textAlign="center" key={index}>
											<Box width="90%">
												<Typography variant="body2">{item.Kpi}</Typography>
											</Box>

											<Box width="10%">
												<input
													type="checkbox"
													id="idccms"
													checked={item.checked}
													onChange={() => handleCheckKpi(item)}
												/>
											</Box>
										</TableCont>
									))
								)}
							</BoxCeldas>
						</BoxTL>
						{errorKpisList && (
							<FormHelperText error>{msgErrorKpisList}</FormHelperText>
						)}
					</Box>
				</Box>
			) : (
				<>
					<Typography
						variant="h6"
						textAlign="center"
						color="#3047B0"
						marginY={1}
						fontWeight={700}
					>
						KPI's Set up
					</Typography>
					<BoxHead>
						<Box width="20%">
							<Typography variant="body1" fontWeight={700}>
								KPI
							</Typography>
						</Box>
						<Box width="20%">
							<Typography variant="body1" fontWeight={700}>
								Critical
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								Q1
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								Q2
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								Q3
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								Q4
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								ASC
							</Typography>
						</Box>
						<Box width="10%">
							<Typography variant="body1" fontWeight={700}>
								DSC
							</Typography>
						</Box>
					</BoxHead>
					<ScrollBox height="18rem">
						{kpiWork.map((item, index) => (
							<KpiSetup
								kpi={item}
								kpisList={kpisList}
								setKpisList={setKpisList}
								kpiWork={kpiWork}
								setKpiWork={setKpiWork}
								key={index}
							/>
						))}
					</ScrollBox>
				</>
			)}
			<Box display="flex" justifyContent="flex-end" marginY={3}>
				<ButtonActionBlue
					sx={{ width: "10rem" }}
					onClick={() => (next ? handleNext("Back") : handleNext("Next"))}
				>
					{next ? "Back" : "Next"}
				</ButtonActionBlue>
				{next &&
					(dataToEdit ? (
						<ButtonActionBlue
							sx={{ width: "10rem", marginLeft: "2rem" }}
							onClick={handleUpdate}
						>
							Update
						</ButtonActionBlue>
					) : (
						<ButtonActionBlue
							sx={{ width: "10rem", marginLeft: "2rem" }}
							onClick={handleCreate}
						>
							Create
						</ButtonActionBlue>
					))}
			</Box>
		</Box>
	);
};

export default CreateEditCampaign;
