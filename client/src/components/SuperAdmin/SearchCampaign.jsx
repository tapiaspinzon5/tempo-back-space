import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	styled,
} from "@mui/material";
import React from "react";
import { ButtonActionBlue } from "../../assets/styled/muistyled";

const BoxCampaign = styled(Box)(() => ({
	//border: "1px solid #000",
	height: "4rem",
	width: "500px",
	borderRadius: "10px",
	boxShadow: "3px 3px 8px #A2A2A2",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	//textAlign: "center",
	padding: ".5rem",
	input: {
		height: "1.5rem",
		width: "1.5rem",
	},
	label: {
		color: "#3047B0",
		fontWeight: "bold",
	},
}));

const SearchCampaign = ({ searchCampaign, setSearchCampaign, campaign }) => {
	return (
		<BoxCampaign>
			<FormControl fullWidth>
				{campaign.Campaign && (
					<>
						<InputLabel id="campaign-select-label">Select Campaign</InputLabel>
						<Select
							labelId="campaign-select-label"
							id="campaign-simple-select"
							value={searchCampaign}
							label="Select Campaign "
							onChange={(e) => setSearchCampaign(e.target.value)}
						>
							{campaign.Campaign.map((account) => (
								<MenuItem value={account.IdCampaign} key={account.IdCampaign}>
									{account.nameCampaign}
								</MenuItem>
							))}
						</Select>
					</>
				)}
			</FormControl>
		</BoxCampaign>
	);
};

export default SearchCampaign;
