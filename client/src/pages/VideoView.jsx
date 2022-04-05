import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, Button, styled, Box } from "@mui/material";
import { VideoIntro } from "../components/VideoIntro";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { welcomeToEGP } from "../utils/api";

const MainHomevideo = styled(Grid)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	height: "95vh",
	width: "100%",
	justifyContent: "center",
	alignItems: "center",
	marginTop: "30px",
}));

export const VideoView = () => {
	const userData = useSelector((store) => store.loginUser.userData);
	const idccms = userData.Idccms;
	const [next, setNext] = useState(true);
	const theme = useTheme();
	const navigate = useNavigate();
	const handleView = async () => {
		let data = JSON.parse(sessionStorage.getItem("userTP"));
		const videoOk = () => {
			data.NumberLogins = 2;
			sessionStorage.setItem("userTP", JSON.stringify(data));
			welcomeToEGP(idccms);
		};
		await videoOk();
		switch (userData.Role) {
			case "Agent":
				await navigate(`/homeusers`);
				break;
			case "Team Leader":
				await navigate(`/hometl`);
				break;
			case "QA Lead":
				await navigate(`/homeqal`);
				break;
			case "Operation Manager":
				await navigate(`/homeom`);
				break;
			case "Super Admin":
				await navigate(`/homesa`);
				break;
			case "Reporting Lead":
				await navigate(`/homerl`);
				break;
			default:
				break;
		}
		await window.location.reload();
	};
	return (
		<MainHomevideo>
			<VideoIntro setNext={setNext} rol={userData.Role} />
			<Box
				sx={{
					margin: "015px 0 15px",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Button
					onClick={handleView}
					disabled={next}
					sx={{
						background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
						color: "#FFFFFF",
						width: "160px",
						borderRadius: "10px",
					}}
				>
					Continue
				</Button>
			</Box>
		</MainHomevideo>
	);
};
