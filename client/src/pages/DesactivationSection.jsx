import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { MainPage } from "../assets/styled/muistyled";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import TableDesactivation from "../components/Tables/TableDesactivation";
import { requestWithData } from "../utils/api";
import LoadingComponent from "../components/LoadingComponent";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/loginDuck";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ModalLoading } from "../components/ModalLoading";

const MySwal = withReactContent(Swal);
const dateConfig = (date) => {
	let fecha;
	let hora;
	let fechaBase = new Date(date).toLocaleString([], {
		timeZone: "Etc/UTC",
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	let now = new Date().toLocaleString([], {
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	let fa = new Date(
		`${now.split("/")[1]}/${now.split("/")[0]}/${now.split("/")[2]}`
	);
	let fb = new Date(
		`${fechaBase.split("/")[1]}/${fechaBase.split("/")[0]}/${
			fechaBase.split("/")[2]
		}`
	);
	if (
		now.replace(",", "").split(" ")[0] ===
		fechaBase.replace(",", "").split(" ")[0]
	) {
		hora = Math.trunc((fa - fb) / 60000);
		if (hora < 31) {
			fecha = `${hora} minutes ago`;
		} else {
			fecha = `Today at ${fechaBase.replace(",", "").split(" ")[1]}`;
		}
	} else {
		fecha = fechaBase.replace(",", "").split(" ")[0];
	}

	return fecha;
};
const DesactivationSection = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fullLoading, setFullLoading] = useState(false);
	const [noData, setNoData] = useState(false);

	const getData = async () => {
		setLoading(true);
		const usersList = await requestWithData("getinactiveusersapplications");
		if (usersList && usersList.status === 200 && usersList.data.length > 0) {
			if (usersList.data[0].Agent !== "0" && usersList.data[0].ident !== "0") {
				//falta tratar la fecha antes de settear la variable
				const uwd = usersList.data.map((user) => {
					const fecha = dateConfig(user.dateRequest);
					user.dateRequest = fecha;
					return user;
				});
				console.log(uwd);
				setLoading(false);
				setUsers(uwd);
			} else {
				setLoading(false);
				setNoData(true);
			}
		} else if (usersList && usersList.data === "UnauthorizedError") {
			dispatch(logoutAction());
			navigate("/");
		} else {
			setLoading(false);
			setError(true);
		}
	};

	useEffect(
		() => {
			getData();
		},
		// eslint-disable-next-line
		[]
	);
	/* Agent: "Diego Tapias Pinzon"
UsrRequest: "Matilde Puentes Gutierrez"
dateRequest: "2022-07-27T09:30:12.420Z"
ident: 4462685
identUsrRequest: 4492826
usrAuthorization: "Daniel Moreno Salas"
usrDenied: null */
	const handleAction = async (idccms, context) => {
		setFullLoading(true);
		const sendResponse = await requestWithData("postinactivateuser", {
			idccmsUser: idccms,
			inactivate: context === "approved" ? 1 : 0,
			idccmsReq: 4468566,
		});
		if (sendResponse && sendResponse.status === 200) {
			if (context === "approved") {
				setFullLoading(false);
				MySwal.fire({
					title: (
						<p>{context === 2 ? "Saved!" : "User Disabled successfully!"}</p>
					),
					icon: "success",
					confirmButtonText: "Accept",
					allowOutsideClick: false,
				}).then((resultado) => {
					if (resultado.value) {
						getData();
					}
				});
			} else {
				setFullLoading(false);
				MySwal.fire({
					title: (
						<p>{context === 2 ? "Saved!" : "Request successfully rejected!"}</p>
					),
					icon: "success",
					confirmButtonText: "Accept",
					allowOutsideClick: false,
				}).then((resultado) => {
					if (resultado.value) {
						getData();
					}
				});
			}
		} else {
			setFullLoading(false);
			MySwal.fire({
				title: <p>Send Error!</p>,
				icon: "error",
				confirmButtonText: "Accept",
				allowOutsideClick: false,
			}).then((resultado) => {
				if (resultado.value) {
					getData();
				}
			});
		}
	};
	return (
		<>
			{fullLoading && <ModalLoading />}
			<MainPage>
				<Grid>
					<Header />
					<Typography variant="h5" fontWeight="500">
						Deactivation Request
					</Typography>
				</Grid>
				<Grid container>
					<Grid item xs={12} lg={9}>
						{error ? (
							<Typography variant="body1">Server Problems</Typography>
						) : noData ? (
							<Typography variant="h5" textAlign="center">
								No Requests Pending
							</Typography>
						) : loading ? (
							<LoadingComponent />
						) : (
							<TableDesactivation
								dataAgent={users}
								handleAction={handleAction}
							/>
						)}
					</Grid>
				</Grid>
				<Footer />
			</MainPage>
		</>
	);
};

export default DesactivationSection;
