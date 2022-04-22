import React, { useState } from "react";
import {
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	styled,
} from "@mui/material";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FiEdit3, FiSave } from "react-icons/fi";
import { ButtonAction } from "../../assets/styled/muistyled";

const BoxCat = styled(Box)(() => ({
	width: "13rem",
	border: "1px solid #fff",
	borderRadius: "10px",
	boxShadow: "3px 3px 3px #e8e8e8",
	minHeight: "18rem",
	position: "absolute",
	zIndex: 1000,
	padding: "1rem",
	backgroundColor: "#fff",
	li: {
		background: "#E8E8E8",
		borderRadius: "15px",
		marginBottom: ".5rem",
		padding: "1px 10px",
		input: {
			border: "none",
		},
	},
}));

const CardCateroriesQuiz = () => {
	const [edit, setEdit] = useState(false);
	const handleCategory = (e) => {};
	return (
		<BoxCat>
			<Box display="flex">
				<ButtonAction>Categories</ButtonAction>
				<IconButton>
					<AiOutlineFileAdd size={25} />
				</IconButton>
			</Box>
			<Box>
				<List
					sx={{
						width: "100%",
						maxWidth: 360,
						bgcolor: "background.paper",
						mt: 2,
					}}
				>
					{[1, 2, 3].map((value) => (
						<ListItem
							key={value}
							disableGutters
							secondaryAction={
								edit ? (
									<IconButton>
										<FiSave size={18} />
									</IconButton>
								) : (
									<IconButton onChange={() => setEdit(true)}>
										<FiEdit3 size={18} />
									</IconButton>
								)
							}
						>
							<ListItemText
								primary={
									<input
										type="text"
										disabled={!edit}
										onChange={(e) => handleCategory(e)}
										value={value}
									/>
								}
							/>
						</ListItem>
					))}
				</List>
			</Box>
		</BoxCat>
	);
};

export default CardCateroriesQuiz;
