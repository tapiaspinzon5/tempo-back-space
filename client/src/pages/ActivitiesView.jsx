import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	Typography,
	Grid,
	styled,
	Button,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import Footer from "../components/Footer";
import { loadUserActivities } from "../utils/api";
import ActivitiesViewComponent from "../components/Agents/activitiesview/ActivitiesViewComponent";
import CardActivityManage from "../components/Quizes/CardActivityManage";
import img1 from "../assets/temp-image/Enmascarargrupo2039.png";
import img2 from "../assets/temp-image/Enmascarargrupo2040.png";
import img3 from "../assets/temp-image/Enmascarargrupo2044.png";
import img4 from "../assets/temp-image/Enmascarargrupo2046.png";
import LoadingComponent from "../components/LoadingComponent";
import { logoutAction } from "../redux/loginDuck";
import {
	activitiesFilter,
	challengesFilter,
	quizByCategory,
	quizCategories,
	quizFilter,
} from "../helpers/helpers";
import CategoryCard from "../components/Quizes/CategoryCard";
import SliderQuizCategory from "../components/Quizes/SliderQuizCategory";

const MainViewver = styled(Grid)(({ theme }) => ({
	position: "relative",
	overflow: "hidden",
	minHeight: "90vh",
	width: "100%",
	padding: "0 2rem 2rem",
	[theme.breakpoints.down("md")]: {
		top: "15px",
	},
}));

const BoxSelectBadge = styled(Grid)(() => ({
	button: {
		textTransform: "none",
		background: "#fff",
		margin: "5px",
		width: "9rem",
		fontWeight: "600",
		border: "1px solid #00000009",
	},
	margin: "2rem 0",
}));

const selectButton = {
	boxShadow: "0px 3px 6px #00000029",
	borderRadius: "10px",
	textTransform: "none",
};
const BoxFormControl = styled(FormControl)(() => ({
	width: "8rem",
	margin: "2rem 0 0 2rem",
}));

const images = [img1, img2, img3, img4];

