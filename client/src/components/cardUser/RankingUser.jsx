import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  styled,
  Button,
  Chip,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const ItemList = styled(ListItem)(({ theme }) => ({
  border: "1px solid #f2f2f2",
  borderRadius: "5px",
  boxShadow: "0px 3px 6px #00000029",
}));

const LinearProgressRanking = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    //theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)"
        : "linear-gradient(180deg, #FF0082 0%, #780096 100%)",
  },
}));

const RankingUser = () => {
  return (
    <List>
      <ItemList>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="https://play-lh.googleusercontent.com/zZ9rrps12p6TmS_UQ4vSk1QzWg0MbaDkB3s9iBSeve7mp9HaLk_ZuNKZg1DQ-j-qkTUp"
          />
        </ListItemAvatar>
        <ListItemText
          primary="Epical"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              ></Typography>
              {"123 pts"}
              <LinearProgressRanking variant="determinate" value={83} />
            </React.Fragment>
          }
        />
        <React.Fragment>
          <Button sx={{ display: "block" }}>50pts</Button>
          <Chip label="0/5" />
        </React.Fragment>
      </ItemList>
    </List>
  );
};

export default RankingUser;
