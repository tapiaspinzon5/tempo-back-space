import {
  Box,
  Button,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const ButtonBack = styled(Button)(() => ({
  color: "#3047B0",
  background: "#fff",
  textTransform: "none",
  padding: "1px 12px",
  margin: "1rem",
  fontWeight: "bold",
  "&:hover": {
    background: "#fff",
    transform: "scale(1.101)",
  },
}));

const HeadWinners = ({ setSection, title, handleClose }) => {
  return (
    <Grid>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginRight={2}
      >
        <ButtonBack onClick={() => setSection("winners")}>Back</ButtonBack>
        <IconButton
          aria-label=""
          onClick={handleClose}
          sx={{
            color: "#fff",
            background: "#f2f2f2a1",
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "2px",
          }}
        >
          X
        </IconButton>
      </Box>

      <Box marginY={1}>
        <Typography
          variant="h3"
          fontWeight={700}
          color="#fff"
          textAlign="center"
        >
          {title}
        </Typography>
      </Box>
    </Grid>
  );
};

export default HeadWinners;
