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
import { getInfoAgent, getLobs, requestWithData } from "../../utils/api";

import {
	createTeamLeaderList,
	filterTeamLeaderList,
	getLobNameDuplicate,
	getTLDuplicates,
	filterLobList,
	dataLobsToSend,
	editLobsToSend,
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

const DeactivateTL = ({
	setOpen,
	dataLOB,
	userData,
	getData,
	modalLoading,
	setModalLoading,
	tlToDel,
}) => {
	const [dataTL, setDataTL] = useState([]);
	const [nameLOB, setNameLOB] = useState("");
	//const [disabled, setDisabled] = useState(false);
	const [tlListDel, setTlListDel] = useState([]);
	const [disabled, setDisabled] = useState(false);
	const [allData, setAllData] = useState([]);

	useEffect(
		() => {
			const getData = async () => {
				const allLobs = await getLobs(1, 1032);
				const tls = await getLobs(2, dataLOB.idLob);
				if (tls && tls.status === 200 && tls.data.length > 0) {
					const TLList = await filterTeamLeaderList(tls.data);
					const TLDelList = TLList.filter((tl) => tl.idccms === tlToDel.ident); //ccmsid del que se va eliminar
					//interseccion
					const delList = TLDelList.filter((item1) =>
						allLobs.data.some((item2) => item1.idccms === item2.identTL)
					);
					if (delList.length === 0) {
						setOpen(false);
						setDisabled(false);
						MySwal.fire({
							title: (
								<p>{`It looks like this team leader has already been managed, do you want to remove it from the list?`}</p>
							),
							icon: "info",
							showDenyButton: true,
							confirmButtonText: "Accept",
							allowOutsideClick: false,
						}).then((result) => {
							if (result.isConfirmed) {
								deleteList();
							}
						});
					} else {
						setDisabled(false);
						setModalLoading(false);
						setTlListDel([{ ...delList[0], checked: false }]);
						setAllData(allLobs.data);
						setDataTL(TLList);
						setNameLOB(tls.data[0].NameLob);
					}
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
					setOpen(false);
					setDisabled(false);
				}
			};

			if (dataLOB.length !== 0) {
				getData();
			}
		},
		// eslint-disable-next-line
		[]
	);

	const deleteList = async () => {
		const sendResponse = await requestWithData("postinactivateuser", {
			idccmsUser: tlToDel.ident,
			name: userData.Nombre,
			role: "Operations Commander",
			nameUser: tlToDel.Agent,
			roleUser: "Pilot",
			emailRequester: tlToDel.emailUsrRequest,
			inactivate: 1,
			idccmsReq: tlToDel.identUsrRequest,
		});
		if (sendResponse.status === 200) {
			getData();
			setOpen(false);
			setDisabled(false);
		} else {
			getData();
			setOpen(false);
			setDisabled(false);
			MySwal.fire({
				title: <p>Houston We Have a Problem!</p>,
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

	const handleEdit = async () => {
		setDisabled(true);
		if (
			tlListDel[0].action === "" ||
			(tlListDel[0].action !== "Delete" &&
				tlListDel[0].redistribute.length === 0 &&
				tlListDel[0].replacement.length === 0)
		) {
			notifyModalError("You must select an action for the pilot");
			setDisabled(false);
		} else {
			const tlsLob = allData.filter((tl) => tl.idLob === dataTL[0].idLob);
			const valtledit = dataTL.filter(
				(item1) => !tlsLob.some((item2) => item1.idccms === item2.identTL)
			);
			const tls = dataToSendTLEdit(
				valtledit,
				tlListDel,
				nameLOB,
				dataTL[0].idLob
			);
			const editDataLob = await requestWithData("postcreatelob", tls);
			if (editDataLob.status === 200) {
				const sendResponse = await requestWithData("postinactivateuser", {
					idccmsUser: tlToDel.ident,
					name: userData.Nombre,
					role: "Operations Commander",
					nameUser: tlToDel.Agent,
					roleUser: "Pilot",
					emailRequester: tlToDel.emailUsrRequest,
					inactivate: 1,
					idccmsReq: tlToDel.identUsrRequest,
				});
				if (sendResponse.status === 200) {
					getData();
					setOpen(false);
					setDisabled(false);
				} else {
					getData();
					setOpen(false);
					setDisabled(false);
					MySwal.fire({
						title: <p>Houston We Have a Problem!</p>,
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
				setOpen(false);
				setDisabled(false);
				MySwal.fire({
					title: <p> Houston We Have a Problem!</p>,
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
				{"Delete Pilots"}
			</Typography>
			{modalLoading ? (
				<LoadingComponent />
			) : (
				<DeleteTL
					tlListDel={tlListDel}
					setTlListDel={setTlListDel}
					allData={allData}
					dataTL={dataTL}
				/>
			)}
			<Box display="flex" justifyContent="flex-end" marginY={3}>
				{disabled ? (
					<LoadingComponent />
				) : (
					<ButtonActionBlue
						sx={{ width: "10rem", marginLeft: "2rem" }}
						disabled={disabled}
						onClick={handleEdit}
					>
						Delete Pilot
					</ButtonActionBlue>
				)}
			</Box>
		</Box>
	);
};

export default DeactivateTL;
