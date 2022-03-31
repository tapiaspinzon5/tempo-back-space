import React from "react";
import { Grid } from "@mui/material";
import CardActivityManage from "./CardActivityManage";

const CategoryCard = ({ quizUser, category }) => {
	return (
		<>
			{quizUser.map((quiz) =>
				quiz.Topic === category ? (
					<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={quiz.IdExamen}>
						<CardActivityManage quiz={quiz} progress={20} />
					</Grid>
				) : (
					""
				)
			)}
		</>
	);
};

export default CategoryCard;
