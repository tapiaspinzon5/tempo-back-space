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
import { ButtonActionBlue, InputText } from "../../assets/styled/muistyled";
import {
	createLobOperationManager,
	getInfoAgent,
	getLobs,
} from "../../utils/api";

import {
	createTeamLeaderList,
	filterTeamLeaderList,
	getTLDuplicates,
} from "../../helpers/helpers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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

const CreateEditLOB = ({ allData, setOpen, dataLOB }) => {
	const [dataTL, setDataTL] = useState([]);
	const [nameLOB, setNameLOB] = useState("");
	const [error, setError] = useState(false);
	const [msgError, setMsgError] = useState("");
	const [errorList, setErrorList] = useState(false);
	const [msgErrorList, setMsgErrorList] = useState("");
	const [errorccms, setErrorccms] = useState(false);
	const [msgErrorccms, setMsgErrorccms] = useState("");
	const [tempCcms, setTempCcms] = useState("");

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
			if (info && info.status === 200 && info.data.length > 0) {
				const duplicates = await getTLDuplicates(allData, dataTL, info.data[0]);
				if (dataTL.length === 0 && !duplicates) {
					setErrorList(false);
					setMsgErrorList("");
					setDataTL([
						...dataTL,
						{
							name: info.data[0].FullName,
							idccms: info.data[0].ident,
							checked: false,
						},
					]);
					setTempCcms("");
				} else if (duplicates) {
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
						},
					]);
					setTempCcms("");
				}
			} else {
				setErrorccms(true);
				setMsgErrorccms("CCMS not exist");
			}
		} else {
			setErrorccms(true);
			setMsgErrorccms("No data");
		}
	};

	const handleCheck = (info) => {
		let tempList = dataTL.map((tl) =>
			tl.idccms === info.idccms ? { ...tl, checked: !tl.checked } : tl
		);
		setDataTL(tempList);
	};

	const submit = async (context, idLob) => {
		const dataToSend = await createTeamLeaderList(dataTL, nameLOB);
		const data = await createLobOperationManager(
			context,
			dataToSend.lobName,
			idLob, /// id lob seleccionada
			dataToSend.tlIdccms
		);
		if (data && data.status === 200) {
			return "ok";
		} else {
			return "Jodido";
		}
	};

	const handleCreate = async () => {
		if (nameLOB) {
			if (dataTL.length > 0) {
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
						const res = submit(1, 0);
						if (res === "ok") {
							MySwal.fire({
								title: <p>Created LOB successfully!</p>,
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
					} else if (result.isDenied) {
						Swal.fire("Changes are not saved", "", "info");
					}
				});
			} else {
				setErrorList(true);
				setMsgErrorList("No data");
			}
		} else {
			setError(true);
			setMsgError("No data");
		}
	};

	const handleEdit = async () => {
		if (nameLOB) {
			if (dataTL.length > 0) {
				setOpen(false);
				MySwal.fire({
					title: <p>{`Are you sure you want edit the LOB as ${nameLOB}?`}</p>,
					icon: "info",
					showDenyButton: true,
					confirmButtonText: "Accept",
					allowOutsideClick: false,
				}).then((result) => {
					if (result.isConfirmed) {
						const res = submit(2, dataLOB.idLob);
						if (res === "ok") {
							MySwal.fire({
								title: <p>Saved!</p>,
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
					} else if (result.isDenied) {
						Swal.fire("Changes are not saved", "", "info");
					}
				});
			} else {
				setErrorList(true);
				setMsgErrorList("No data");
			}
		} else {
			setError(true);
			setMsgError("No data");
		}
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
				{dataLOB.length !== 0 ? "Edit LOB - Name LOB" : "Creation LOB"}
			</Typography>
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
			/>
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
					{errorccms && <FormHelperText error>{msgErrorccms}</FormHelperText>}
				</FormControl>
			</Box>

			{dataLOB.length !== 0 ? (
				<Typography variant="body1" gutterBottom color="#3047B0">
					Edit Team Leader Assignment
				</Typography>
			) : (
				<Typography variant="body1" gutterBottom color="#3047B0">
					Team Leader List
				</Typography>
			)}
			<BoxTL sx={{ border: errorList ? "1px solid red" : "1px solid #3047B0" }}>
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
			{errorList && <FormHelperText error>{msgErrorList}</FormHelperText>}
			<Box display="flex" justifyContent="flex-end" marginY={3}>
				<ButtonActionBlue
					onClick={dataLOB.length !== 0 ? handleEdit : handleCreate}
				>
					Save
				</ButtonActionBlue>
			</Box>
		</Box>
	);
};

export default CreateEditLOB;
