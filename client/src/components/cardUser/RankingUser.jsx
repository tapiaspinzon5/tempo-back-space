import React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

const RankingUser = () => {
  return (
    <List>
      <ListItem>
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
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="middle" component="li" />
    </List>
  );
};

export default RankingUser;