const ActivitiesView = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [quizUser, setQuizUser] = useState([]);
	const [actualQuizUser, setActualQuizUser] = useState([]);
	const [userActivities, setUserActivities] = useState([]);
	const [actualUserActivities, setActualUserActivities] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filter, setFilter] = useState("All");
	const [noData, setNoData] = useState("");
	const [mousePos, setMousePos] = useState(0);
	const [categories, setCategories] = useState([]);
	const [actualCategories, setActualCategories] = useState([]);
	const [activities, setActivities] = useState({
		type: "Quizes",
		context: 3,
	});

	/* useEffect(() => {
		setLoading(true);
		const context = activities.context;
		setNoData("");
		const getData = async () => {
			const quizes = await loadUserActivities( context);
			if (quizes && quizes.status === 200 && quizes.data.Quices.length > 0) {
				if (quizes.data.Quices) {
					setQuizUser(quizes.data.Quices);
					setActualQuizUser(quizes.data.Quices);
				}
				setLoading(false);
			} else if (quizes.data === "UnauthorizedError") {
				dispatch(logoutAction());
				navigate("/");
			}
		};
		getData();
		// eslint-disable-next-line
	}, []); */

	useEffect(() => {
		setUserActivities([]);
		setLoading(true);
		setFilter("All");
		const context = activities.context;
		const getData = async () => {
			setNoData("");
			if (context === 3) {
				const quizes = await loadUserActivities(context);
				if (quizes && quizes.status === 200 && quizes.data.Quices.length > 0) {
					const cat = await quizCategories(quizes.data.Quices);
					if (quizes.data.Quices[0].Quiz !== "0" && cat) {
						setCategories(cat);
						setActualCategories(cat);
						setQuizUser(quizes.data.Quices);
						setActualQuizUser(quizes.data.Quices);
					}
					if (quizes.data.length < 1) {
						setNoData("No assigned " + activities.type);
					}
				} else if (quizes.data === "UnauthorizedError") {
					dispatch(logoutAction());
					navigate("/");
				} else {
					setNoData("The Game Starts Soon");
				}
			} else {
				const getActivities = await loadUserActivities(context);
				if (getActivities && getActivities.status === 200) {
					setUserActivities(getActivities.data.Activities);
					setActualUserActivities(getActivities.data.Activities);
					if (getActivities.data.length < 1) {
						setNoData("No assigned " + activities.type);
					}
				} else if (getActivities.data === "UnauthorizedError") {
					dispatch(logoutAction());
					navigate("/");
				} else {
					setNoData("The Game Starts Soon");
				}
			}
			setLoading(false);
		};

		getData();

		// eslint-disable-next-line
	}, [activities]);

	useEffect(() => {
		const mousePosition = (e) => {
			setMousePos((e.clientX / window.screen.width) * 100);
		};
		window.addEventListener("mousemove", mousePosition);
		return () => {
			window.removeEventListener("mousemove", mousePosition);
		};
	}, []);

	const handleStatus = async (e) => {
		let statusfilter = e.target.value;
		setFilter(statusfilter);
		setLoading(true);
		if (statusfilter !== "All") {
			if (activities.type === "Quizes") {
				setNoData("");
				//const newData = await quizByCategory(actualQuizUser, statusfilter);
				const newOrder = await quizFilter(actualQuizUser, statusfilter);
				if (newOrder.quices.length > 0) {
					setCategories(newOrder.categories);
					setQuizUser(newOrder.quices);
					setLoading(false);
				} else {
					setNoData("No Quices " + statusfilter.split("-")[0]);
					setLoading(false);
				}
			} else if (activities.type === "Challenges") {
				setNoData("");
				const newOrder = await challengesFilter(
					actualUserActivities,
					statusfilter
				);
				if (newOrder.length > 0) {
					setUserActivities(newOrder);
					setLoading(false);
				} else {
					setNoData("No Challenges " + statusfilter.split("-")[0]);
					setLoading(false);
				}
			} else {
				setNoData("");
				const newOrder = await activitiesFilter(
					actualUserActivities,
					statusfilter
				);
				if (newOrder.length > 0) {
					setUserActivities(newOrder);
					setLoading(false);
				} else {
					setNoData("No Activities " + statusfilter.split("-")[0]);
					setLoading(false);
				}
			}
		} else if (activities.type === "Quizes") {
			setNoData("");
			setCategories(actualCategories);
			setQuizUser(actualQuizUser);
			setLoading(false);
		} else {
			setNoData("");
			setUserActivities(actualUserActivities);
			setLoading(false);
		}
	};

	return (
		<Grid width="100%">
			<MainViewver>
				<Grid container>
					<BoxSelectBadge item xs={6}>
						<Button
							sx={activities.type === "Quizes" && selectButton}
							onClick={() =>
								setActivities({ type: "Quizes", context: 3, menu: true })
							}
						>
							Missions
						</Button>
						<Button
							sx={activities.type === "Challenges" && selectButton}
							onClick={() =>
								setActivities({ type: "Challenges", context: 2, menu: true })
							}
						>
							{" "}
							Challenges{" "}
						</Button>

						<Button
							sx={activities.type === "Activities" && selectButton}
							onClick={() =>
								setActivities({ type: "Activities", context: 1, menu: true })
							}
						>
							{" "}
							Activities
						</Button>
					</BoxSelectBadge>
					<Box
						item
						xs={6}
						sx={{ display: "flex", width: "50%", justifyContent: "flex-end" }}
					>
						<BoxFormControl>
							<InputLabel id="time-label">Status View</InputLabel>
							<Select
								labelId="time-label"
								value={filter}
								label="Time View"
								onChange={handleStatus}
							>
								<MenuItem value="All">All</MenuItem>
								{activities.type === "Challenges" && (
									<MenuItem value="assign-0">Assign</MenuItem>
								)}
								{activities.type === "Quizes" && (
									<MenuItem value="Start-4">Start</MenuItem>
								)}
								{activities.type === "Quizes" && (
									<MenuItem value="Approved-4">Approved</MenuItem>
								)}
								{(activities.type === "Activities" ||
									activities.type === "Challenges") && (
									<MenuItem value="Complete-2">Complete</MenuItem>
								)}
								{(activities.type === "Quizes" ||
									activities.type === "Challenges") && (
									<MenuItem value="Failed-3">Failed</MenuItem>
								)}
								{activities.type === "Challenges" && (
									<MenuItem value="In progress-1">In Progress</MenuItem>
								)}
								{activities.type === "Activities" && (
									<MenuItem value="Getting started">Getting started</MenuItem>
								)}
								{activities.type === "Activities" && (
									<MenuItem value="Getting stronger">Getting stronger</MenuItem>
								)}
								{activities.type === "Activities" && (
									<MenuItem value="Battle">Battle</MenuItem>
								)}
								{activities.type === "Activities" && (
									<MenuItem value="Developing skills">
										Developing skills
									</MenuItem>
								)}
								{activities.type === "Activities" && (
									<MenuItem value="Being Awarded">Being Awarded </MenuItem>
								)}
							</Select>
						</BoxFormControl>
					</Box>
				</Grid>

				{loading ? (
					<LoadingComponent theme={activities.type} />
				) : (
					<>
						{noData && (
							<Typography variant="h5" sx={{ color: "#3047B0" }}>
								{" "}
								{noData}
							</Typography>
						)}
						<Grid container spacing={3}>
							{!noData &&
								activities.type !== "Quizes" &&
								userActivities?.map((activity, index) => (
									<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
										<ActivitiesViewComponent
											activity={activity}
											type={activities.type}
											images={images}
											mousePos={mousePos}
										/>
									</Grid>
								))}
						</Grid>
						{!noData && activities.type === "Quizes" && (
							<Box mt={3}>
								<Grid>
									{quizUser.length > 0 ? (
										activities.type === "Quizes" &&
										categories.map((cat, index) => (
											<Grid sx={{ mt: 3 }}>
												<Typography
													variant="h5"
													sx={{ color: "#3047B0" }}
													key={index + 20}
												>
													{cat}
												</Typography>
												<Box
													display="flex"
													flexDirection="column"
													alignItems="center"
												>
													<SliderQuizCategory
														key={index + 7}
														quizUser={quizUser}
														category={cat}
													/>
												</Box>
											</Grid>
										))
									) : (
										<Typography variant="h6" sx={{ color: "#3047B0", mt: 3 }}>
											You don´ t have Quices assingned
										</Typography>
									)}
								</Grid>
							</Box>
						)}
					</>
				)}
			</MainViewver>
			<Footer />
		</Grid>
	);
};

export default ActivitiesView;
