import React from "react";
//import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Box, styled } from "@mui/system";
import XLSX from "xlsx";
import { createTeamSuperUser } from "../../utils/api";
import {
	validateFieldsCreateTeams,
	validateHeadersCreateTeam,
} from "../../helpers/helpers";

const MySwal = withReactContent(Swal);

const BoxUpCount = styled(Box)(({ theme }) => ({
	height: "21.875rem",
	maxWidth: "20rem",
	boxShadow: "1px 1px 5px #A2A2A2",
	borderRadius: "10px",
	background: "#F9F9F9 0% 0% no-repeat padding-box",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	alignItems: "center",
	input: {
		display: "none",
	},
	label: {
		height: "140px",
		width: "140px",
		borderTop: "8px solid #0087FF",
		borderRight: "8px solid #0087FF",
		borderBottom: "5px dashed #0087FF",
		borderLeft: "3px dashed #0087FF",
		borderRadius: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		transform: "rotate(45deg)",
		cursor: "pointer",
		svg: {
			color: "#3047B0",
			transform: "rotate(-45deg)",
		},
	},
}));
export const UploadCount = ({ setLoading }) => {
	//Funcion para  validar campos Archivo .csv
	const loadFile = (e) => {
		setLoading(true);
		const fileCSV = e.target.files[0];

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				//Parse data
				const ab = e.target.result;
				const wb = XLSX.read(ab, { type: "array" });
				//Get first worksheet
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				//Convert array of arrays
				//const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
				const data = XLSX.utils
					.sheet_to_json(ws, { header: 1 })
					.map((colum) => {
						return [
							colum[0],
							colum[1]?.toString(),
							colum[2]?.toString(),
							colum[3],
							colum[4],
							colum[5],
							colum[6],
							colum[7],
							colum[8]?.toString(),
							colum[9],
						];
					});

				if (data.length > 1) {
					let differentsHeaders = validateHeadersCreateTeam(data[0]);

					if (differentsHeaders) {
						reject(" Wrong Headers!");
						return;
					}

					data.shift();
					let incorrectValues = validateFieldsCreateTeams(data);

					if (incorrectValues) {
						reject(" Wrong values!");
						return;
					}
					resolve(data);
				} else {
					reject("No data!");
				}
				//Update state
			};
			reader.readAsArrayBuffer(fileCSV);
		});
	};

	const uploadFile = async (e) => {
		const fileCSV = e.target.files[0];
		let data;
		if (
			fileCSV === undefined ||
			(fileCSV.type !== "text/csv" &&
				fileCSV.type !== "application/vnd.ms-excel")
		) {
			setLoading(false);
			MySwal.fire({
				title: <p>Only files in .csv format</p>,
				icon: "error",
			});
		} else {
			try {
				data = await loadFile(e);
				e.target.value = null;
			} catch (error) {
				setLoading(false);
				MySwal.fire({
					title: <p> {error} </p>,
					icon: "error",
				});
				e.target.value = null;
				return;
			}

			//setData(data);
			const resp = await createTeamSuperUser(data);

			if (resp.status === 200) {
				setLoading(false);
				MySwal.fire({
					title: <p>File upload</p>,
					icon: "success",
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
	return (
		<BoxUpCount>
			<label htmlFor="quiz">
				<AiOutlineFileAdd size={44} />
			</label>
			<input
				type="file"
				id="quiz"
				name="quiz"
				onChange={(e) => uploadFile(e)}
			/>
		</BoxUpCount>
	);
};
