import { Box, Button, Grid, styled, Typography } from "@mui/material";
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

const HeadWinners = ({ setSection, title }) => {
  return (
    <Grid>
      <Box>
        <ButtonBack onClick={() => setSection("winners")}>Back</ButtonBack>
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
