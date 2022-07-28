import React from "react";
import { Grid, Typography } from "@mui/material";

import { MainPage } from "../assets/styled/muistyled";
import Header from "../components/homeUser/Header";
import TableDesactivation from "../components/Tables/TableDesactivation";

const dataAgent = [
	{ Agent: "Deiby Niño", Ident: "4472074", Date: "13/06/2022", Estado: "" },
	{ Agent: "Otro Agente", Ident: "123456", Date: "13/06/2022", Estado: "" },
];

const DesactivationSection = () => {
	const handleAction = (idccms, context) => {
		//console.log(idccms, context);
	};
	return (
		<MainPage>
			<Grid>
				<Header />
				<Typography variant="h5" fontWeight="500">
					Desactivation Request
				</Typography>
			</Grid>
			<Grid container>
				<Grid item xs={12} lg={9}>
					<TableDesactivation
						dataAgent={dataAgent}
						handleAction={handleAction}
					/>
				</Grid>
			</Grid>
		</MainPage>
	);
};

export default DesactivationSection;
