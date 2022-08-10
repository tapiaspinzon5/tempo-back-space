import React, { useRef, useEffect } from "react";
import useClickOutside from "../Hooks/useClickOutside";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	Typography,
	Box,
	styled,
	Avatar,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Modal,
} from "@mui/material";
import { FiPower } from "react-icons/fi";
import { logoutAction } from "../redux/loginDuck";
import avatarLocal from "../assets/temp-image/avatar.png";
import { useSelector } from "react-redux";

const BoxVinetas = styled(Box)(({ theme }) => ({
	width: "20rem",
	background: "#f8f8f8",
	minHeight: "12rem",
	marginTop: "1rem",
	borderRadius: "10px",
	position: "fixed",
	zIndex: 10000,
	left: "6.5rem",
	padding: "2rem",
	boxShadow: "0px 0px 5px #00000029",
	color: "#3047B0",
}));

const OptionsProfile = ({ setSeeProfile, profile, navLong, setHelpCenter }) => {
	const ref = useRef();
	const userData = useSelector((store) => store.loginUser.userData.Role);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logOut = () => {
		dispatch(logoutAction());
		navigate("/");
	};

	//clickoutside
	useClickOutside(ref, () => {
		setSeeProfile(false);
	});

	const omSuicide = () => {
		navigate("/permissionrelease");
	};

	return (
		<BoxVinetas
			ref={ref}
			onClick={() => {
				setSeeProfile(false);
			}}
			sx={navLong ? { left: "13rem" } : { left: "6.5rem" }}
		>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box>
					<Typography variant="h6">{profile?.Nombre}</Typography>
					<Typography variant="body1">{profile?.Role}</Typography>
				</Box>
				<Avatar
					alt="Remy Sharp"
					src={profile?.AvatarProfile || avatarLocal}
					sx={{ width: 75, height: 75 }}
				/>
			</Box>
			<Box sx={{ width: "100%", maxWidth: 360 }}>
				<nav aria-label="secondary mailbox folders">
					<List>
						{(userData === "Agent" || userData === "Team Leader") && (
							<>
								<ListItem disablePadding>
									<ListItemButton
										component="a"
										href="#/profile"
										sx={{ paddingLeft: 0 }}
									>
										<ListItemText primary="Profile" />
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton
										component="button"
										onClick={() => setHelpCenter(true)}
										sx={{ paddingLeft: 0 }}
									>
										<ListItemText primary="Help Center" />
									</ListItemButton>
								</ListItem>
							</>
						)}
						{userData === "Operation Manager" && (
							<>
								<ListItem disablePadding>
									<ListItemButton
										component="button"
										onClick={omSuicide}
										sx={{ paddingLeft: 0 }}
									>
										<ListItemText primary="Permission Release" />
									</ListItemButton>
								</ListItem>
							</>
						)}
						<ListItem disablePadding>
							<ListItemButton sx={{ paddingLeft: 0 }} onClick={logOut}>
								<ListItemIcon>
									<FiPower color="#3047B0" size={25} />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</ListItem>
					</List>
				</nav>
			</Box>
		</BoxVinetas>
	);
};

export default OptionsProfile;
