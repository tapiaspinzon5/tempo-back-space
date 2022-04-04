import React from "react";
//import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Box, styled } from "@mui/system";
import XLSX from "xlsx";
import { validateFields, validateHeaders } from "../../helpers/helpers";
import { uploadQuizes } from "../../utils/api";

const MySwal = withReactContent(Swal);

const BoxUpQuiz = styled(Box)(({ theme }) => ({
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

const UploadQuiz = ({ idccms, setLoading }) => {
	// const userData = useSelector((store) => store.loginUser.userData);
	// const [data, setData] = React.useState([]);
	// const idccms = userData.idccms;

	const loadFile = (e) => {
		setLoading(true);
		const fileQuiz = e.target.files[0];

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				/* Parse data */
				const ab = e.target.result;
				const wb = XLSX.read(ab, { type: "array" });
				/* Get first worksheet */
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				//const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
				const data = XLSX.utils
					.sheet_to_json(ws, { header: 1 })
					.map((colum) => {
						return [
							colum[0]?.toString(),
							colum[1]?.toString(),
							colum[2]?.toString(),
							colum[3]?.toString(),
							colum[4]?.toString(),
							colum[5]?.toString(),
							colum[6]?.toString(),
							colum[7]?.toString(),
							colum[8]?.toString(),
							colum[9],
							colum[10]?.toString(),
							colum[11]?.toString(),
						];
					});

				if (data.length > 1) {
					let differentsHeaders = validateHeaders(data[0]);

					if (differentsHeaders) {
						reject(" Wrong Headers!");
						return;
					}

					data.shift();
					let incorrectValues = validateFields(data);

					if (incorrectValues) {
						reject(" Wrong values!");
						return;
					}
					resolve(data);
				} else {
					reject("No data!");
				}
				/* Update state */
			};
			reader.readAsArrayBuffer(fileQuiz);
		});
	};

	const uploadFile = async (e) => {
		const fileQuiz = e.target.files[0];
		let data = [];

		if (
			fileQuiz === undefined ||
			(fileQuiz.type !== "text/csv" &&
				fileQuiz.type !== "application/vnd.ms-excel")
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
			const resp = await uploadQuizes({ data }, idccms);

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
		<BoxUpQuiz>
			<label htmlFor="quiz">
				<AiOutlineFileAdd size={44} />
			</label>
			<input
				type="file"
				id="quiz"
				name="quiz"
				onChange={(e) => uploadFile(e)}
			/>
		</BoxUpQuiz>
	);
};

export default UploadQuiz;
