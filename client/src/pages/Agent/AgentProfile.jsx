import React, { useEffect, useState } from "react";
import { MainPage } from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { Grid, styled, Typography } from "@mui/material";
import ProfileSection from "../../components/Profile/ProfileSection";
import TPVSection from "../../components/Profile/TPVSection";
import BadgesSection from "../../components/Profile/BadgesSection";
import { downloadProfile } from "../../utils/api.js";
import LoadingComponent from "../../components/LoadingComponent";

const BoxSection = styled(Grid)(() => ({
	background: "#f9f9f9",
	minHeight: "70vh",
	borderRadius: "10px",
}));

const AgentProfile = ({ profile }) => {
	const [tpvs, setTpvs] = useState([]);
	const [badges, setBadges] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			const userData = await downloadProfile();
			if (userData && userData.status === 200 && userData.data.length > 1) {
				setLoading(false);
				setTpvs(userData.data[1].Tpv);
				setBadges(userData.data[2].Badges);
			} else {
				//  setError(true);
			}
		};

		getData();
		// eslint-disable-next-line
	}, []);
	return (
		<MainPage>
			<Header />
			<Grid container spacing={3} marginTop={2}>
				<Typography variant="h1" color="initial"></Typography>
				<Grid item xs={12} md={4}>
					<BoxSection>
						{!loading ? (
							<ProfileSection profile={profile} />
						) : (
							<LoadingComponent />
						)}
					</BoxSection>
				</Grid>
				<Grid item xs={12} md={4}>
					<BoxSection>
						{!loading ? <TPVSection tpvs={tpvs} /> : <LoadingComponent />}
					</BoxSection>
				</Grid>
				<Grid item xs={12} md={4}>
					<BoxSection>
						{!loading ? (
							<BadgesSection badges={badges} />
						) : (
							<LoadingComponent />
						)}
					</BoxSection>
				</Grid>
			</Grid>
			<Footer />
		</MainPage>
	);
};

export default AgentProfile;
